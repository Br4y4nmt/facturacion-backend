import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "#domains/usuarios/model.js";
import Rol from "#domains/rol/model.js";
import Permiso from "#domains/permiso/model.js";
import Empresa from "#domains/empresa/model.js";

export const login = async ({ email, password }) => {
  const usuario = await Usuario.findOne({
    where: { email },
    include: [
      { model: Rol, include: [Permiso] },
      { model: Empresa, attributes: ["id", "razonSocial"] },
    ],
  });

  if (!usuario) throw new Error("Usuario no encontrado");

  const esValido = await bcrypt.compare(password, usuario.password);
  if (!esValido) throw new Error("Credenciales inválidas");

  const permisos = usuario.Rol.Permisos.map((p) => p.nombre);

  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rolId: usuario.rolId,
      empresaId: usuario.empresaId,
      rol: usuario.Rol.nombre,
      permissions: permisos,
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rolId: usuario.rolId,
      rol: usuario.Rol.nombre,
      empresaId: usuario.empresaId,
      empresa: usuario.Empresa ? usuario.Empresa.razonSocial : null,
      permisos,
    },
    token,
  };
};
