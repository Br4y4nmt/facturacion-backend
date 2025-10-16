import express from "express";
const router = express.Router();
import clientesRoutes from "#domains/clientes/routes.js";

// Usa las rutas bajo un prefijo
router.use("/clientes", clientesRoutes);

export default router;
