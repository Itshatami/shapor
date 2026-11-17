import { api } from "../../../shared/config/api";

const sendOTP = async (mobile) => {
  try {
    const response = await api.post("/auth/send-otp", { mobile });
    return response;
  } catch (error) {
    return new Promise.reject({ error });
  }
};

const checkOTP = (mobile, code) => {
  return api.post("/auth/check-otp", {
    mobile,
    code,
  });
};

const getProfile = () => {
  return api.get("/api/whoami");
};

const logout = () => {
  return api.post("/auth/logout");
};

export { sendOTP, checkOTP, getProfile, logout };
