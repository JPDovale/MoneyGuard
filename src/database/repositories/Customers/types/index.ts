export interface CustomerFile {
  id: string;
  name: string;
  owing: number | null;
  created_at: Date;
  updated_at: Date | null;
}
