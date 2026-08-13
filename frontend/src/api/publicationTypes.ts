import api from "./axios";

export interface PublicationType {
  id: string;
  name: string;
}

export async function getPublicationTypes(): Promise<
  PublicationType[]
> {
  const response =
    await api.get<PublicationType[]>(
      "/publication-types"
    );

  return response.data;
}