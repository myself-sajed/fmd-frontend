import {
  CaseStatus,
  CaseUrgencyLevel,
  type ICase,
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

export const shouldShowError = (caseDetails: ICase) => {
  const errorStatuses = [
    CaseStatus.Cancelled,
    CaseStatus.FailedSuggestingDoctors,
    CaseStatus.FailedToInitiate,
    CaseStatus.FailedToAnalyse,
  ];

  const isCaseError = errorStatuses.includes(
    caseDetails?.status as ICaseStatus
  );
  const errorMessage =
    caseDetails?.case_errors?.[caseDetails.status] ||
    "Failed to analyse your query";
  return {
    isCaseError,
    errorMessage,
  };
};

export const shouldShowLoading = (caseDetails: ICase) => {
  const loadingStatuses = [
    CaseStatus.Analysing,
    CaseStatus.Pending,
    CaseStatus.InProgress,
    CaseStatus.SuggestingDoctors,
  ];

  const isCaseBeingAnalysed = loadingStatuses?.includes(
    caseDetails?.status as ICaseStatus
  );
  const loadingMessage = "Analysing and finding right doctors for you";
  return {
    isCaseBeingAnalysed,
    loadingMessage,
    loadingStatus: caseDetails.status,
  };
};
