// 사용자 입력 폼 값 타입
export type FormValues = {
  age: number | null;
  annualIncome: number | null;
  gender: "M" | "F" | "";
  employmentType: string;
  residenceType: string;
  loanPurpose: string;
  totalDebtAmount: number | null;
  existingLoanCount: number | null;
  consent: boolean;
};
