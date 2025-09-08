import { Router } from "express";
import { createTask } from "../controllers/task.controllers.js";
import {
  authCheck,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";

const router = Router();

router
  .route("/project/:projectId/create-task/:userId")
  .post(
    authCheck,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    upload.array("attachments", 3),
    createTask,
  );

export default router;
