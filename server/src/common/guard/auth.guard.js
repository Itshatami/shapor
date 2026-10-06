import jwt from "jsonwebtoken";
import User from "../../module/user/user.model.js";

export default async function auth(req, res, next) {
  try {
    const token = req.cookies?.access_token;
    if (!token) throw new Error("unAuthorized");

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decode?.id) {
      const user = await User.findOne({ _id: decode.id }).lean();
      if (!user) throw new Error("user does not exists");
      req.user = user;
      return next();
    }
    throw new Error("un authorized");
  } catch (error) {
    next(error);
  }
}
