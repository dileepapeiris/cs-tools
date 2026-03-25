import apiClient from "./apiClient";

import { METADATA_ENDPOINT } from "../config/endpoints";
import type { MetadataDTO } from "../types/metadata.dto";
import { queryOptions } from "@tanstack/react-query";

const getMetadata = async (): Promise<MetadataDTO> => {
  return (await apiClient.get<MetadataDTO>(METADATA_ENDPOINT)).data;
};

export const metadata = {
  get: () => queryOptions({ queryKey: ["metadata"], queryFn: () => getMetadata() }),
};
