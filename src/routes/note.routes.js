import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/note.controllers.js";
import {
  authCheck,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import {
  createNoteValidator,
  updateNoteValidator,
  getAllNotesValidator,
  getNoteByIdValidator,
  deleteNoteByIdValidator,
} from "../validators/notes/note.validators.js";

import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

router
  .route("/:projectId")
  .get(
    authCheck,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
      UserRolesEnum.MEMBER,
    ]),
    getNotes,
  )
  .post(
    authCheck,
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    validate,
    createNote,
  );

router
  .route("/:projectId/n/:noteId")
  .get(authCheck, validateProjectPermission(AvailableUserRoles), getNoteById)
  .patch(
    authCheck,
    validateProjectPermission([UserRolesEnum.ADMIN]),
    updateNote,
  )
  .delete(
    authCheck,
    validateProjectPermission([UserRolesEnum.ADMIN]),
    deleteNote,
  );

export default router;
