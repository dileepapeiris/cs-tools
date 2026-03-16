export interface ServiceRequestSummary {
  id: string;
  internalId: string;
  number: string;
  createdOn: Date;
  createdBy: string;
  title: string;
  description: string;
  assignee?: string;
  statusId?: string;
  severityId?: string;
  issueType?: string;
}
