import jwt from "jsonwebtoken";

/**
 * Middleware de autenticación usando cookies httpOnly
 */
export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ error: "Falta token de autenticación" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Guarda el usuario decodificado en la request (útil para las rutas)
    req.user = decoded;

    next();
  } catch (err) {
    console.error("❌ Error de autenticación:", err.message);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};
