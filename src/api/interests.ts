import api from "@/utils/api";

export interface InterestPayload {
  name: string;
  email: string;
  phone?: string;
}

export async function registerInterest(payload: InterestPayload) {
  const response = await api.post("/interests", payload);
  return response.data;
}

