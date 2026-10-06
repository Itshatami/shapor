import { api } from "../shared/api/Client";

export const authService = {
  sendOtp: async (phone: string) => {
    const response = await api.post("/auth/send-otp", {
      phone,
    });
    return response.data;
  },
};
