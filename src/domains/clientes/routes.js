import express from "express";
import { getClientes, postCliente } from "./controller.js";
import { authenticate } from "#middlewares/auth.js";
import { authorizeAdvanced } from "#middlewares/permissions.js";
import { validateCliente } from "#middlewares/validators.js";

const router = express.Router();

router.get("/", authenticate, authorizeAdvanced([1, 2, 3, 4], ["ver_cliente"]),getClientes);
router.post("/", authenticate, authorizeAdvanced([1, 2, 3], ["crear_cliente"]), validateCliente, postCliente);

export default router;
