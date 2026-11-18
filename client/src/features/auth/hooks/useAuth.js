import { useMutation, useQuery } from "@tanstack/react-query";
import { sendOTP, checkOTP, getProfile } from "../services/auth.service";

function useSendOTP() {
  return useMutation({
    mutationFn: sendOTP,
  });
}

function useCheckOTP() {
  return useMutation({
    mutationFn: ({ mobile, code }) => checkOTP(mobile, code),
  });
}

function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const { data } = await getProfile();
        return data.data.user;
      } catch (error) {
        console.log("Error:", error);
        console.log("Error name:", error.name);
        console.log("Error message:", error.message);
        console.log("Error code:", error.code);

        if (error.response?.status === 401) {
          return null;
        }

        throw error;
      }
    },
    retry: false,
  });
}

export { useSendOTP, useCheckOTP, useProfile };
