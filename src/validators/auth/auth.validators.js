// import { body } from "express-validator";
// import { AvailableUserRoles } from "../../utils/constants.js";

// const userRegistrationValidator = () => {
//   return [
//     body("email")
//       .trim()
//       .notEmpty()
//       .withMessage("Email is required")
//       .isEmail()
//       .withMessage("Email is invalid"),

//     body("username")
//       .trim()
//       .notEmpty()
//       .withMessage("Username is required")
//       .isLowercase()
//       .withMessage("Username must be lowercase")
//       .isLength({ min: 3, max: 13 })
//       .withMessage("Username must be between 3 and 13 characters long"),

//     body("password")
//       .trim()
//       .notEmpty()
//       .withMessage("Password is required")
//       .isLength({ min: 8 })
//       .withMessage("Password must be at least 8 characters long")
//       .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
//       .withMessage("Password must include uppercase, lowercase, and number"),

//     body("role")
//       .optional()
//       .isIn(AvailableUserRoles)
//       .withMessage("Invalid user role"),
//   ];
// };

// const userLoginValidator = () => {
//   return [
//     body("email").trim().optional().isEmail().withMessage("Email is invalid"),
//     body("username").trim().optional(),
//     body("password").notEmpty().withMessage("Password is required"),
//   ];
// };

// const userForgotPasswordValidator = () => {
//   return [
//     body("email")
//       .notEmpty()
//       .withMessage("Email is required")
//       .isEmail()
//       .withMessage("Email is invalid"),
//   ];
// };

// const userChangeCurrentPasswordValidator = () => {
//   return [
//     body("oldPassword")
//       .trim()
//       .notEmpty()
//       .withMessage("oldPassword is required"),
//     body("newPassword")
//       .trim()
//       .notEmpty()
//       .withMessage("Password is required")
//       .isLength({ min: 8 })
//       .withMessage("Password must be at least 8 characters long")
//       .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
//       .withMessage("Password must include uppercase, lowercase, and number"),
//   ];
// };

// const userRestForgottenPasswordValidator = () => {
//   return [
//     body("newPassword")
//       .trim()
//       .notEmpty()
//       .withMessage("Password is required")
//       .isLength({ min: 8 })
//       .withMessage("Password must be at least 8 characters long")
//       .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
//       .withMessage("Password must include uppercase, lowercase, and number"),
//   ];
// };

// export {
//   userRegistrationValidator,
//   userLoginValidator,
//   userForgotPasswordValidator,
//   userChangeCurrentPasswordValidator,
//   userRestForgottenPasswordValidator,
// };

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

const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("oldPassword is required"),
    body("newPassword").trim().notEmpty().withMessage("Password is required"),
  ];
};

const userRestForgottenPasswordValidator = () => {
  return [
    body("newPassword").trim().notEmpty().withMessage("Password is required"),
  ];
};

export {
  userRegistrationValidator,
  userLoginValidator,
  userForgottenPasswordValidator,
  userChangeCurrentPasswordValidator,
  userRestForgottenPasswordValidator,
};
