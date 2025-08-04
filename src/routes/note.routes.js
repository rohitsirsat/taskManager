import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/note.controllers.js";
import { validateProjectPermission } from "../middlewares/auth.middleware.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";

const router = Router();

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRoles), getNotes)
  .post(validateProjectPermission([UserRolesEnum.ADMIN]), createNote);

router
  .route("/:projectId/n/:noteId")
  .get(validateProjectPermission(AvailableUserRoles), getNoteById)
  .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateNote)
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteNote);

export default router;
