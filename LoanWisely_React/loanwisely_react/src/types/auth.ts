export type UserLoginRequest = {
  loginId: string;
  password: string;
};

export type UserLoginResponse = {
  userId: number;
  roleCode?: string;
  tokenType?: string;
  accessToken: string;
  expiresIn?: number;
};

export type UserRegisterRequest = {
  loginId: string;
  password: string;
  roleCode?: string;
};

export type UserRegisterResponse = {
  userId: number;
  loginId: string;
  roleCode?: string;
};
