export type PublicationType =
  | "Book"
  | "Journal"
  | "Magazine"
  | "Research"
  | "Other";

export interface Publication {
  id: number;

  title: string;

  author: string;

  description: string;

  type: PublicationType;

  category: string;

  language: string;

  isbn: string;

  pages: number;

  year: number;

  price: number;

  stock: number;

  featured: boolean;

  coverImage: string;

  images: string[];
}
