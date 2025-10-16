import express from "express";
import { postRegister, postRefresh } from "./controller.js";

const router = express.Router();

router.post("/register", postRegister);
router.post("/refresh", postRefresh); 

export default router;
