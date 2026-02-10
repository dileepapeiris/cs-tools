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
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Collapse,
} from "@wso2/oxygen-ui";
import {
  Package,
  FolderOpen,
  Upload,
  Plus,
  Calendar,
  Activity,
  ChevronDown,
  ChevronUp,
} from "@wso2/oxygen-ui-icons-react";
import { useState, type JSX } from "react";
import type { Deployment } from "@models/responses";
import { formatProjectDate } from "@utils/projectStats";
import {
  getDeploymentStatusColor,
  getDeploymentAccentColor,
} from "@utils/deploymentsUtils";
import { DeploymentProductItem } from "@components/project-details/deployments/DeploymentProductItem";
import { DeploymentDocumentItem } from "@components/project-details/deployments/DeploymentDocumentItem";

export interface DeploymentCardProps {
  deployment: Deployment;
}

/**
 * Renders a single deployment environment card (accent bar, header, description, products, documents, footer).
 *
 * @param {DeploymentCardProps} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
export function DeploymentCard({ deployment }: DeploymentCardProps): JSX.Element {
  const [documentsExpanded, setDocumentsExpanded] = useState(true);
  const accentColor = getDeploymentAccentColor(deployment.name);
  const statusColor = getDeploymentStatusColor(deployment.status);

  return (
    <Card sx={{ overflow: "hidden" }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              width: 4,
              minHeight: 64,
              bgcolor: accentColor,
              flexShrink: 0,
            }}
          />
          <Box sx={{ flex: 1, p: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 0.5 }}>
                    <Typography variant="h6" component="h3">
                      {deployment.name}
                    </Typography>
                    <Chip
                      label={deployment.status}
                      size="small"
                      color={statusColor}
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {deployment.url}
                  </Typography>
                </Box>
              </Box>
              <Chip label={deployment.version} size="small" variant="outlined" />
            </Box>

            <Box sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}>
              <Typography variant="body2" color="text.secondary">
                {deployment.description}
              </Typography>
            </Box>

            {/* WSO2 Products */}
            <Box sx={{ pt: 2, mt: 2, borderTop: 1, borderColor: "divider" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  component="h4"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Package size={16} color="inherit" />
                  WSO2 Products ({deployment.products.length})
                </Typography>
                <Button size="small" variant="outlined" startIcon={<Plus size={14} />}>
                  Add Product
                </Button>
              </Box>
              {deployment.products.length === 0 ? (
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", py: 2, textAlign: "center" }}>
                  No products added yet
                </Typography>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {deployment.products.map((product) => (
                    <DeploymentProductItem key={product.id} product={product} />
                  ))}
                </Box>
              )}
            </Box>

            {/* Documents (collapsible) */}
            <Box sx={{ pt: 2, mt: 2, borderTop: 1, borderColor: "divider" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setDocumentsExpanded(!documentsExpanded)}
                  startIcon={<FolderOpen size={16} />}
                  endIcon={
                    documentsExpanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )
                  }
                  sx={{ textTransform: "none", color: "text.primary" }}
                >
                  Documents ({deployment.documents.length})
                </Button>
                <Button size="small" variant="outlined" startIcon={<Upload size={14} />}>
                  Upload
                </Button>
              </Box>
              <Collapse in={documentsExpanded}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {deployment.documents.map((doc) => (
                    <DeploymentDocumentItem key={doc.id} document={doc} />
                  ))}
                </Box>
              </Collapse>
            </Box>

            {/* Footer: deployed date, uptime */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                pt: 2,
                mt: 2,
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Calendar size={12} />
                <Typography variant="caption" color="text.secondary">
                  Deployed {formatProjectDate(deployment.deployedAt)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Activity size={12} />
                <Typography variant="caption" color="text.secondary">
                  Uptime: {deployment.uptimePercent.toFixed(2)}%
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
