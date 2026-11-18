import jwt from "jsonwebtoken";
import User from "../../module/user/user.model.js";

class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.statusCode = 401;
  }
}

export default async function auth(req, res, next) {
  try {
    const token = req.cookies?.access_token;
    // console.log(token);

    if (!token) throw new UnauthorizedError();

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded?.id) throw new UnauthorizedError();

    const user = await User.findById(decoded.id).select("-otp -__v").lean();

    if (!user) throw new UnauthorizedError();

    if (decoded.tokenVersion !== user.tokenVersion) throw new UnauthorizedError();

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError());
    }
    next(error);
  }
}
