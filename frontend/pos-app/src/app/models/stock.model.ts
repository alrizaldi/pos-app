export interface StockMovement {
  id: number;
  type: 'receive' | 'sale' | 'adjustment' | 'transfer';
  product_id: number;
  qty: number;
  store_id: number;
  reference_id?: number;
  created_by: number;
  created_at?: Date;
  note?: string;
}

export interface StockBalance {
  id: number;
  product_id: number;
  store_id: number;
  qty_on_hand: number;
  qty_reserved: number;
  updated_at?: Date;
}