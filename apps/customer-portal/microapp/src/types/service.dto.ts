import type { CaseDTO, CaseSummaryDTO, EntityReference, Pagination } from "@src/types";

export interface ServiceRequestsDTO extends Pagination {
  cases: ServiceRequestSummaryDTO[];
}

interface ServiceRequestSummaryDTO extends CaseSummaryDTO {
  createdBy: string;
  assignedTeam: EntityReference | null;
}

export interface ServiceRequestDTO extends CaseDTO {
  createdBy: string;
  assignedTeam: EntityReference | null;
}
