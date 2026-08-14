export interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  is_active: boolean;
}