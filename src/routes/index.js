import express from "express";
import clientesRouter from "#domains/clientes/routes.js";
import empresaRouter from "#domains/empresa/routes.js";
import rolRouter from "#domains/rol/routes.js";
import usuariosRouter from "#domains/usuarios/routes.js";
import { authenticate } from "#middlewares/auth.js";
import { authorizeRoles } from "#middlewares/authorize.js";

const router = express.Router();

// 🔓 rutas públicas
router.use("/usuarios", usuariosRouter); 

// 🔐 rutas protegidas por token y roles
router.use("/clientes", authenticate, authorizeRoles(1, 2, 3, 4), clientesRouter);
router.use("/empresas", authenticate, authorizeRoles(1, 2), empresaRouter);
router.use("/roles", authenticate, authorizeRoles(1), rolRouter);

export default router;
