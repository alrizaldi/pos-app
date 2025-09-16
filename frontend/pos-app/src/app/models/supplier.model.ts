export interface Supplier {
  id: number;
  owner_id: number;
  store_id?: number;
  name: string;
  contact?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  created_at?: Date;
}