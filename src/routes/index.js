import express from "express";
import clientesRouter from "#domains/clientes/routes.js";
import empresaRouter from "#domains/empresa/routes.js";
import rolRouter from "#domains/rol/routes.js";
import usuariosRouter from "#domains/usuarios/routes.js";
import authRouter from "#domains/auth/routes.js";
import { authenticate } from "#middlewares/auth.js";
import { authorizeRoles } from "#middlewares/authorize.js";

const router = express.Router();
/* Rutas públicas */
router.use("/auth", authRouter);

/* 🔐 Rutas protegidas con token y roles */
router.use("/usuarios", authenticate, authorizeRoles(1, 2), usuariosRouter);
router.use("/clientes", authenticate, authorizeRoles(1, 2, 3, 4), clientesRouter);
router.use("/empresas", authenticate, authorizeRoles(1, 2), empresaRouter);
router.use("/roles", authenticate, authorizeRoles(1), rolRouter);

export default router;
