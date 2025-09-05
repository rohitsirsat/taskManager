import { Router } from "express";
import {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getAllProjects,
  updateMemberRole,
  updateProject,
} from "../controllers/project.controllers.js";

import { validateProjectPermission } from "../middlewares/auth.middleware.js";
import { authCheck } from "../middlewares/auth.middleware.js";

import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";

const router = Router();

router.route("/").get(authCheck, getAllProjects).post(authCheck, createProject);

router
  .route("/:projectId")
  .get(authCheck, validateProjectPermission(AvailableUserRoles), getProjectById)
  .put(
    authCheck,
    validateProjectPermission([UserRolesEnum.ADMIN]),
    updateProject,
  )
  .delete(
    authCheck,
    validateProjectPermission([UserRolesEnum.ADMIN]),
    deleteProject,
  );

router
  .route("/:projectId/members")
  .get(
    authCheck,
    validateProjectPermission(AvailableUserRoles),
    getProjectMembers,
  )
  .post(
    authCheck,
    validateProjectPermission([UserRolesEnum.ADMIN]),
    addMemberToProject,
  );

router
  .route("/:projectId/members/:userId")
  .delete(
    authCheck,
    validateProjectPermission([UserRolesEnum.ADMIN]),
    deleteMember,
  )
  .put(
    authCheck,
    validateProjectPermission([UserRolesEnum.ADMIN]),
    updateMemberRole,
  );

export default router;
