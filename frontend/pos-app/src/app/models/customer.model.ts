export interface Customer {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  member_since?: Date;
  points?: number;
  tier?: string;
  created_at?: Date;
}