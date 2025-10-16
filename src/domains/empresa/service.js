import * as repo from "./repository.js";

export const listarEmpresas = () => repo.findAll();
export const obtenerEmpresa = (id) => repo.findById(id);
export const crearEmpresa = async (data) => {
  if (!data.ruc || !data.razonSocial)
    throw new Error("RUC y Razón Social son obligatorios");
  return await repo.create(data);
};
export const actualizarEmpresa = (id, data) => repo.update(id, data);
export const eliminarEmpresa = (id) => repo.remove(id);
