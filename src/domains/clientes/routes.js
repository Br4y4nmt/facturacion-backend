import express from "express";
import { getClientes, postCliente } from "./controller.js";

const router = express.Router();

router.get("/", getClientes);
router.post("/", postCliente);

export default router;
