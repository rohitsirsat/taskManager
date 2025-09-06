import { body, param } from "express-validator";
import { AvailableUserRoles } from "../../utils/constants.js";

const createNoteValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("role").isIn(AvailableUserRoles).withMessage("Invalid user role"),
  ];
};

const updateNoteValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("role").isIn(AvailableUserRoles).withMessage("Invalid user role"),
  ];
};

const getAllNotesValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("Project ID is required")
      .isMongoId()
      .withMessage("Invalid project ID"),
  ];
};

const getNoteByIdValidator = () => {
  return [
    param("noteId")
      .trim()
      .notEmpty()
      .withMessage("Note ID is required")
      .isMongoId()
      .withMessage("Invalid note ID"),
  ];
};

const deleteNoteByIdValidator = () => {
  return [
    param("noteId")
      .trim()
      .notEmpty()
      .withMessage("Note ID is required")
      .isMongoId()
      .withMessage("Invalid note ID"),
  ];
};

export {
  createNoteValidator,
  updateNoteValidator,
  getAllNotesValidator,
  getNoteByIdValidator,
  deleteNoteByIdValidator,
};
