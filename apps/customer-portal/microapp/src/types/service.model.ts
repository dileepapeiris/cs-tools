export interface ServiceRequest {
  id: string;
  internalId: string;
  number: string;
  createdOn: Date;
  updatedOn: Date;
  createdBy: string;
  title: string;
  description: string;
  assignee?: string;
  statusId?: string;
  severityId?: string;
  issueType?: string;
  deployment?: string;
  product?: string;
  productVersion?: string;
}

export type ServiceRequestSummary = Pick<
  ServiceRequest,
  | "id"
  | "internalId"
  | "number"
  | "createdOn"
  | "createdBy"
  | "title"
  | "description"
  | "assignee"
  | "statusId"
  | "severityId"
  | "issueType"
>;
