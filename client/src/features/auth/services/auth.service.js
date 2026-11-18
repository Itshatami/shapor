
import { api } from "../../../shared/config/api";

const sendOTP = (mobile) => {
  return api.post("/auth/send-otp", { mobile });
};

const checkOTP = (mobile, code) => {
  return api.post("/auth/check-otp", {
    mobile,
    code,
  });
};

const getProfile = () => {
  return api.get("/auth/me");
};

const logout = () => {
  return api.get("/auth/logout");
};

export { sendOTP, checkOTP, getProfile, logout };
