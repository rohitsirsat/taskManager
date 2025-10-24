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
import {
  addMemberToProjectValidator,
  createProjectValidator,
  deleteProjectValidator,
  updateMemberRoleValidator,
  updateProjectValidator,
  getProjectByIdValidator,
} from "../validators/projects/projects.validators.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

router.route("/").get(authCheck, getAllProjects);

router
  .route("/create-project")
  .post(authCheck, createProjectValidator(), validate, createProject);

router
  .route("/:projectId")
  .get(
    authCheck,
    validateProjectPermission(AvailableUserRoles),
    getProjectByIdValidator(),
    validate,
    getProjectById,
  )
  .put(
    authCheck,
    validateProjectPermission([UserRolesEnum.ADMIN]),
    updateProjectValidator(),
    validate,
    updateProject,
  )
  .delete(
    authCheck,
    validateProjectPermission([UserRolesEnum.ADMIN]),
    deleteProjectValidator(),
    validate,
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
    addMemberToProjectValidator(),
    validate,
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
    updateMemberRoleValidator(),
    validate,
    updateMemberRole,
  );

export default router;
