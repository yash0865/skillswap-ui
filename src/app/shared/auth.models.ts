/** Mirrors com.skillswap.dto.LoginDTO */
export interface LoginDTO {
  email: string;
  password: string;
}

/** Mirrors com.skillswap.dto.SignUpDTO */
export interface SignUpDTO {
  name: string;
  email: string;
  password: string;
  bio?: string;
}