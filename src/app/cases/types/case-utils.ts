import {
  CaseStatus,
  CaseUrgencyLevel,
  type ICaseStatus,
  type ICaseUrgencyLevel,
} from "./case-types";

export const formatDate = (dateString?: string): string => {
  if (!dateString) return "Unknown";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Invalid Date";
  }
};

export const getUrgencyColor = (level?: string) => {
  switch (level?.toLowerCase() as ICaseUrgencyLevel) {
    case CaseUrgencyLevel.HIGH:
      return "bg-red-600 text-red-50";
    case CaseUrgencyLevel.MEDIUM:
      return "bg-teal-600 text-teal-50";
    case CaseUrgencyLevel.LOW:
      return "bg-blue-600 text-blue-50";
  }
};

export const getStatusColor = (status?: string) => {
  if (
    [
      CaseStatus.Cancelled,
      CaseStatus.FailedToAnalyse,
      CaseStatus.DoctorDeclined,
      CaseStatus.DoctorNoShow,
      CaseStatus.FailedSuggestingDoctors,
      CaseStatus.FailedToInitiate,
    ].includes(status as ICaseStatus)
  ) {
    return "bg-red-600 text-red-50";
  }

  if (
    [CaseStatus.Analysed, CaseStatus.Scheduled, CaseStatus.Resolved].includes(
      status as ICaseStatus
    )
  ) {
    return "bg-blue-600 text-blue-50";
  }

  return "bg-gray-600 text-gray-50";
};
