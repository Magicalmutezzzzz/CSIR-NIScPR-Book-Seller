import { publications as initialPublications } from "../data/publication";
import type { Publication } from "../types/publication";

const STORAGE_KEY = "nispr-publications";

function getStoredPublications(): Publication[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return initialPublications;

  try {
    const publications: unknown = JSON.parse(stored);
    return Array.isArray(publications) ? publications as Publication[] : [];
  } catch {
    return [];
  }
}

function savePublications(publications: Publication[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(publications));
}

export const publicationService = {
  getAll: getStoredPublications,
  getBooks: () => getStoredPublications().filter((item) => item.type === "Book"),
  getJournals: () => getStoredPublications().filter((item) => item.type === "Journal"),
  getMagazines: () => getStoredPublications().filter((item) => item.type === "Magazine"),
  getResearch: () => getStoredPublications().filter((item) => item.type === "Research"),
  getFeatured: () => getStoredPublications().filter((item) => item.featured),
  getById: (id: number) => getStoredPublications().find((item) => item.id === id),
  search: (query: string) => getStoredPublications().filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  ),
  create: (publication: Omit<Publication, "id" | "images">): Publication => {
    const createdPublication: Publication = {
      ...publication,
      id: Date.now(),
      images: publication.coverImage ? [publication.coverImage] : [],
    };
    savePublications([...getStoredPublications(), createdPublication]);
    return createdPublication;
  },
  delete: (id: number): void => {
    savePublications(getStoredPublications().filter((item) => item.id !== id));
  },
};
