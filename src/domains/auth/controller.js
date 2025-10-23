import * as service from "./service.js";

/**
 * 🔐 Iniciar sesión
 * - Verifica credenciales
 * - Genera token JWT
 * - Guarda cookie segura httpOnly
 */
export const login = async (req, res) => {
  try {
    console.log("📦 BODY:", req.body);

    const { usuario, token } = await service.login(req.body);

    // 🧁 Guardar token en cookie httpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 🔒 true en producción
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 1000 * 60 * 60 * 8, // 8 horas
    });

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      usuario,
    });
  } catch (error) {
    console.error("❌ Error en login:", error.message);
    res.status(401).json({ error: error.message });
  }
};

/**
 * 🚪 Cerrar sesión
 * - Limpia la cookie httpOnly
 */
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("❌ Error en logout:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * 🔎 Verificar sesión activa
 * - Requiere middleware `authenticate`
 * - Devuelve el usuario decodificado
 */
export const checkSession = (req, res) => {
  try {
    res.status(200).json({ usuario: req.user });
  } catch (error) {
    console.error("❌ Error en checkSession:", error.message);
    res.status(500).json({ error: "Error interno al verificar sesión" });
  }
};

/**
 * 🔁 Renovar token (opcional)
 */
export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await service.refresh(refreshToken);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error en refresh:", error.message);
    res.status(401).json({ error: error.message });
  }
};
