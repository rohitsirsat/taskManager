import { body } from "express-validator";
import { AvailableUserRoles } from "../../utils/constants.js";

const userRegistrationValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be lowercase")
      .isLength({ min: 3 })
      .withMessage("Username must be at lease 3 characters long")
      .isLength({ max: 10 })
      .withMessage("Username connot exceed 13 char"),

    body("password").trim().notEmpty().withMessage("Password is required"),

    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is invalid"),
    body("username").optional(),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

const userForgottenPasswordValidator = () => {
  return [
    body("newPassword").trim().notEmpty().withMessage("Password is required"),
  ];
};

export {
  userRegistrationValidator,
  userLoginValidator,
  userForgottenPasswordValidator,
};
