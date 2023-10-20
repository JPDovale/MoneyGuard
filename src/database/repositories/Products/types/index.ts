export interface ProductFile {
  id: string;
  tag_id: string;
  name: string;
  brand: string;
  description: string | null;
  bar_code: number;
  price: number;
  quantity_in_stock: number;
  is_heavy: boolean;

  created_at: Date;
  updated_at: Date | null;
}
