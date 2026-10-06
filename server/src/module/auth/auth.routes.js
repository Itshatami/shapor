import { Router } from "express";
import authController from "./auth.controller.js";
import auth from "../../common/guard/auth.guard.js";
const router = Router();

router.post("/send-otp", authController.sendOTP);
router.post("/check-otp", authController.checkOTP);
router.get("/me", auth, (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    next(error);
  }
});
router.get("/logout", auth ,authController.logout);

const AuthRouter = router;
export default AuthRouter;
