export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  user_name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  email: string;
  user_name?: string;
}

export interface ValidationError {
  detail: {
    loc: string[];
    msg: string;
    type: string;
    input: string;
    ctx: Record<string, unknown>;
  }[];
}
