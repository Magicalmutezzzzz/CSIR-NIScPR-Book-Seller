import api from "./axios";
import type { Publication } from "../types/publication";

export type PublicationQuery = {
  page?: number;
  limit?: number;
  search?: string;
  featured?: boolean;
  latest?: boolean;
  in_stock?: boolean;
  min_price?: number;
  max_price?: number;
};

export async function getPublications(
  params: PublicationQuery = {}
): Promise<Publication[]> {
  const response = await api.get<Publication[]>(
    "/publications",
    {
      params,
    }
  );

  return response.data;
}

export async function getPublication(
  id: string
): Promise<Publication> {
  const response = await api.get<Publication>(
    `/publications/${id}`
  );

  return response.data;
}

export async function createPublication(
  data: unknown
): Promise<Publication> {
  const response = await api.post<Publication>(
    "/publications",
    data
  );

  return response.data;
}

export async function updatePublication(
  id: string,
  data: unknown
): Promise<Publication> {
  const response = await api.put<Publication>(
    `/publications/${id}`,
    data
  );

  return response.data;
}

export async function deletePublication(
  id: string
): Promise<void> {
  await api.delete(
    `/publications/${id}`
  );
}