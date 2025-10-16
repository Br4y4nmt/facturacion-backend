import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as repo from "./repository.js";

const signAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "8h" });

const signRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" });




// REGISTRO
export const registrar = async ({ nombre, email, password, empresaId, rolId }) => {
  if (!nombre || !email || !password) throw new Error("Nombre, email y contraseña son obligatorios");

  const existente = await repo.findByEmail(email);
  if (existente) throw new Error("El correo ya está registrado");

  const hash = await bcrypt.hash(password, 10);

  const usuario = await repo.create({
    nombre,
    email,
    password: hash,
    empresaId,
    rolId,
  });

  return { id: usuario.id, nombre: usuario.nombre, email: usuario.email, empresaId, rolId };
};



// LOGIN
export const login = async ({ email, password }) => {
  const usuario = await repo.findByEmail(email);
  if (!usuario) throw new Error("Usuario no encontrado");

  const ok = await bcrypt.compare(password, usuario.password);
  if (!ok) throw new Error("Credenciales inválidas");

  const payload = {
    id: usuario.id,
    email: usuario.email,
    rolId: usuario.rolId,
    empresaId: usuario.empresaId,
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload); 

  return {
    accessToken,
    refreshToken, 
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rolId: usuario.rolId,
      empresaId: usuario.empresaId,
    },
  };
};



// REFRESH (opcional)
export const refresh = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = signAccessToken({
      id: decoded.id,
      email: decoded.email,
      rolId: decoded.rolId,
      empresaId: decoded.empresaId,
    });
    return { accessToken };
  } catch {
    throw new Error("Refresh token inválido o expirado");
  }
};
