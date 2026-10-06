import { Router } from "express";
import AuthRouter from "./auth/auth.routes.js";
import UserRouter from "./user/user.routes.js";
import auth from "../common/guard/auth.guard.js";
const router = Router();

router.use("/auth", AuthRouter);
router.use("/whoami", auth, UserRouter);

// router.get("/", auth, (req, res, next) => {
//   //   console.log(req.headers);
//   //   console.log(req.cookies);
//   console.log(req.user);
// });

const AppRotuer = router;

export default AppRotuer;
