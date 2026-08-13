import api from "./axios";

export interface PublicationImage {
  id: string;
  publication_id: string;
  image_url: string;
  alt_text?: string | null;
  display_order: number;
  is_primary: boolean;
}

export interface PublicationImageCreate {
  publication_id: string;
  image_url: string;
  alt_text?: string | null;
  display_order?: number;
  is_primary?: boolean;
}

export async function createPublicationImage(
  data: PublicationImageCreate,
): Promise<PublicationImage> {
  const response =
    await api.post<PublicationImage>(
      "/publication-images",
      data,
    );

  return response.data;
}

export async function getPublicationImages(
  publicationId: string,
): Promise<PublicationImage[]> {
  const response =
    await api.get<PublicationImage[]>(
      `/publication-images/publication/${publicationId}`,
    );

  return response.data;
}