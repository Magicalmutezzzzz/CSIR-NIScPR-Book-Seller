import { publications } from "../data/publication";
import { Publication } from "../types/publication";
export const publicationService = {
  getAll(): Publication[] {
    return publications;
  },

  getBooks(): Publication[] {
    return publications.filter((p) => p.type === "Book");
  },

  getJournals(): Publication[] {
    return publications.filter((p) => p.type === "Journal");
  },

  getMagazines(): Publication[] {
    return publications.filter((p) => p.type === "Magazine");
  },

  getResearch(): Publication[] {
    return publications.filter((p) => p.type === "Research");
  },

  getFeatured(): Publication[] {
    return publications.filter((p) => p.featured);
  },

  getById(id: number): Publication | undefined {
    return publications.find((p) => p.id === id);
  },

  search(query: string): Publication[] {
    return publications.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  },
};