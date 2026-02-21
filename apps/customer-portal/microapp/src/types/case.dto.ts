import type { Pagination } from "@src/types";

export interface CasesDTO extends Pagination {
  cases: CaseDTO[];
}

interface CaseDTO {
  id: string;
  internalId: string;
  number: string;
  createdOn: string;
  title: string;
  description?: string;
  assignedEngineer?: EntityReference;
  project: EntityReference;
  deployedProduct?: EntityReference;
  issueType?: EntityReference;
  deployment?: EntityReference;
  severity?: EntityReference;
  status?: EntityReference;
}

export interface CasesFiltersDTO {
  caseStates: EntityReference[];
  severities: EntityReference[];
  issueTypes: EntityReference[];
  deploymentTypes: EntityReference[];
  callRequestStates: EntityReference[];
  changeRequestStates: EntityReference[];
  changeRequestImpacts: EntityReference[];
  caseTypes: EntityReference[];
  severityBasedAllocationTime: {
    "0": number;
    "10": number;
    "11": number;
    "12": number;
    "13": number;
    "14": number;
  };
}

export interface EntityReference {
  id: string;
  label: string;
}

export interface GetCasesRequestDTO {
  filters?: {
    caseTypeIds?: string[];
    deploymentId?: string;
    issueId?: number;
    searchQuery?: string;
    severityId?: number;
    statusIds?: number[];
  };
  pagination?: {
    limit?: number;
    offset?: number;
  };
  sortBy?: {
    field?: string;
    order?: "asc" | "desc";
  };
}

export interface CreateCaseRequestDTO {
  projectId: string;
  deploymentId: string;
  productId: string;
  title: string;
  description: string;
  issueTypeKey: number;
  severityKey: number;
}

export interface CreateCaseResponseDTO {
  id: string;
  internalId: string;
  number: number;
  createdBy: string;
  createdOn: string;
  state: EntityReference;
  type: EntityReference;
}

export interface CaseClassificationRequestDTO {
  chatHistory: string;
  envProducts: Record<string, string[]>;
  region: string;
  tier: string;
}

export interface CaseClassificationResponseDTO {
  issueType: string;
  severityLevel: string;
  caseInfo: {
    description: string;
    shortDescription: string;
    productName: string;
    productVersion: string;
    environment: string;
    tier: string;
    region: string;
  };
}

export interface CasesStatsDTO {
  totalCases: number;
  averageResponseTime: number;
  resolvedCases: {
    total: number;
    currentMonth: number;
  };
  stateCount: { id: string; label: string; count: number }[];
  severityCount: { id: string; label: string; count: number }[];
  outstandingSeverityCount: { id: string; label: string; count: number }[];
  caseTypeCount: { id: string; label: string; count: number }[];
  casesTrend: { period: string; severities: { id: string; label: string; count: number }[] }[];
}

