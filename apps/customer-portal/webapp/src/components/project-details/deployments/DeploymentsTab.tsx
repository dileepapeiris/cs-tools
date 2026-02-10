// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { Box, Typography, Button, Grid, Skeleton } from "@wso2/oxygen-ui";
import { Plus } from "@wso2/oxygen-ui-icons-react";
import type { JSX } from "react";
import { useGetDeployments } from "@api/useGetDeployments";
import { DeploymentCard } from "@components/project-details/deployments/DeploymentCard";

export interface DeploymentsTabProps {
  projectId: string;
}

/**
 * Deployments tab content: fetches deployments for the project and renders a grid of deployment cards.
 *
 * @param {DeploymentsTabProps} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
export function DeploymentsTab({ projectId }: DeploymentsTabProps): JSX.Element {
  const { data, isLoading, isError } = useGetDeployments(projectId);

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Skeleton width={200} height={24} />
          <Skeleton width={140} height={32} />
        </Box>
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid size={{ xs: 12 }} key={i}>
              <Skeleton variant="rectangular" height={320} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Failed to load deployments. Please try again later.
        </Typography>
      </Box>
    );
  }

  const deployments = data?.deployments ?? [];
  const count = deployments.length;

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {count} deployment environment{count !== 1 ? "s" : ""}
        </Typography>
        <Button variant="contained" startIcon={<Plus size={16} />}>
          Add Deployment
        </Button>
      </Box>

      <Grid container spacing={3}>
        {deployments.map((deployment) => (
          <Grid size={{ xs: 12 }} key={deployment.id}>
            <DeploymentCard deployment={deployment} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
