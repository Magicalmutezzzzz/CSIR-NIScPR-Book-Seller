import api from "./axios";

export async function getPublishers() {
  const response = await api.get("/publishers");
  return response.data;
}