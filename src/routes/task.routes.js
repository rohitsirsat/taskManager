import { Router } from "express";
import {
  createSubTask,
  createTask,
  deleteSubTask,
  deleteTask,
  getTaskById,
  getAllTasks,
  updateTask,
  toggleSubTaskDoneStatus,
} from "../controllers/task.controllers.js";
import {
  authCheck,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";
import {
  createSubTaskValidator,
  createTaskValidator,
  deleteSubTaskValidator,
  deleteTaskValidator,
  getAllTasksValidator,
  getTaskByIdValidator,
  toggleSubTaskDoneStatusValidator,
  updateTaskValidator,
} from "../validators/tasks/tasks.validators.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

router
  .route("/:projectId/create-task")
  .post(
    authCheck,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    createTaskValidator(),
    validate,
    upload.array("attachments", 3),
    createTask,
  );

router
  .route("/:projectId/update-task/:taskId")
  .put(
    authCheck,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    updateTaskValidator(),
    validate,
    upload.array("attachments", 3),
    updateTask,
  );

router
  .route("/:projectId/delete-task/:taskId")
  .delete(
    authCheck,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    deleteTaskValidator(),
    validate,
    deleteTask,
  );

router
  .route("/:projectId/task/:taskId")
  .get(
    authCheck,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
      UserRolesEnum.MEMBER,
    ]),
    getTaskByIdValidator(),
    validate,
    getTaskById,
  );

router
  .route("/:projectId/tasks")
  .get(
    authCheck,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
      UserRolesEnum.MEMBER,
    ]),
    getAllTasksValidator(),
    validate,
    getAllTasks,
  );

router
  .route("/:taskId/create-subtask")
  .post(authCheck, createSubTaskValidator(), validate, createSubTask);

router
  .route("/subtask/:subTaskId/toggle-status")
  .put(
    authCheck,
    toggleSubTaskDoneStatusValidator(),
    validate,
    toggleSubTaskDoneStatus,
  );

router
  .route("/subtask/:subTaskId")
  .delete(authCheck, deleteSubTaskValidator(), validate, deleteSubTask);

export default router;
