export interface User {
  id: number;
  username: string;
  email: string;
  password_hash?: string;
  full_name: string;
  role_id: number;
  owner_id?: number;
  store_id?: number;
  is_active: boolean;
  last_login?: Date;
  created_at?: Date;
}