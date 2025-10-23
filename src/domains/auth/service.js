import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "#domains/usuarios/model.js";
import Rol from "#domains/rol/model.js";
import Permiso from "#domains/permiso/model.js";
import Empresa from "#domains/empresa/model.js";

/**
 * 🔐 Inicia sesión, valida credenciales y genera token JWT
 */
export const login = async ({ email, password }) => {
  // 1️⃣ Buscar usuario
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error("Usuario no encontrado");

  // 2️⃣ Verificar contraseña
  const esValido = await bcrypt.compare(password, usuario.password);
  if (!esValido) throw new Error("Credenciales inválidas");

  // 3️⃣ Obtener rol y permisos
  const rol = await Rol.findByPk(usuario.rolId, {
    include: [{ model: Permiso }],
  });
  if (!rol) throw new Error("Rol no encontrado");

  const permisos = rol.Permisos.map((p) => p.nombre);

  // 4️⃣ Obtener empresa (opcional)
  let empresa = null;
  if (usuario.empresaId) {
    const empresaData = await Empresa.findByPk(usuario.empresaId, {
      attributes: ["id", "razonSocial"],
    });
    empresa = empresaData ? empresaData.razonSocial : null;
  }

  // 5️⃣ Generar token JWT
  const payload = {
    id: usuario.id,
    email: usuario.email,
    rolId: usuario.rolId,
    empresaId: usuario.empresaId,
    rol: rol.nombre,
    permissions: permisos,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "8h",
  });

  // 6️⃣ Retornar datos seguros al frontend
  return {
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rolId: usuario.rolId,
      rol: rol.nombre,
      empresaId: usuario.empresaId,
      empresa,
      permisos,
    },
    token,
  };
};

/**
 * 🔁 (Opcional) Refrescar token JWT
 */
export const refresh = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
        rolId: decoded.rolId,
        empresaId: decoded.empresaId,
        rol: decoded.rol,
        permissions: decoded.permissions,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
    );

    return { token: newToken };
  } catch (error) {
    throw new Error("Refresh token inválido o expirado");
  }
};
