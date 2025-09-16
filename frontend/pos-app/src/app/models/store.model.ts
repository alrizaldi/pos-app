export interface Store {
  id: number;
  owner_id: number;
  name: string;
  address?: string;
  phone?: string;
  timezone?: string;
  currency?: string;
  is_active: boolean;
  created_at?: Date;
}