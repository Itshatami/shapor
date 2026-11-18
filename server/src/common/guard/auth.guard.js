import jwt from "jsonwebtoken";
import User from "../../module/user/user.model.js";

export default async function auth(req, res, next) {
  try {
    const token = req.cookies?.access_token;
    console.log(token);
    

    if (!token) {
      throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded?.id) {
      throw new Error("Unauthorized");
    }

    const user = await User.findById(decoded.id).select("-otp -__v").lean();

    if (!user) {
      throw new Error("User does not exist");
    }

    if (decoded.tokenVersion !== user.tokenVersion) {
  throw new Error("Unauthorized");
}

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
