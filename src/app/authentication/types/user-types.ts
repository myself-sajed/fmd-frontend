export interface IUserInfo {
  id: number;
  name: string;
  avatar: string;
  email: string;
  image?: string;
  role: IUserRole;
  onboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  lastLogin?: Date;
}

export type IUserRole = "Client" | "Doctor";
