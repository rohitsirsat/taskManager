import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  resendEmailVerification,
  getCurrentUser,
  forgotPasswordRequest,
  resetForgottenPassword,
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

router.route("/verify-email/:verificationToken").get(verifyEmail);

router
  .route("/resend-email-verification")
  .post(authCheck, resendEmailVerification);

router.route("/forgot-password").post(authCheck, forgotPasswordRequest);
router.route("/reset-password/:resetToken").post(resetForgottenPassword);

router.route("/current-user").get(authCheck, getCurrentUser);

router.route("/logout").post(authCheck, logoutUser);

export default router;
