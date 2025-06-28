import { CASE_SERVICE } from "../../../http/api-services";
import { client } from "../../../http/client";
import type { ICase } from "../types/case-types";

export const createCase = (formData: Partial<ICase>) =>
  client.post(`${CASE_SERVICE}/`, formData);
