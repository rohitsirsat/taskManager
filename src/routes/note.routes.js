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
    validateProjectPermission(AvailableUserRoles),
    getAllNotesValidator(),
    validate,
    getNotes,
  )
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createNoteValidator(),
    validate,
    createNote,
  );

router
  .route("/:projectId/n/:noteId")
  .get(
    validateProjectPermission(AvailableUserRoles),
    getNoteByIdValidator(),
    validate,
    getNoteById,
  )
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    updateNoteValidator(),
    validate,
    updateNote,
  )
  .delete(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    deleteNoteByIdValidator(),
    validate,
    deleteNote,
  );

export default router;
