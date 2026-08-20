import {
  getPublications,
  getPublication,
  createPublication,
  updatePublication,
  deletePublication,
} from "../api/publications";

import { getPublicationTypes } from "../api/publicationTypes";

import type { Publication } from "../types/publication";

type PublicationType = {
  id: string;
  name: string;
};

async function getTypeId(
  name: string
): Promise<string | undefined> {
  const types =
    await getPublicationTypes();

  const type = (
    types as PublicationType[]
  ).find(
    (item) =>
      item.name.toLowerCase() ===
      name.toLowerCase()
  );

  return type?.id;
}

export const publicationService = {

  async getAll(): Promise<Publication[]> {
    return getPublications({
      limit: 100,
    });
  },

  async getById(
    id: string
  ): Promise<Publication> {
    return getPublication(id);
  },

  async create(
    data: unknown
  ): Promise<Publication> {
    return createPublication(data);
  },

  async update(
    id: string,
    data: unknown
  ): Promise<Publication> {
    return updatePublication(id, data);
  },

  async delete(
    id: string
  ): Promise<void> {
    return deletePublication(id);
  },

  async getFeatured(): Promise<Publication[]> {
    return getPublications({
      featured: true,
      limit: 100,
    });
  },

  async getBooks(): Promise<Publication[]> {
    const typeId =
      await getTypeId("Book");

    if (!typeId) {
      return [];
    }

    const publications =
      await getPublications({
        limit: 100,
      });

    return publications.filter(
      (publication) =>
        publication.publication_type_id ===
        typeId
    );
  },

  async getJournals(): Promise<Publication[]> {
    const typeId =
      await getTypeId("Journal");

      console.log("Journal Type ID:", typeId);

    if (!typeId) {
      return [];
    }

    const publications =
      await getPublications({
        limit: 100,
      });

      console.log(publications);

    return publications.filter(
      (publication) =>
        publication.publication_type_id ===
        typeId
    );
  },

  async getMagazines(): Promise<Publication[]> {
    const typeId =
      await getTypeId("Magazine");

    if (!typeId) {
      return [];
    }

    const publications =
      await getPublications({
        limit: 100,
      });

    return publications.filter(
      (publication) =>
        publication.publication_type_id ===
        typeId
    );
  },

  async search(
    query: string
  ): Promise<Publication[]> {
    return getPublications({
      search: query,
      limit: 100,
    });
  },
};