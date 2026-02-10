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
import { DeploymentCard } from "@components/project-details/deployments/DeploymentCard";
import type { Deployment } from "@models/responses";

vi.mock("@utils/projectStats", () => ({
  formatProjectDate: vi.fn((d: string) => `Formatted: ${d}`),
}));

vi.mock("@utils/deploymentsUtils", () => ({
  getDeploymentStatusColor: vi.fn(() => "success"),
  getDeploymentAccentColor: vi.fn(() => "#1976d2"),
}));

vi.mock("@components/project-details/deployments/DeploymentProductItem", () => ({
  DeploymentProductItem: ({
    product,
  }: {
    product: { id: string; name: string };
  }) => <div data-testid="product-item">{product.name}</div>,
}));

vi.mock("@components/project-details/deployments/DeploymentDocumentItem", () => ({
  DeploymentDocumentItem: ({
    document: doc,
  }: {
    document: { id: string; name: string };
  }) => <div data-testid="document-item">{doc.name}</div>,
}));

const mockDeployment: Deployment = {
  id: "dep-1",
  name: "Production",
  status: "Healthy",
  url: "https://api.example.com",
  version: "v2.5.1",
  description: "Primary production environment",
  products: [
    {
      id: "p1",
      name: "WSO2 API Manager",
      version: "4.2.0",
      supportStatus: "Active Support",
      description: "API Gateway",
      cores: 8,
      tps: 5000,
      releasedDate: "May 15, 2023",
      eolDate: "May 15, 2026",
      updateLevel: "U22",
    },
  ],
  documents: [
    {
      id: "d1",
      name: "Architecture.pdf",
      category: "Architecture",
      sizeBytes: 1024,
      uploadedAt: "2026-02-01",
      uploadedBy: "Jane",
    },
  ],
  deployedAt: "2026-02-08",
  uptimePercent: 99.98,
};

describe("DeploymentCard", () => {
  it("should render deployment name, status, url, version and description", () => {
    render(<DeploymentCard deployment={mockDeployment} />);

    expect(screen.getByText("Production")).toBeInTheDocument();
    expect(screen.getByText("Healthy")).toBeInTheDocument();
    expect(screen.getByText("https://api.example.com")).toBeInTheDocument();
    expect(screen.getByText("v2.5.1")).toBeInTheDocument();
    expect(screen.getByText("Primary production environment")).toBeInTheDocument();
  });

  it("should render WSO2 Products section with count and product items", () => {
    render(<DeploymentCard deployment={mockDeployment} />);

    expect(screen.getByText("WSO2 Products (1)")).toBeInTheDocument();
    expect(screen.getByTestId("product-item")).toHaveTextContent("WSO2 API Manager");
  });

  it("should render Documents section with count and document items", () => {
    render(<DeploymentCard deployment={mockDeployment} />);

    expect(screen.getByText("Documents (1)")).toBeInTheDocument();
    expect(screen.getByTestId("document-item")).toHaveTextContent("Architecture.pdf");
  });

  it("should render footer with deployed date and uptime", () => {
    render(<DeploymentCard deployment={mockDeployment} />);

    expect(screen.getByText(/Formatted: 2026-02-08/)).toBeInTheDocument();
    expect(screen.getByText(/Uptime: 99.98%/)).toBeInTheDocument();
  });

  it("should show no products message when products array is empty", () => {
    const depNoProducts: Deployment = {
      ...mockDeployment,
      products: [],
    };
    render(<DeploymentCard deployment={depNoProducts} />);

    expect(screen.getByText("WSO2 Products (0)")).toBeInTheDocument();
    expect(screen.getByText("No products added yet")).toBeInTheDocument();
  });
});
