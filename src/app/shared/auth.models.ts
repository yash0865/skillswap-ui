/** Mirrors com.skillswap.dto.LoginDTO */
export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
}

/** Mirrors com.skillswap.dto.SignUpDTO */
export interface SignUpDTO {
  name: string;
  email: string;
  password: string;
  bio?: string;
}