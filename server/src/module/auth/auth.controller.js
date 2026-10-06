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
          expiresIn: 120,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next) {
    try {
      const { phone, code } = req.body;
      const { user, token } = await this.#service.checkOTP(phone, code);
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === NodeEnv.Production,
          sameSite: "lax",
          maxAge: 1000 * 60 * 60 * 24,
        })
        .json({
          success: true,
          message: "Login successful",
          data: {
            user: {
              id: use._id,
              phone: user.phone,
              role: user.role,
            },
          },
        });
    } catch (error) {
      next(error);
    }
  }

  logout(req, res, next) {
    try {
      return res.clearCookie("access_token").status(200).json({
        success: true,
        message: AuthMessage.Logout,
      });
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export default authController;
