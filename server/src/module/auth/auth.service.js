import autoBind from "auto-bind";
import User from "../user/user.model.js";
import { randomInt } from "crypto";
import AuthMessage from "./auth.message.js";
import jwt from "jsonwebtoken";

class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = User;
  }

  async sendOTP(phone) {
    // find the user
    const user = await this.#model.findOne({ phone });

    const now = new Date().getTime();
    const otp = {
      code: Math.floor(randomInt(10000, 99999)),
      expiresIn: now + 1000 * 60 * 2,
    };

    // if user not exists, create
    if (!user) {
      const newUser = await this.#model.create({ phone, otp });
      return newUser;
    }

    // check otp exiresIn
    if (user.otp && user.otp.expiresIn > now) throw new Error(AuthMessage.OtpNotExpired);

    // if otp expires, give a new one
    user.otp = otp;
    await user.save();

    // send otp via sms or email
    // logic will apply in production
  }

  async checkOTP(phone, code) {
    const now = new Date().getTime();
    const user = await this.findUserByPhone(phone);

    if (user?.otp?.expiresIn < now) throw new Error(AuthMessage.OtpExpired);
    if (user?.otp?.code !== code) throw new Error(AuthMessage.OtpIncorrect);

    const token = this.signToken({ id: user._id, phone });
    user.token = token;
    if (!user.otp.verifiedPhone) user.otp.verifiedPhone = true;

    await user.save();
    return { user, token };
  }

  async findUserByPhone(phone) {
    const user = await this.#model.findOne({ phone });
    if (!user) throw new Error(AuthMessage.NotFoundUser);
    return user;
  }

  signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
  }
}

const authService = new AuthService();
export default authService;
