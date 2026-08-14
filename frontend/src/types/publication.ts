export interface PublicationAuthor {
  id: string;
  full_name: string;
  email?: string | null;
  affiliation?: string | null;
  designation?: string | null;
  biography?: string | null;
  profile_photo?: string | null;
  orcid?: string | null;
  website?: string | null;
}

export interface PublicationCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  display_order?: number;
  is_active?: boolean;
}
export interface Publication {
  id: string;

  title: string;

  subtitle?: string | null;

  slug: string;

  description?: string | null;

  author?: string | null;

  keywords?: string | null;

  publication_type_id: string;

  publisher_id?: string | null;

  isbn?: string | null;

  issn?: string | null;

  doi?: string | null;

  sku?: string | null;

  price: number;

  discount_price?: number | null;

  stock: number;

  language?: string | null;

  format?: string | null;

  edition?: string | null;

  pages?: number | null;

  publication_date?: string | null;

  cover_image?: string | null;

  pdf_preview?: string | null;

  is_featured: boolean;

  is_active: boolean;

  authors?: PublicationAuthor[];

  categories?: PublicationCategory[];

  types?: { id: string; name: string }[];

  status?: { id: string; name: string }[];

  revenue: number;

  updated_at: string; 

  created: string;

  sold: number;
}