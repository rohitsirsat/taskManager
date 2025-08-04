import { body } from "express-validator";
import { AvailableUserRoles } from "../../utils/constants.js";

export const createNoteValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("role").isIn(AvailableUserRoles).withMessage("Invalid user role"),
  ];
};

export const updateNoteValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("role").isIn(AvailableUserRoles).withMessage("Invalid user role"),
  ];
};
