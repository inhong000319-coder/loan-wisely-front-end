import { fetcher } from "@/infra/fetcher";
import type { ApiResponse } from "@/types/common";

import type {
  UserConsentRequest,
  UserConsentResponse,
  UserCreditLv1Request,
  UserCreditLv1Response,
  UserCreditLv2Request,
  UserCreditLv2Response,
  UserCreditLv3Request,
  UserCreditLv3Response,
  UserProfileSaveRequest,
  UserProfileSaveResponse,
  UserProfileResponse,
} from "@/types/user";

export const fetchUserProfile = async (): Promise<UserProfileResponse> =>
  fetcher<ApiResponse<UserProfileResponse>>("/api/users/me/profile").then(
    (response) => response.data,
  );

export const createUserConsent = async (
  payload: UserConsentRequest,
): Promise<UserConsentResponse> =>
  fetcher<ApiResponse<UserConsentResponse>>("/api/users/me/consents", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => response.data);

export const saveUserCreditLv1 = async (
  payload: UserCreditLv1Request,
): Promise<UserCreditLv1Response> =>
  fetcher<ApiResponse<UserCreditLv1Response>>("/api/users/me/credit/lv1", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      age: payload.age,
      incomeYear: payload.incomeYear,
      gender: payload.gender,
    }),
  }).then((response) => response.data);

export const saveUserCreditLv2 = async (
  payload: UserCreditLv2Request,
): Promise<UserCreditLv2Response> =>
  fetcher<ApiResponse<UserCreditLv2Response>>("/api/users/me/credit/lv2", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      employmentType: payload.employmentType,
      residenceType: payload.residenceType,
    }),
  }).then((response) => response.data);

export const saveUserCreditLv3 = async (
  payload: UserCreditLv3Request,
): Promise<UserCreditLv3Response> =>
  fetcher<ApiResponse<UserCreditLv3Response>>("/api/users/me/credit/lv3", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      loanPurpose: payload.loanPurpose,
      totalDebt: payload.totalDebt,
      existingLoanCount: payload.existingLoanCount,
    }),
  }).then((response) => response.data);

export const saveUserProfile = async (
  payload: UserProfileSaveRequest,
): Promise<UserProfileSaveResponse> =>
  fetcher<ApiResponse<UserProfileSaveResponse>>("/api/users/me/profile", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      inputLevel: payload.inputLevel,
      age: payload.age,
      incomeYear: payload.incomeYear,
      gender: payload.gender,
      employmentType: payload.employmentType,
      residenceType: payload.residenceType,
      debtTotal: payload.debtTotal,
      existingLoanCount: payload.existingLoanCount,
      loanPurpose: payload.loanPurpose,
    }),
  }).then((response) => response.data);
