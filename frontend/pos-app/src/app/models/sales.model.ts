export interface Order {
  id: number;
  order_number: string;
  store_id: number;
  session_id: number;
  cashier_id: number;
  customer_id?: number;
  status: 'open' | 'paid' | 'void';
  subtotal: number;
  discount_total: number;
  tax_total: number;
  total: number;
  payment_status: 'pending' | 'partial' | 'paid';
  created_at?: Date;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  qty: number;
  unit_price: number;
  discount_applied: number;
  subtotal: number;
}

export interface Payment {
  id: number;
  order_id: number;
  payment_method_id: number;
  amount: number;
  card_number_masked?: string;
  transaction_ref?: string;
  created_at?: Date;
}

export interface PaymentMethod {
  id: number;
  name: string;
  type: string;
  bank_account_id?: number;
}

export interface CashierSession {
  id: number;
  store_id: number;
  cashier_id: number;
  start_at: Date;
  end_at?: Date;
  opening_balance: number;
  closing_balance: number;
  total_sales: number;
  total_refunds: number;
  status: 'open' | 'closed';
}