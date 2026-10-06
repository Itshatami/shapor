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
      return res.status(200).json({ message: AuthMessage.SendOTP });
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const token = await this.#service.checkOTP(mobile, code);
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === NodeEnv.Production,
        })
        .json({ message: AuthMessage.LoginSuccessfully, token });
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
