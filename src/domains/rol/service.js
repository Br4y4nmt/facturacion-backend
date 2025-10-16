import * as repo from "./repository.js";

export const listarRoles = () => repo.findAll();
export const obtenerRol = (id) => repo.findById(id);
export const crearRol = async (data) => {
  if (!data.nombre) throw new Error("El nombre del rol es obligatorio");
  return await repo.create(data);
};
export const actualizarRol = (id, data) => repo.update(id, data);
export const eliminarRol = (id) => repo.remove(id);
