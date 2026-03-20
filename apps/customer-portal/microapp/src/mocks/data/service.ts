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

import type { ProgressTimelineEntryProps } from "@components/features/detail";

export const MOCK_REQUIREMENTS = [
  "New staging environment for API Manager",
  "Same configuration as production",
  "Access for development team (5 users)",
  "Integration with existing LDAP",
  "SSL certificates configured",
];

export const MOCK_TIMELINE_DATA: Omit<ProgressTimelineEntryProps, "variant">[] = [
  {
    status: "completed",
    title: "New",
    description: "Change request created",
    fill: "green",
  },
  {
    status: "completed",
    title: "Assess",
    description: "Technical assessment completed",
  },
  {
    status: "completed",
    title: "authorize",
    description: "internal authorization obtained",
  },
  {
    status: "active",
    title: "Customer Approval",
    description: "Customer approval received",
  },
  { status: "pending", title: "Scheduled", description: "Maintenance window scheduled" },
  { status: "pending", title: "Implement", description: "Maintenance window scheduled" },
  { status: "pending", title: "Review", description: "Maintenance window scheduled" },
  { status: "pending", title: "Rollback", description: "Maintenance window scheduled" },
  { status: "active", title: "Cancelled", description: "Maintenance window scheduled", end: true },
  { status: "pending", title: "Closed", description: "Maintenance window scheduled" },
];

export const MOCK_UPDATES = [
  {
    author: "You",
    timestamp: "3 days ago",
    content:
      "Requested database scaling for production environment. Current instance is at 85% capacity during peak hours.",
  },
  {
    author: "Infrastructure Team",
    timestamp: "2 days ago",
    content:
      "Request received and approved. We will schedule the scaling operation during the next maintenance window.",
  },
  {
    author: "Infrastructure Team",
    timestamp: "1 day ago",
    content:
      "Database instance has been successfully scaled to 2x capacity. Monitoring shows improved performance metrics.",
  },
  {
    author: "You",
    timestamp: "12 hours ago",
    content: "Confirmed - performance has improved significantly. Thank you!",
  },
];
