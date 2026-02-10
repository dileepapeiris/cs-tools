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
import { Cpu, Zap, Calendar, CircleAlert, Trash2 } from "@wso2/oxygen-ui-icons-react";
import type { JSX } from "react";
import type { DeploymentProduct } from "@models/responses";

export interface DeploymentProductItemProps {
  product: DeploymentProduct;
  onDelete?: (product: DeploymentProduct) => void;
}

/**
 * Renders a single WSO2 product row in a deployment (name, version, support, description, specs, update level, delete).
 *
 * @param {DeploymentProductItemProps} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
export function DeploymentProductItem({
  product,
  onDelete,
}: DeploymentProductItemProps): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        p: 2,
        bgcolor: "action.hover",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, flex: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Typography variant="body2" component="p">
              {product.name}
            </Typography>
            <Chip label={product.version} size="small" variant="outlined" />
            <Chip
              label={product.supportStatus}
              size="small"
              color="success"
              variant="outlined"
            />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
            {product.description}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Cpu size={12} />
              <Typography variant="caption" color="text.secondary">
                {product.cores} cores
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Zap size={12} />
              <Typography variant="caption" color="text.secondary">
                {product.tps.toLocaleString()} TPS
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Calendar size={12} />
              <Typography variant="caption" color="text.secondary">
                Released: {product.releasedDate}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CircleAlert size={12} />
              <Typography variant="caption" color="text.secondary">
                EOL: {product.eolDate}
              </Typography>
            </Box>
          </Box>
          <Chip label={`Update Level: ${product.updateLevel}`} size="small" variant="outlined" />
        </Box>
      </Box>
      {onDelete && (
        <IconButton
          aria-label="Delete product"
          size="small"
          onClick={() => onDelete(product)}
        >
          <Trash2 size={14} />
        </IconButton>
      )}
    </Box>
  );
}
