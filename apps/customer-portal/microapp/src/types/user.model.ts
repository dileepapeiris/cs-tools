export interface Me {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  timezone: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  status: "invited" | "registered";
  lastActive: Date;
}

export type Role = "Admin" | "Portal User" | "System User";
