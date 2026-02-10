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

import { colors } from "@wso2/oxygen-ui";
import { DEPLOYMENT_ENV_KEYS } from "@constants/deploymentsConstants";

/**
 * Formats byte size into human-readable string (e.g. "2.34 MB", "964.51 KB").
 *
 * @param {number} bytes - Size in bytes.
 * @returns {string} Formatted size string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(i === 0 ? 0 : 2)} ${sizes[i]}`;
}

/**
 * Maps deployment status to Badge/Chip color.
 *
 * @param {string} status - Deployment status (e.g. "Healthy", "Warning").
 * @returns {"success" | "warning" | "default"} Color for Badge/Chip.
 */
export function getDeploymentStatusColor(
  status: string,
): "success" | "warning" | "default" {
  const normalized = status?.toLowerCase();
  if (normalized === "healthy") return "success";
  if (normalized === "warning") return "warning";
  return "default";
}

/**
 * Maps deployment environment name to accent bar color.
 *
 * @param {string} envName - Environment name (e.g. "Production", "QA Environment").
 * @returns {string} CSS color value for the bar.
 */
export function getDeploymentAccentColor(envName: string): string {
  switch (envName) {
    case DEPLOYMENT_ENV_KEYS.PRODUCTION:
      return colors.blue[600];
    case DEPLOYMENT_ENV_KEYS.QA:
      return colors.purple[600];
    case DEPLOYMENT_ENV_KEYS.DEVELOPMENT:
      return colors.orange[600];
    default:
      return colors.grey[600];
  }
}
