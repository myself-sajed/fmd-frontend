export const UserRolesEnum = {
  CLIENT: "client",
  DOCTOR: "doctor",
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
