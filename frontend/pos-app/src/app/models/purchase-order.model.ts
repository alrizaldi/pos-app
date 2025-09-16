export interface PurchaseOrder {
  id: number;
  po_number: string;
  created_by: number;
  supplier_id: number;
  store_id: number;
  status: 'pending' | 'ordered' | 'received' | 'closed';
  total: number;
  payment_terms?: string;
  created_at?: Date;
}

export interface PurchaseOrderItem {
  id: number;
  po_id: number;
  product_id: number;
  qty_ordered: number;
  qty_received: number;
  unit_price: number;
  subtotal: number;
}