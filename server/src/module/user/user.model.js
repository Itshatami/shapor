import { Schema, model } from "mongoose";

const otpSchema = new Schema({
  code: { type: String, required: false, default: undefined },
  expiresIn: { type: Number, required: false, default: 0 },
  verifiedMobile: { type: Boolean, required: false, default: false },
});

const userSchema = new Schema(
  {
    username: { type: String, required: false, default: undefined },
    mobile: { type: String, unique: true, required: true },
    otp: { type: otpSchema },
    role: { type: String, enum: ["admin", "user", "owner"], default: "user" },
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const User = model("User", userSchema);

export default User;
