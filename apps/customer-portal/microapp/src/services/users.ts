import type { Me, MeDTO, Role, User, UserDTO, UsersDTO } from "@src/types";
import { queryOptions } from "@tanstack/react-query";
import apiClient from "@src/services/apiClient";

import { PROJECT_USERS_ENDPOINT, USERS_ME_ENDPOINT } from "@config/endpoints";

const getMe = async (): Promise<Me> => {
  const response = (await apiClient.get<MeDTO>(USERS_ME_ENDPOINT)).data;
  return toMe(response);
};

const getUsers = async (id: string): Promise<User[]> => {
  const response = (await apiClient.get<UsersDTO>(PROJECT_USERS_ENDPOINT(id))).data;
  return response.map(toUser);
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

function toUser(dto: UserDTO): User {
  const roles: Role[] = [];
  if (dto.isCsAdmin) roles.push("Admin");
  if (dto.isCsIntegrationUser) roles.push("System User");
  if (dto.isSecurityContact) roles.push("Portal User");

  return {
    id: dto.id,
    email: dto.email,
    firstName: dto.firstName,
    lastName: dto.lastName,
    status: dto.membershipStatus === "REGISTERED" ? "registered" : "invited",
    roles: roles,
    lastActive: new Date(), // TODO: Replace this placeholder with actual last active date from backend when available
  };
}

/* Query Options */
export const users = {
  me: () => queryOptions({ queryKey: ["me"], queryFn: getMe }),
  all: (projectId: string) => queryOptions({ queryKey: ["users", projectId], queryFn: () => getUsers(projectId) }),
};
