export interface SaleFile {
  id: string;
  payment_type: 'MONEY' | 'CARD' | 'NOT-PAYED';
  payment_value: number;
  customer_id: string;
  created_at: Date;
  updated_at: Date | null;
}

export interface SaleProductFile {
  id: string;
  quantity: number;
  total: number;
  product_id: string;
  sale_id: string;
  created_at: Date;
  updated_at: Date | null;
}
