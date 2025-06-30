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

export const getUrgencyColor = (
  level?: string
): "destructive" | "default" | "secondary" => {
  switch (level?.toLowerCase() as ICaseUrgencyLevel) {
    case CaseUrgencyLevel.HIGH:
      return "destructive";
    case CaseUrgencyLevel.MEDIUM:
      return "default";
    case CaseUrgencyLevel.LOW:
      return "secondary";
    default:
      return "secondary";
  }
};

export const getStatusColor = (
  status?: string
): "default" | "secondary" | "destructive" => {
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
    return "destructive";
  }

  if (
    [CaseStatus.Analysed, CaseStatus.Scheduled, CaseStatus.Resolved].includes(
      status as ICaseStatus
    )
  ) {
    return "default";
  }

  return "secondary";
};
