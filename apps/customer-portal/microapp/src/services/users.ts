import type { Me, MeDTO } from "@src/types";
import { queryOptions } from "@tanstack/react-query";
import apiClient from "@src/services/apiClient";

import { USERS_ME_ENDPOINT } from "@config/endpoints";

const getMe = async (): Promise<Me> => {
  const response = (await apiClient.get<MeDTO>(USERS_ME_ENDPOINT)).data;
  return toMe(response);
};

/* Mappers */
function toMe(dto: MeDTO): Me {
  return {
    id: dto.id,
    email: dto.email,
    firstName: dto.firstName,
    lastName: dto.lastName,
    timezone: dto.timeZone,
  };
}

/* Query Options */
export const users = {
  me: () => queryOptions({ queryKey: ["me"], queryFn: getMe }),
};
