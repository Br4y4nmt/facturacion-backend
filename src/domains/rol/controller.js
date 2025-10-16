import * as service from "./service.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await service.listarRoles();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRol = async (req, res) => {
  try {
    const rol = await service.obtenerRol(req.params.id);
    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });
    res.json(rol);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const postRol = async (req, res) => {
  try {
    const nuevo = await service.crearRol(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const putRol = async (req, res) => {
  try {
    const actualizado = await service.actualizarRol(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRol = async (req, res) => {
  try {
    const eliminado = await service.eliminarRol(req.params.id);
    res.json(eliminado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
