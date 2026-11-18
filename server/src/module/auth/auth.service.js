import autoBind from "auto-bind";
import { randomInt } from "crypto";
import jwt from "jsonwebtoken";

import User from "../user/user.model.js";
import AuthMessage from "./auth.message.js";

class AuthService {
  #model;

  constructor() {
    autoBind(this);
    this.#model = User;
  }

  async sendOTP(mobile) {
    const user = await this.#model.findOne({ mobile });

    const now = Date.now();

    const otp = {
      code: String(randomInt(10000, 100000)),
      expiresIn: now + 1000 * 60 * 2,
    };

    // Create a new user if not exists
    if (!user) {
      await this.#model.create({
        mobile,
        otp,
      });

      return;
    }

    // Prevent sending a new OTP before expiration
    if (user.otp?.expiresIn > now) {
      throw new Error(AuthMessage.OtpNotExpired);
    }

    // Update OTP
    user.otp = {
      ...otp,
      verifiedMobile: false,
    };

    await user.save();
    console.log(otp);

    // TODO: Send OTP via SMS in production
  }

  async checkOTP(mobile, code) {
    const user = await this.findUserByMobile(mobile);

    const now = Date.now();

    // Check OTP existence and expiration
    if (!user.otp?.code || !user.otp?.expiresIn || user.otp.expiresIn <= now) {
      throw new Error(AuthMessage.OtpExpired);
    }

    // Check OTP code
    if (String(user.otp.code) !== String(code)) {
      throw new Error(AuthMessage.OtpIncorrect);
    }

    // Generate JWT
    const token = this.signToken({
      id: user._id,
      mobile: user.mobile,
      tokenVersion: user.tokenVersion,
    });

    // Verify mobile and consume OTP
    user.otp = {
      verifiedMobile: true,
      expiresIn: 0,
    };

    await user.save();

    return { user, token };
  }

  async findUserByMobile(mobile) {
    const user = await this.#model.findOne({ mobile });

    if (!user) {
      throw new Error(AuthMessage.NotFoundUser);
    }

    return user;
  }

  signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
  }
}

const authService = new AuthService();

export default authService;
