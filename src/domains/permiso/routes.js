import express from "express";
import { getPermisos, postPermiso, deletePermiso } from "./controller.js";
import { authenticate } from "#middlewares/auth.js";
import { authorizeAdvanced } from "#middlewares/permissions.js";

const router = express.Router();

// Solo SuperAdmin (rolId = 1) puede gestionar permisos
router.get("/", authenticate, authorizeAdvanced([1], ["ver_permisos"]), getPermisos);
router.post("/", authenticate, authorizeAdvanced([1], ["crear_permisos"]), postPermiso);
router.delete("/:id", authenticate, authorizeAdvanced([1], ["eliminar_permisos"]), deletePermiso);

export default router;
