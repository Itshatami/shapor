import { Schema, model } from "mongoose";

const otpSchema = new Schema({
  code: { type: String, required: false, default: undefined },
  expiresIn: { type: Number, required: false, default: 0 },
  verifiedMobile: { type: Boolean, required: false, default: false },
});

const userSchema = new Schema(
  {
    username: { type: String, required: false, default: undefined },
    mobile: { type: String, required: true },
    otp: { type: otpSchema },
    accessToken: { type: String },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
