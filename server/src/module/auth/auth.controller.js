import autoBind from "auto-bind";
import authService from "./auth.service.js";
import AuthMessage from "./auth.message.js";
import NodeEnv from "../../common/constant/env.enum.js";

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = authService;
  }

  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.#service.sendOTP(mobile);
      return res.status(200).json({
        success: true,
        message: "OTP sent successfully",
        data: {
          expiresIn: "1d",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next) {
    try {
      const { phone, code } = req.body;
      const token = await this.#service.checkOTP(phone, code);
      return res.json({
        success: true,
        message: "Login successful",
        data: {
          token,
          user: {
            id: "...",
            phone: "...",
            role: "user",
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  logout(req, res, next) {
    try {
      return res.clearCookie("access_token").json({ message: AuthMessage.Logout });
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export default authController;
