import { Router } from "express";
import userController from "./user.controller.js";
import auth from "../../common/guard/auth.guard.js";

const router = Router();

router.get("/" ,auth , userController.whoami)

const UserRouter = router;

export default UserRouter;
