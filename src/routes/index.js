import express from "express";
import clientesRouter from "#domains/clientes/routes.js";
import empresaRouter from "#domains/empresa/routes.js";
import rolRouter from "#domains/rol/routes.js";
import usuariosRouter from "#domains/usuarios/routes.js";
import { authenticate } from "#middlewares/auth.js";

const router = express.Router();

router.use("/clientes", authenticate, clientesRouter);
router.use("/empresas", authenticate, empresaRouter);
router.use("/roles", authenticate, rolRouter);
router.use("/usuarios", authenticate, usuariosRouter);


export default router;
