export interface SignupRequest {
  email: string;
  password: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: 0;
  refreshToken: string;
}

export interface UserInfo {email: string, isEmailConfirmed: boolean}

export interface Policy {
  id: string
  policyNumber: string
  policyholderName: string
  policyholderEmail: string
  policyholderPhone: string
  startDate: string
  endDate: string
  premiumAmount: number
  coverageAmount: number
  policyType: string
  userId: string
  user: any
}

export interface ResourceResponse<T> {
  isSuccess: boolean,
  message: string,
  result: T
}
