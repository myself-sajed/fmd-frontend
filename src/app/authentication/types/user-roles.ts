export const UserRolesEnum = {
  CLIENT: "Client",
  DOCTOR: "Doctor",
} as const;

export const UserRoles = {
  [UserRolesEnum.CLIENT]: {
    role: UserRolesEnum.CLIENT,
    name: "Client",
  },
  [UserRolesEnum.DOCTOR]: {
    role: UserRolesEnum.DOCTOR,
    name: "Doctor",
  },
};
