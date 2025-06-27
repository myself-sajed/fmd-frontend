import { AUTH_SERVICE } from "../../../http/api-services";
import { client } from "../../../http/client";
import type { ILoginForm, ISignupForm } from "../types/auth-types";

export const self = () => client.get(`${AUTH_SERVICE}/self`);

export const checkToken = () => client.get(`${AUTH_SERVICE}/check-token`);

export const createAccount = (formData: ISignupForm) =>
  client.post(`${AUTH_SERVICE}/register`, formData);

export const login = (formData: ILoginForm) =>
  client.post(`${AUTH_SERVICE}/login`, formData);

export const refreshToken = () => client.post(`${AUTH_SERVICE}/refresh`);

export const logout = () => client.post(`${AUTH_SERVICE}/logout`);
