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

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DeploymentsTab } from "@components/project-details/deployments/DeploymentsTab";
import { mockDeployments } from "@models/mockData";

const mockUseGetDeployments = vi.fn();
vi.mock("@api/useGetDeployments", () => ({
  useGetDeployments: (...args: unknown[]) => mockUseGetDeployments(...args),
}));

vi.mock("@components/project-details/deployments/DeploymentCard", () => ({
  DeploymentCard: ({
    deployment,
  }: {
    deployment: { id: string; name: string };
  }) => <div data-testid="deployment-card">{deployment.name}</div>,
}));

describe("DeploymentsTab", () => {
  it("should show loading state when isLoading is true", () => {
    mockUseGetDeployments.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as ReturnType<typeof import("@api/useGetDeployments").useGetDeployments>);

    render(<DeploymentsTab projectId="proj-1" />);

    expect(screen.queryByTestId("deployment-card")).not.toBeInTheDocument();
    expect(screen.queryByText("Failed to load deployments")).not.toBeInTheDocument();
  });

  it("should show error message when isError is true", () => {
    mockUseGetDeployments.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as ReturnType<typeof import("@api/useGetDeployments").useGetDeployments>);

    render(<DeploymentsTab projectId="proj-1" />);

    expect(
      screen.getByText("Failed to load deployments. Please try again later."),
    ).toBeInTheDocument();
  });

  it("should render deployment count and cards when data is loaded", () => {
    mockUseGetDeployments.mockReturnValue({
      data: { deployments: mockDeployments },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof import("@api/useGetDeployments").useGetDeployments>);

    render(<DeploymentsTab projectId="proj-1" />);

    expect(
      screen.getByText("3 deployment environments"),
    ).toBeInTheDocument();
    expect(screen.getByText("Add Deployment")).toBeInTheDocument();
    expect(screen.getAllByTestId("deployment-card")).toHaveLength(3);
    expect(screen.getByText("Production")).toBeInTheDocument();
    expect(screen.getByText("QA Environment")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
  });

  it("should render singular when one deployment", () => {
    mockUseGetDeployments.mockReturnValue({
      data: { deployments: mockDeployments.slice(0, 1) },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof import("@api/useGetDeployments").useGetDeployments>);

    render(<DeploymentsTab projectId="proj-1" />);

    expect(
      screen.getByText("1 deployment environment"),
    ).toBeInTheDocument();
  });
});
