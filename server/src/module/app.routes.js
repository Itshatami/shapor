import { Router } from "express";
import AuthRouter from "./auth/auth.routes.js";

const router = Router();

router.use("/api/auth", AuthRouter);
// router.use("/api/whoami", auth, UserRouter);
// router.use("/api/whoami", UserRouter);


const AppRotuer = router;

export default AppRotuer;
