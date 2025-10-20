import express from "express";
import {
  getEmpresas,
  getEmpresa,
  postEmpresa,
  putEmpresa,
  deleteEmpresa,
} from "./controller.js";

import { authenticate } from "#middlewares/auth.js";
import { authorizeAdvanced } from "#middlewares/permissions.js";
import { audit } from "#middlewares/audit.js";
import { validateEmpresa } from "#middlewares/validators.js";

const router = express.Router();

router.get("/", authenticate, authorizeAdvanced([1], ["ver_empresa"]), getEmpresas);
router.get("/:id", authenticate, authorizeAdvanced([1, 2], ["ver_empresa"]), getEmpresa);
router.post(
  "/",
  authenticate,
  authorizeAdvanced([1], ["crear_empresa"]),
  validateEmpresa, 
  audit,
  postEmpresa
);
router.put(
  "/:id",
  authenticate,
  authorizeAdvanced([1, 2], ["editar_empresa"]),
  validateEmpresa, 
  putEmpresa
);
router.delete(
  "/:id",
  authenticate,
  authorizeAdvanced([1], ["eliminar_empresa"]),
  audit,
  deleteEmpresa
);

export default router;
