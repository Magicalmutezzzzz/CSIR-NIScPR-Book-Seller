import { Publication } from "../types/publication";
export const publications: Publication[] = [
  {
    id: 1,
    title: "Artificial Intelligence Fundamentals",
    author: "CSIR–NIScPR",
    description:
      "Introduction to Artificial Intelligence and modern computing.",
    type: "Book",
    category: "Computer Science",
    language: "English",
    isbn: "978000000001",
    pages: 350,
    year: 2025,
    price: 899,
    stock: 20,
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    ],
  },

  {
    id: 2,
    title: "Biotechnology Advances",
    author: "CSIR–NIScPR",
    description:
      "Modern Biotechnology research publication.",
    type: "Book",
    category: "Biotechnology",
    language: "English",
    isbn: "978000000002",
    pages: 280,
    year: 2025,
    price: 799,
    stock: 12,
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
    images: [
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
    ],
  },

  {
    id: 3,
    title: "Indian Journal of Chemistry",
    author: "CSIR",
    description: "Latest Chemistry Journal.",
    type: "Journal",
    category: "Chemistry",
    language: "English",
    isbn: "",
    pages: 120,
    year: 2025,
    price: 399,
    stock: 30,
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8",
    images: [],
  },

  {
    id: 4,
    title: "Indian Journal of Physics",
    author: "CSIR",
    description: "Physics Research Journal.",
    type: "Journal",
    category: "Physics",
    language: "English",
    isbn: "",
    pages: 140,
    year: 2025,
    price: 449,
    stock: 25,
    featured: false,
    coverImage:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    images: [],
  },

  {
    id: 5,
    title: "Science Reporter",
    author: "CSIR",
    description: "Monthly Science Magazine.",
    type: "Magazine",
    category: "Science",
    language: "English",
    isbn: "",
    pages: 60,
    year: 2025,
    price: 99,
    stock: 100,
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
    images: [],
  },

  {
    id: 6,
    title: "Climate Change Research",
    author: "NIScPR",
    description:
      "Research publication on climate change.",
    type: "Research",
    category: "Environment",
    language: "English",
    isbn: "",
    pages: 180,
    year: 2025,
    price: 599,
    stock: 18,
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    images: [],
  },
];