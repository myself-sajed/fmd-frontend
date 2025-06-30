import type { IUserInfo } from "./user-types";

export interface IDoctor {
  _id: string;
  user: IUserInfo;
  specialization: string[];
  degree: string[];
  experience: number;
  bio?: string;
  languages: string[];
  consultation_types: IDoctorConsultationTypes;
  availability?: {
    days: string[];
    from: string;
    to: string;
  };
  location?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

export interface IGetAllDoctorFilter {
  specialization?: string;
  degree?: string;
  experience?: number;
  availability?: {
    days?: string[];
    from?: string;
    to?: string;
  };
  page?: number;
  limit?: number;
}

export const DoctorConsultationTypes = {
  ONLINE: "Online",
  OFFLINE: "Offline",
  BOTH: "Online & Offline",
};

export type IDoctorConsultationTypes = keyof typeof DoctorConsultationTypes;
