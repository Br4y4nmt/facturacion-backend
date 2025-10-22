import express from "express";
import {
  login,
  refresh,
} from "./controller.js";

import { audit } from "#middlewares/audit.js";
import rateLimit from "express-rate-limit";
import { body } from "express-validator";

const router = express.Router();

// 🧱 Límite de intentos de login
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 10, // máximo 10 intentos por IP
  message: { error: "Demasiados intentos. Intenta más tarde." },
});

// 🧩 Validaciones
const validateLogin = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password").notEmpty().withMessage("Contraseña requerida"),
];


router.post("/login", loginLimiter, validateLogin, audit, login);
router.post("/refresh", refresh);


export default router;
