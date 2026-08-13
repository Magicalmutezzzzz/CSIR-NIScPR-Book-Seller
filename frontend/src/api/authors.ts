import api from "./axios";

export interface Author {
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

export async function getAuthors(): Promise<Author[]> {
  const response = await api.get<Author[]>("/authors");

  return response.data;
}

export async function getAuthor(
  id: string,
): Promise<Author> {
  const response = await api.get<Author>(
    `/authors/${id}`,
  );

  return response.data;
}

export async function createAuthor(
  data: unknown,
): Promise<Author> {
  const response = await api.post<Author>(
    "/authors",
    data,
  );

  return response.data;
}

export async function updateAuthor(
  id: string,
  data: unknown,
): Promise<Author> {
  const response = await api.put<Author>(
    `/authors/${id}`,
    data,
  );

  return response.data;
}

export async function deleteAuthor(
  id: string,
): Promise<void> {
  await api.delete(`/authors/${id}`);
}