/* 
{
    "totalCases": 161,
    "averageResponseTime": 0.0,
    "resolvedCases": {
        "total": 9,
        "currentMonth": 6
    },
    "stateCount": [
        {
            "id": "1",
            "label": "Open",
            "count": 145
        },
        {
            "id": "3",
            "label": "Closed",
            "count": 9
        },
        {
            "id": "6",
            "label": "Solution Proposed",
            "count": 0
        },
        {
            "id": "10",
            "label": "Work In Progress",
            "count": 2
        },
        {
            "id": "18",
            "label": "Awaiting Info",
            "count": 0
        },
        {
            "id": "1003",
            "label": "Waiting On WSO2",
            "count": 1
        },
        {
            "id": "1006",
            "label": "Reopened",
            "count": 1
        }
    ],
    "severityCount": [
        {
            "id": "10",
            "label": "Critical (P1)",
            "count": 16
        },
        {
            "id": "11",
            "label": "High (P2)",
            "count": 4
        },
        {
            "id": "12",
            "label": "Medium (P3)",
            "count": 5
        },
        {
            "id": "13",
            "label": "Low (P4)",
            "count": 9
        },
        {
            "id": "14",
            "label": "Catastrophic (P0)",
            "count": 9
        }
    ],
    "outstandingSeverityCount": [
        {
            "id": "10",
            "label": "Critical (P1)",
            "count": 15
        },
        {
            "id": "11",
            "label": "High (P2)",
            "count": 4
        },
        {
            "id": "12",
            "label": "Medium (P3)",
            "count": 2
        },
        {
            "id": "13",
            "label": "Low (P4)",
            "count": 7
        },
        {
            "id": "14",
            "label": "Catastrophic (P0)",
            "count": 9
        }
    ],
    "caseTypeCount": [
        {
            "id": "0d5b8fbd1b18f010cb6898aebd4bcba5",
            "label": "Query",
            "count": 40
        },
        {
            "id": "25db43311b58f010cb6898aebd4bcb09",
            "label": "Bug",
            "count": 3
        },
        {
            "id": "262c4e2d1bd9b010d64e64a2604bcb56",
            "label": "Sub-Task",
            "count": 0
        },
        {
            "id": "3b8b43311b58f010cb6898aebd4bcb8f",
            "label": "Announcement",
            "count": 2
        },
        {
            "id": "3f5b47bd1b18f010cb6898aebd4bcbc2",
            "label": "Admin Task",
            "count": 1
        },
        {
            "id": "42e93b6a1bfdf0106a67caa1604bcb3a",
            "label": "Story",
            "count": 0
        },
        {
            "id": "42fb4b311b58f010cb6898aebd4bcb94",
            "label": "New Feature",
            "count": 1
        },
        {
            "id": "4b41cbf81bbcb410cb6898aebd4bcb84",
            "label": "Change Requests",
            "count": 3
        },
        {
            "id": "5ada4a8c1bc7d550d64e64a2604bcb3a",
            "label": "TestN",
            "count": 0
        },
        {
            "id": "5aeff1201b74c210264c997a234bcb54",
            "label": "Service Request",
            "count": 6
        },
        {
            "id": "80810ff81bbcb410cb6898aebd4bcb3c",
            "label": "Hosting Query",
            "count": 1
        },
        {
            "id": "83ed57221b7df0106a67caa1604bcb18",
            "label": "Cloud Incident",
            "count": 1
        },
        {
            "id": "8d4b87bd1b18f010cb6898aebd4bcb59",
            "label": "Incident",
            "count": 55
        },
        {
            "id": "8f8fc2c41b0bd550d64e64a2604bcb38",
            "label": "Engagement",
            "count": 2
        },
        {
            "id": "a0f93b2a1bfdf0106a67caa1604bcbc9",
            "label": "NFR",
            "count": 0
        },
        {
            "id": "ab36479047ccf510a0a29cd3846d43ee",
            "label": "Security Report Analysis",
            "count": 0
        },
        {
            "id": "b0f6ef1047f6e910a0a29cd3846d43f8",
            "label": "Icident",
            "count": 0
        },
        {
            "id": "b9bc97ee1b3df0106a67caa1604bcb7f",
            "label": "Cloud Query",
            "count": 2
        },
        {
            "id": "bfa1473c1bbcb410cb6898aebd4bcb52",
            "label": "Hosting",
            "count": 7
        },
        {
            "id": "c10c0ffd1b18f010cb6898aebd4bcb0f",
            "label": "Task",
            "count": 0
        },
        {
            "id": "e0eb43fd1b18f010cb6898aebd4bcb3c",
            "label": "Improvement",
            "count": 0
        },
        {
            "id": "e30dbe1b1b319950d64e64a2604bcb75",
            "label": "Test",
            "count": 0
        },
        {
            "id": "f46103f81bbcb410cb6898aebd4bcb27",
            "label": "Hosting Task",
            "count": 0
        }
    ],
    "casesTrend": [
        {
            "period": "2026-Q1",
            "severities": [
                {
                    "id": 10,
                    "label": "Critical (P1)",
                    "count": 16
                },
                {
                    "id": 11,
                    "label": "High (P2)",
                    "count": 4
                },
                {
                    "id": 12,
                    "label": "Medium (P3)",
                    "count": 2
                },
                {
                    "id": 13,
                    "label": "Low (P4)",
                    "count": 9
                },
                {
                    "id": 14,
                    "label": "Catastrophic (P0)",
                    "count": 9
                }
            ]
        },
        {
            "period": "2025-Q4",
            "severities": [
                {
                    "id": 10,
                    "label": "Critical (P1)",
                    "count": 0
                },
                {
                    "id": 11,
                    "label": "High (P2)",
                    "count": 0
                },
                {
                    "id": 12,
                    "label": "Medium (P3)",
                    "count": 1
                },
                {
                    "id": 13,
                    "label": "Low (P4)",
                    "count": 0
                },
                {
                    "id": 14,
                    "label": "Catastrophic (P0)",
                    "count": 0
                }
            ]
        },
        {
            "period": "2025-Q3",
            "severities": [
                {
                    "id": 10,
                    "label": "Critical (P1)",
                    "count": 0
                },
                {
                    "id": 11,
                    "label": "High (P2)",
                    "count": 0
                },
                {
                    "id": 12,
                    "label": "Medium (P3)",
                    "count": 1
                },
                {
                    "id": 13,
                    "label": "Low (P4)",
                    "count": 0
                },
                {
                    "id": 14,
                    "label": "Catastrophic (P0)",
                    "count": 0
                }
            ]
        },
        {
            "period": "2025-Q2",
            "severities": [
                {
                    "id": 10,
                    "label": "Critical (P1)",
                    "count": 0
                },
                {
                    "id": 11,
                    "label": "High (P2)",
                    "count": 0
                },
                {
                    "id": 12,
                    "label": "Medium (P3)",
                    "count": 0
                },
                {
                    "id": 13,
                    "label": "Low (P4)",
                    "count": 0
                },
                {
                    "id": 14,
                    "label": "Catastrophic (P0)",
                    "count": 0
                }
            ]
        },
        {
            "period": "2025-Q1",
            "severities": [
                {
                    "id": 10,
                    "label": "Critical (P1)",
                    "count": 0
                },
                {
                    "id": 11,
                    "label": "High (P2)",
                    "count": 0
                },
                {
                    "id": 12,
                    "label": "Medium (P3)",
                    "count": 0
                },
                {
                    "id": 13,
                    "label": "Low (P4)",
                    "count": 0
                },
                {
                    "id": 14,
                    "label": "Catastrophic (P0)",
                    "count": 0
                }
            ]
        },
        {
            "period": "2024-Q4",
            "severities": [
                {
                    "id": 10,
                    "label": "Critical (P1)",
                    "count": 0
                },
                {
                    "id": 11,
                    "label": "High (P2)",
                    "count": 0
                },
                {
                    "id": 12,
                    "label": "Medium (P3)",
                    "count": 0
                },
                {
                    "id": 13,
                    "label": "Low (P4)",
                    "count": 0
                },
                {
                    "id": 14,
                    "label": "Catastrophic (P0)",
                    "count": 0
                }
            ]
        }
    ]
}
*/
