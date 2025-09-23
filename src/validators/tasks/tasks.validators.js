import { body, param } from "express-validator";
import { AvailableTaskStatuses } from "../../utils/constants.js";

const createTaskValidator = () => {
  return [
    param("projectId")
      .notEmpty()
      .withMessage("Project ID is required")
      .isMongoId()
      .withMessage("Invalid Project ID"),

    body("title").trim().notEmpty().withMessage("Title is required"),

    body("description").optional(),

    body("assignedTo")
      .notEmpty()
      .withMessage("Assigned to is required")
      .isMongoId()
      .withMessage("Invalid User ID"),

    body("status")
      .notEmpty()
      .withMessage("Status is required")
      .isIn(AvailableTaskStatuses)
      .withMessage("Invalid status"),
  ];
};

const updateTaskValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("Project ID is required")
      .isMongoId()
      .withMessage("Invalid Project ID"),

    param("taskId")
      .trim()
      .notEmpty()
      .withMessage("Task ID is required")
      .isMongoId()
      .withMessage("Invalid Task ID"),

    body("title").trim().notEmpty().withMessage("Title is required"),

    body("description").trim().optional(),

    body("assignedTo")
      .trim()
      .notEmpty()
      .withMessage("Assigned to is required")
      .isMongoId()
      .withMessage("Invalid User ID"),

    body("status")
      .trim()
      .notEmpty()
      .withMessage("Status is required")
      .isIn(AvailableTaskStatuses)
      .withMessage("Invalid status"),
  ];
};

const getAllTasksValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("Project ID is required")
      .isMongoId()
      .withMessage("Invalid Project ID"),
  ];
};

const getTaskByIdValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("Project ID is required")
      .isMongoId()
      .withMessage("Invalid Project ID"),

    param("taskId")
      .trim()
      .notEmpty()
      .withMessage("Task ID is required")
      .isMongoId()
      .withMessage("Invalid Task ID"),
  ];
};

const deleteTaskValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty()
      .withMessage("Project ID is required")
      .isMongoId()
      .withMessage("Invalid Project ID"),

    param("taskId")
      .trim()
      .notEmpty()
      .withMessage("Task ID is required")
      .isMongoId()
      .withMessage("Invalid Task ID"),
  ];
};

const createSubTaskValidator = () => {
  return [
    param("taskId")
      .trim()
      .notEmpty()
      .withMessage("Task ID is required")
      .isMongoId()
      .withMessage("Invalid Task ID"),

    body("title").trim().notEmpty().withMessage("Title is required"),
  ];
};

const toggleSubTaskDoneStatusValidator = () => {
  return [
    param("subTaskId")
      .trim()
      .notEmpty()
      .withMessage("Subtask ID is required")
      .isMongoId()
      .withMessage("Invalid Subtask ID"),
  ];
};

const deleteSubTaskValidator = () => {
  return [
    param("subTaskId")
      .trim()
      .notEmpty()
      .withMessage("Subtask ID is required")
      .isMongoId()
      .withMessage("Invalid Subtask ID"),
  ];
};

export {
  createTaskValidator,
  updateTaskValidator,
  getAllTasksValidator,
  getTaskByIdValidator,
  deleteTaskValidator,
  createSubTaskValidator,
  toggleSubTaskDoneStatusValidator,
  deleteSubTaskValidator,
};
