import api from "./axios";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  display_order?: number;
  is_active?: boolean;
}

export async function getCategories(): Promise<
  Category[]
> {
  const response =
    await api.get<Category[]>("/categories");

  return response.data;
}

export async function createCategory(
  data: unknown,
): Promise<Category> {
  const response =
    await api.post<Category>(
      "/categories",
      data,
    );

  return response.data;
}

export async function updateCategory(
  id: string,
  data: unknown,
): Promise<Category> {
  const response =
    await api.put<Category>(
      `/categories/${id}`,
      data,
    );

  return response.data;
}

export async function deleteCategory(
  id: string,
): Promise<void> {
  await api.delete(`/categories/${id}`);
}