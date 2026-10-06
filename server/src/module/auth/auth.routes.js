import { Router } from "express";
import authController from "./auth.controller.js";
import auth from "../../common/guard/auth.guard.js";
const router = Router();

router.post("/send-otp", authController.sendOTP);
router.post("/check-otp", authController.checkOTP);
router.get("/logout", auth ,authController.logout);

const AuthRouter = router;
export default AuthRouter;
