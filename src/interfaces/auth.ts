export interface User {
  refreshToken: string;
  accessToken: string;
  token_expired_at: string;
  created_at: string;
  deleted: boolean;
  email: string;
  fullname: string;
  id: string;
  manager: boolean;
  status: boolean;
  telephone: string;
  updated_at: string;
  avatar: string | null;
  address: string | null;
}
