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
  .route("/create/:projectId")
  .post(
    authCheck,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    upload.array("attachments", 3),
    createTask,
  );

router
  .route("/update/:taskId/:projectId")
  .patch(
    authCheck,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    upload.array("attachments", 3),
    updateTask,
  );

router
  .route("/:projectId/:taskId")
  .delete(
    authCheck,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    deleteTask,
  );

router
  .route("/:taskId/:projectId")
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
  .route("/:projectId")
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
  .put(authCheck, toggleSubTaskDoneStatus);

router
  .route("/subtask/:subTaskId")
  .delete(
    authCheck,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    deleteSubTask,
  );

export default router;
