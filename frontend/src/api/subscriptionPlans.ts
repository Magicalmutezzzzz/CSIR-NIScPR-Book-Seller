import api from "./axios";

export interface SubscriptionPlan {
  id: string;
  publication_id: string;
  duration_years: number;
  price: string;
  is_active: boolean;
}

export interface SubscriptionPlanCreate {
  publication_id: string;
  duration_years: number;
  price: number;
  is_active?: boolean;
}

export async function createSubscriptionPlan(
  data: SubscriptionPlanCreate,
): Promise<SubscriptionPlan> {
  const response =
    await api.post<SubscriptionPlan>(
      "/subscription-plans",
      data,
    );

  return response.data;
}

export async function getPublicationSubscriptionPlans(
  publicationId: string,
): Promise<SubscriptionPlan[]> {
  const response =
    await api.get<SubscriptionPlan[]>(
      `/subscription-plans/publication/${publicationId}`,
    );

  return response.data;
}