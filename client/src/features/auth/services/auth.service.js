
import api from "../../../shared/config/api"

const sendOTP = (mobile) => {
  return api.post("/auth/send-otp", { mobile });
};

const checkOTP = (mobile, code) => {
  return api.post("/auth/check-otp", {
    mobile,
    code,
  });
};

const getMe = () => {
  return api.get("/auth/me");
};

const logout = () => {
  return api.post("/auth/logout");
};

export {
  sendOTP,
  checkOTP,
  getMe,
  logout,
};

