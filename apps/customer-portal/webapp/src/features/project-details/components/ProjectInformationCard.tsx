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

import { Card, CardContent } from "@wso2/oxygen-ui";
import type { JSX } from "react";
import type { ProjectDetails } from "@features/project-hub/types/projects";
import ProjectHeader from "@features/project-details/components/project-overview/project-information/ProjectHeader";
import ProjectName from "@features/project-details/components/project-overview/project-information/ProjectName";
import ProjectDescription from "@features/project-details/components/project-overview/project-information/ProjectDescription";
import ProjectMetadata from "@features/project-details/components/project-overview/project-information/ProjectMetadata";
import SubscriptionDetails from "@features/project-details/components/project-overview/project-information/SubscriptionDetails";
import {
  displayValue,
  formatProjectDate,
} from "@features/project-details/utils/projectDetails";

export interface ProjectInformationCardProps {
  project?: ProjectDetails | null;
  slaStatus: string;
  isLoading?: boolean;
  isError?: boolean;
}

/**
 * Overview card: header, name, description, metadata, subscription block.
 *
 * @param props - Project payload, SLA string, loading and error flags.
 * @returns {JSX.Element} Card section.
 */
export default function ProjectInformationCard({
  project,
  slaStatus,
  isLoading,
  isError,
}: ProjectInformationCardProps): JSX.Element {
  const supportTier = displayValue(project?.account?.supportTier, "--");
  const onboardingStatus = displayValue(project?.onboardingStatus, "--");
  const goLive = project?.goLivePlanDate
    ? formatProjectDate(String(project.goLivePlanDate))
    : "--";
  const created = project?.createdOn
    ? formatProjectDate(project.createdOn)
    : "--";

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <ProjectHeader />
        <ProjectName
          name={project?.name ?? "--"}
          projectKey={project?.key ?? "--"}
          isLoading={isLoading}
        />
        <ProjectDescription
          description={project?.description ?? ""}
          isLoading={isLoading}
          isError={isError}
        />
        <ProjectMetadata
          createdDate={created}
          type={project?.type ?? { id: "", label: "" }}
          supportTier={supportTier}
          slaStatus={slaStatus}
          goLivePlanDate={goLive}
          onboardingStatus={onboardingStatus}
          isLoading={isLoading}
          isError={isError}
        />
        <SubscriptionDetails
          startDate={project?.startDate ?? undefined}
          endDate={project?.endDate ?? undefined}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
