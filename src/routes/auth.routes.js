import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userRegistrationValidator,
  userLoginValidator,
} from "../validators/auth/index.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/register")
  .post(userRegistrationValidator(), validate, registerUser);

router.route("/login").post(userLoginValidator(), validate, loginUser);

router.route("/logout").post(authCheck, logoutUser);

export default router;
