import type {
  IDoctor,
  IDoctorConsultationTypes,
} from "@/app/authentication/types/doctor-types";
import type { IGender, IUserInfo } from "@/app/authentication/types/user-types";

export const FMD_CLIENT_QUERY_LOCAL_STORAGE_KEY = "FMD_CLIENT_QUERY";

export interface ICase {
  _id: string;
  client: IUserInfo;
  ai_case_name?: string;
  client_raw_query: string;
  client_preferences: ICaseClientPreferences;
  ai_summary?: string;
  suggested_specializations?: string[];
  urgency_level?: ICaseUrgencyLevel;
  assigned_doctor?: IDoctor;
  suggested_doctors?: IDoctor[];
  ai_doctor_summary: IAIDoctorSummary;
  doctor_notes?: string;
  tips: string[];
  status: ICaseStatus;
  preferred_time: string;
  scheduled_time?: Date;
  voice_note_url?: string;
  voice_transcript?: string;
  case_errors?: ICaseErrors;
}

export const CaseStatus = {
  Pending: "pending",
  InProgress: "in progress",
  FailedToInitiate: "failed to initiate",
  SuggestingDoctors: "suggesting doctors",
  FailedSuggestingDoctors: "failed suggesting doctors",
  Analysing: "analysing",
  Analysed: "analysed",
  FailedToAnalyse: "failed to analyse",
  ScheduleRequested: "schedule requested",
  AwaitingScheduleConfirmation: "awaiting schedule confirmation",
  Scheduled: "scheduled",
  DoctorDeclined: "doctor declined",
  DoctorNoShow: "doctor no show",
  Resolved: "resolved",
  Cancelled: "cancelled",
};

export type ICaseStatus = keyof typeof CaseStatus;

export const CaseUrgencyLevel = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export type ICaseUrgencyLevel = keyof typeof CaseUrgencyLevel;

export interface ICaseClientPreferences {
  language?: string;
  gender_preference?: IGender | null;
  consultation_type?: IDoctorConsultationTypes | null;
  previous_conditions?: string[];
  location?: string;
}

export type ICaseErrors = {
  [key in ICaseStatus]: string[];
};

export interface IAIDoctorSummary {
  [key: string]: {
    reason: string;
    suitability_score: number;
    follow_up_recommendation: string;
    next_steps: string[];
  };
}

export interface IAIDoctorMatch {
  doctorId: string;
  reason: string;
  suitability_score: number;
  follow_up_recommendation: string;
  next_steps: string[];
}

export interface IAIParsedOutput {
  ai_summary: string;
  ai_case_name: string;
  suggested_specializations: string[];
  urgency_level: "low" | "medium" | "high";
  suggested_doctors: IAIDoctorMatch[];
  tips: string[];
}
