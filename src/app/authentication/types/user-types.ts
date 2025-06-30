export interface IUserInfo {
  _id: string;
  name: string;
  email: string;
  role: IUserRole;
  password: string;
  photoURL: string;
  gender: IGender;
  onboarded?: boolean;
}

export const Gender = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
};

export type IGender = keyof typeof Gender;

export const UserRoles = {
  ADMIN: "Admin",
  PATIENT: "Client",
  DOCTOR: "Doctor",
};

export type IUserRole = keyof typeof UserRoles;
