import { body, param } from "express-validator";
import { AvailableUserRoles } from "../../utils/constants.js";

const createProjectValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Project name is required")
      .isString()
      .withMessage("Project name must be a string")
      .isLength({ min: 3, max: 100 })
      .withMessage("Project name must be between 3 and 100 characters"),
    body("description")
      .optional()
      .trim()
      .isString()
      .withMessage("Project description must be a string")
      .isLength({ max: 500 })
      .withMessage("Project description must be less than 500 characters"),
  ];
};

const updateProjectValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("Project ID is required")
      .isMongoId()
      .withMessage("Invalid Project ID"),
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Project name is required")
      .isString()
      .withMessage("Project name must be a string")
      .isLength({ min: 3, max: 100 })
      .withMessage("Project name must be between 3 and 100 characters"),
    body("description")
      .trim()
      .optional()
      .isString()
      .withMessage("Project description must be a string")
      .isLength({ max: 500 })
      .withMessage("Project description must be less than 500 characters"),
  ];
};

const deleteProjectValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("Project ID is required")
      .isMongoId()
      .withMessage("Invalid Project ID"),
  ];
};

const addMemberToProjectValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("Project ID is required")
      .isMongoId()
      .withMessage("Invalid Project ID"),
    body("userId")
      .trim()
      .notEmpty()
      .withMessage("Member ID is required")
      .isMongoId()
      .withMessage("Invalid Member ID"),
    body("role")
      .trim()
      .notEmpty()
      .withMessage("Role is required")
      .isIn(AvailableUserRoles)
      .withMessage("Invalid role"),
  ];
};

const updateMemberRoleValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("Project ID is required")
      .isMongoId()
      .withMessage("Invalid Project ID"),
    param("userId")
      .trim()
      .notEmpty()
      .withMessage("Member ID is required")
      .isMongoId()
      .withMessage("Invalid Member ID"),
    body("role")
      .trim()
      .notEmpty()
      .withMessage("Role is required")
      .isIn(AvailableUserRoles)
      .withMessage("Invalid role"),
  ];
};

const getProjectByIdValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("Project ID is required")
      .isMongoId()
      .withMessage("Invalid Project ID"),
  ];
};

export {
  addMemberToProjectValidator,
  createProjectValidator,
  deleteProjectValidator,
  updateMemberRoleValidator,
  updateProjectValidator,
  getProjectByIdValidator,
};
