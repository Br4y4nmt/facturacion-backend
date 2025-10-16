import * as service from "./service.js";

export const registrar = async ({ nombre, email, password, empresaId, rolId }) => {
  if (!nombre || !email || !password)
    throw new Error("Nombre, email y contraseña son obligatorios");

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

  return { id: usuario.id, nombre: usuario.nombre, email: usuario.email };
};

export const postRegister = async (req, res) => {
  try {
    const result = await service.registrar(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const postRefresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await service.refresh(refreshToken);
    res.json(result);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};
