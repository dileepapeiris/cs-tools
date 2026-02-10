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

// Deployment environment status display labels.
export const DEPLOYMENT_STATUS = {
  HEALTHY: "Healthy",
  WARNING: "Warning",
} as const;

export type DeploymentStatus =
  (typeof DEPLOYMENT_STATUS)[keyof typeof DEPLOYMENT_STATUS];

// Environment name keys for accent bar color mapping.
export const DEPLOYMENT_ENV_KEYS = {
  PRODUCTION: "Production",
  QA: "QA Environment",
  DEVELOPMENT: "Development",
} as const;
