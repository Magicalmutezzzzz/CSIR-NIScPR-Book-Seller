export interface PublicationType {
  id: string;
 name: string;
}

export interface PublicationStatus {
  id: string;
 name: "Draft" | "Pending Review" | "Published" | "Archived";
}

export interface PublicationCategory {
  id: string;
 name: string;
 slug: string;
}

export interface Publication {

  id: string;

  title: string;

  subtitle?: string;

  slug: string;

  description?: string;

  author?: string;

  keywords?: string;

  publication_type?: {
    id: string;
    name: string;
  };

  categories?: {
    id: string;
    name: string;
    slug: string;
  }[];

  publication_type_id: string;

  category_ids?: string[];

  publisher_id?: string;

  isbn?: string;

  issn?: string;

  doi?: string;

  sku?: string;

  price: number;

  discount_price?: number;

  stock: number;

  language?: string;

  format?: string;

  edition?: string;

  pages?: number;

  publication_date?: string;

  cover_image?: string;

  pdf_preview?: string;

  is_featured: boolean;

  is_active: boolean;

  sold?: number;

  revenue?: number;

  created?: string;

  updated_at?: string;

  status?: {
    id: string;
    name: "Draft" | "Pending Review" | "Published" | "Archived";
  };

}