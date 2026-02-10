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

import { Box, Typography, Chip, IconButton } from "@wso2/oxygen-ui";
import { FileText, Image, FileSpreadsheet, Download, Trash2 } from "@wso2/oxygen-ui-icons-react";
import type { JSX } from "react";
import type { DeploymentDocument } from "@models/responses";
import { formatFileSize } from "@utils/deploymentsUtils";
import { formatProjectDate } from "@utils/projectStats";

export interface DeploymentDocumentItemProps {
  document: DeploymentDocument;
  onDownload?: (document: DeploymentDocument) => void;
  onDelete?: (document: DeploymentDocument) => void;
}

/**
 * Renders a single document row in a deployment (icon, name, category, size, date, uploader, actions).
 *
 * @param {DeploymentDocumentItemProps} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
export function DeploymentDocumentItem({
  document: doc,
  onDownload,
  onDelete,
}: DeploymentDocumentItemProps): JSX.Element {
  const iconByCategory =
    doc.category === "Deployment Diagram" ? (
      <Image size={20} />
    ) : doc.category === "Test Case" ? (
      <FileSpreadsheet size={20} />
    ) : (
      <FileText size={20} />
    );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        p: 2,
        bgcolor: "action.hover",
        "&:hover": { bgcolor: "action.selected" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, flex: 1, minWidth: 0 }}>
        <Box sx={{ mt: 0.5, color: "text.secondary" }}>{iconByCategory}</Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Typography variant="body2" noWrap sx={{ flex: 1 }}>
              {doc.name}
            </Typography>
            <Chip label={doc.category} size="small" variant="outlined" />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {formatFileSize(doc.sizeBytes)} • Uploaded {formatProjectDate(doc.uploadedAt)} • {doc.uploadedBy}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 0.5, ml: 2 }}>
        {onDownload && (
          <IconButton
            aria-label="Download"
            size="small"
            onClick={() => onDownload(doc)}
          >
            <Download size={14} />
          </IconButton>
        )}
        {onDelete && (
          <IconButton
            aria-label="Delete"
            size="small"
            onClick={() => onDelete(doc)}
          >
            <Trash2 size={14} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
