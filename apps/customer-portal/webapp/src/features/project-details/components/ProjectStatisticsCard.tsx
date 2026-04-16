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

import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@wso2/oxygen-ui";
import type { JSX } from "react";
import { statItems } from "@features/project-details/constants/projectDetailsConstants";
import type { ProjectStatsSummary } from "@features/project-hub/types/projects";
import ErrorIndicator from "@components/error-indicator/ErrorIndicator";

export interface ProjectStatisticsCardProps {
  stats?: ProjectStatsSummary | null;
  isLoading?: boolean;
  isError?: boolean;
  showDeploymentsStat?: boolean;
}

/**
 * Stat grid for open cases, chats, and optional deployments.
 *
 * @param props - Project stats API slice and visibility flags.
 * @returns {JSX.Element} Statistics card.
 */
export default function ProjectStatisticsCard({
  stats,
  isLoading,
  isError,
  showDeploymentsStat = true,
}: ProjectStatisticsCardProps): JSX.Element {
  const items = showDeploymentsStat
    ? statItems
    : statItems.filter((s) => s.key !== "deployments");

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Statistics
        </Typography>
        <Grid container spacing={2}>
          {items.map((item) => {
            const Icon = item.icon;
            const raw = stats?.[item.key];
            const value =
              raw === null || raw === undefined ? "--" : String(raw);

            return (
              <Grid key={item.key} size={{ xs: 12, sm: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "text.secondary",
                      minWidth: 0,
                    }}
                  >
                    <Icon size={18} aria-hidden />
                    <Typography variant="body2" color="inherit" noWrap>
                      {item.label}
                    </Typography>
                  </Box>
                  {isLoading ? (
                    <Skeleton variant="text" width={32} />
                  ) : isError ? (
                    <ErrorIndicator entityName={item.label} />
                  ) : (
                    <Typography variant="body2" color="primary">
                      {value}
                    </Typography>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}
