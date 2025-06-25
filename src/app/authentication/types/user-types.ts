import formatLink from "@/utility/format-link";
import { UserRolesEnum } from "./user-roles";
import siteLinks from "@/sitelinks/sitelinks";

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

export interface IUserRole {
  id: number;
  name: string;
}

export const DEFAULT_PAGE_FOR_USERS = {
  [UserRolesEnum.SUPPORT_AGENT]: formatLink(siteLinks.tickets.link),
  [UserRolesEnum.ORG_ADMIN]: formatLink(siteLinks.orgAdminSOPQMF.link),
} as {
  [key: string]: string;
};
