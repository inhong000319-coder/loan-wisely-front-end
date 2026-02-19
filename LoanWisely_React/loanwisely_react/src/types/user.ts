export type UserProfileResponse = {
  userId: number;
  inputLevel: number | null;
  age: number | null;
  incomeYear: number | null;
  gender: "M" | "F" | string | null;
  employmentType: string | null;
  residenceType: string | null;
  debtTotal: number | null;
  existingLoanCount: number | null;
  loanPurpose: string | null;
  inputStateCode: string | null;
  isActive: "Y" | "N" | string | null;
  createdAt: string | null;
};

export type UserInputLv1 = {
  age: number | null;
  annualIncome: number | null;
  gender: "M" | "F" | null;
};

export type UserInputLv2 = {
  employmentType: string | null;
  residenceType: string | null;
};

export type UserInputLv3 = {
  loanPurpose: string | null;
  totalDebtAmount: number | null;
  existingLoanCount: number | null;
  consent: boolean;
};

export type UserInputPayload = {
  lv1: UserInputLv1;
  lv2: UserInputLv2;
  lv3: UserInputLv3;
};

export type UserConsentLevel = 2 | 3;

export type UserConsentRequest = {
  consentLevel: UserConsentLevel;
  consentGiven: boolean;
};

export type UserConsentResponse = {
  userId: number;
  consentLevel: number;
  consentGiven: "Y" | "N";
  isActive: "Y" | "N";
  createdAt: string;
};

export type UserCreditLv1Request = {
  age: number | null;
  incomeYear: number | null;
  gender: "M" | "F" | null;
};

export type UserCreditLv1Response = {
  userId: number;
  age: number;
  incomeYear: number;
  gender: "M" | "F" | string;
  createdAt: string;
};

export type UserCreditLv2Request = {
  employmentType: string | null;
  residenceType: string | null;
};

export type UserCreditLv2Response = {
  userId: number;
  employmentType: string | null;
  residenceType: string | null;
  createdAt: string;
};

export type UserCreditLv3Request = {
  loanPurpose: string | null;
  totalDebt: number | null;
  existingLoanCount: number | null;
};

export type UserCreditLv3Response = {
  userId: number;
  loanPurpose: string | null;
  totalDebt: number | null;
  existingLoanCount: number | null;
  createdAt: string;
};

export type UserProfilePayload = {
  age: number | null;
  annualIncome: number | null;
  gender: "M" | "F" | null;
};

export type UserProfileSaveRequest = {
  inputLevel: number;
  age: number | null;
  incomeYear: number | null;
  gender: "M" | "F" | null;
  employmentType?: string | null;
  residenceType?: string | null;
  debtTotal?: number | null;
  existingLoanCount?: number | null;
  loanPurpose?: string | null;
};

export type UserProfileSaveResponse = UserProfileResponse;
