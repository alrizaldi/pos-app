export interface Product {
  id: number;
  owner_id: number;
  store_id?: number;
  sku: string;
  name: string;
  description?: string;
  uom?: string;
  cost_price: number;
  sell_price: number;
  weight?: number;
  category_id?: number;
  supplier_id?: number;
  stock_tracking: boolean;
  images?: string;
  created_at?: Date;
}