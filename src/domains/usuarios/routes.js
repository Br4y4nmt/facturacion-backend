import express from "express";
import {
  postRegister,
  postLogin,
  postRefresh,
  getUsuarios,
} from "./controller.js";

import { authenticate } from "#middlewares/auth.js";
import { authorizeAdvanced } from "#middlewares/permissions.js";
import { validateUsuario } from "#middlewares/validators.js";
import { audit } from "#middlewares/audit.js";

const router = express.Router();

// Registrar nuevo usuario
router.post(
  "/register",
  authenticate,
  authorizeAdvanced([1, 2], ["crear_usuario"]),
  validateUsuario,
  audit,
  postRegister
);

// Login (público)
router.post("/login", postLogin);

// Refresh token
router.post("/refresh", postRefresh);

// Listar usuarios (solo AdminEmpresa o SuperAdmin)
router.get(
  "/",
  authenticate,
  authorizeAdvanced([1, 2], ["ver_usuario"]),
  audit,
  getUsuarios
);

export default router;
