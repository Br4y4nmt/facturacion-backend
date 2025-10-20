import { body, validationResult } from "express-validator";

export const validateCliente = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),
  body("documento")
    .notEmpty()
    .withMessage("El documento es obligatorio")
    .isLength({ min: 8 })
    .withMessage("Documento inválido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];


export const validateUsuario = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("email").isEmail().withMessage("Email inválido"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("rolId").notEmpty().withMessage("El rol es obligatorio"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];

export const validateEmpresa = [
  body("ruc")
    .notEmpty()
    .withMessage("El RUC es obligatorio")
    .isLength({ min: 8, max: 20 })
    .withMessage("El RUC debe tener entre 8 y 20 caracteres"),
  body("razonSocial")
    .notEmpty()
    .withMessage("La Razón Social es obligatoria")
    .isLength({ min: 3 })
    .withMessage("La Razón Social debe tener al menos 3 caracteres"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];