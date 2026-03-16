import apiClient from "@src/services/apiClient";
import type { GetCasesRequestDTO, PaginatedArray } from "@src/types";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type { ServiceRequestSummary } from "@src/types/service.model";
import type { ServiceRequestsDTO } from "@src/types/service.dto";

import { PROJECT_CASES_ENDPOINT } from "@config/endpoints";

const getAllServiceRequests = async (
  id: string,
  body: GetCasesRequestDTO = {},
): Promise<PaginatedArray<ServiceRequestSummary>> => {
  const response = (
    await apiClient.post<ServiceRequestsDTO>(PROJECT_CASES_ENDPOINT(id), {
      ...body,
      filters: {
        ...(body?.filters ?? {}),
        caseTypes: ["service_request"],
      },
    })
  ).data;
  const result = response.cases.map(toServiceRequestSummary) as PaginatedArray<ServiceRequestSummary>;
  result.pagination = {
    totalRecords: response.totalRecords,
    offset: response.offset,
    limit: response.limit,
  };

  return result;
};

/* Mappers */
export function toServiceRequestSummary(dto: ServiceRequestsDTO["cases"][number]): ServiceRequestSummary {
  return {
    id: dto.id,
    internalId: dto.internalId,
    number: dto.number,
    createdOn: new Date(dto.createdOn.replace(" ", "T")),
    createdBy: dto.createdBy,
    title: dto.title,
    description: dto.description ?? "",
    assignee: dto.assignedTeam?.label,
    issueType: dto.issueType?.label,
    statusId: dto.status?.id,
    severityId: dto.severity?.id,
  };
}

/* Query Options */
export const serviceRequests = {
  all: (id: string, body: GetCasesRequestDTO = {}) =>
    queryOptions({
      queryKey: ["service-requests", id, body],
      queryFn: () => getAllServiceRequests(id, body),
    }),

  paginated: (id: string, body: GetCasesRequestDTO = {}) =>
    infiniteQueryOptions({
      queryKey: ["service-requests", "paginated", id, body],
      queryFn: ({ pageParam }) =>
        getAllServiceRequests(id, { ...body, pagination: { ...body.pagination, offset: pageParam } }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const { offset, limit, totalRecords } = lastPage.pagination;
        const maxOffset = Math.ceil(totalRecords / limit);
        return offset >= maxOffset ? undefined : offset + 1;
      },
    }),
};
