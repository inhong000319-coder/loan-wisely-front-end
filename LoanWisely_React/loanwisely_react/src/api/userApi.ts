import { fetcher } from "@/infra/fetcher";

import type {
  UserConsentRequest,
  UserConsentResponse,
  UserCreditLv2Request,
  UserCreditLv2Response,
  UserCreditLv3Request,
  UserCreditLv3Response,
  UserInputPayload,
  UserProfileSaveRequest,
  UserProfileSaveResponse,
  UserProfileResponse,
} from "@/types/user";

export const fetchUserProfile = async (userId: string): Promise<UserProfileResponse> =>
  fetcher<UserProfileResponse>(`/api/user?userId=${encodeURIComponent(userId)}`);

export const submitUserInput = async (payload: UserInputPayload): Promise<void> =>
  fetcher<void>("/api/user", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

export const createUserConsent = async (
  payload: UserConsentRequest,
): Promise<UserConsentResponse> =>
  fetcher<UserConsentResponse>("/api/users/me/consents", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

export const saveUserCreditLv2 = async (
  payload: UserCreditLv2Request,
): Promise<UserCreditLv2Response> =>
  fetcher<UserCreditLv2Response>("/api/users/me/credit/lv2", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

export const saveUserCreditLv3 = async (
  payload: UserCreditLv3Request,
): Promise<UserCreditLv3Response> =>
  fetcher<UserCreditLv3Response>("/api/users/me/credit/lv3", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

export const saveUserProfile = async (
  payload: UserProfileSaveRequest,
): Promise<UserProfileSaveResponse> =>
  fetcher<UserProfileSaveResponse>("/api/users/me/profile", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

