import { CASE_SERVICE } from "../../../http/api-services";
import { client } from "../../../http/client";
import type { ICase } from "../types/case-types";

export const createCase = (formData: Partial<ICase>) =>
  client.post(`${CASE_SERVICE}/create-case`, formData);

export const getAllCases = () => client.get(`${CASE_SERVICE}/get-all-cases`);
export const getOneCase = (caseId: string) =>
  client.get(`${CASE_SERVICE}/get-one-case/${caseId}`);
