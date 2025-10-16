import Rol from "./model.js";

export const findAll = () => Rol.findAll({ order: [["id", "ASC"]] });
export const findById = (id) => Rol.findByPk(id);
export const create = (data) => Rol.create(data);
export const update = async (id, data) => {
  const rol = await Rol.findByPk(id);
  if (!rol) throw new Error("Rol no encontrado");
  return await rol.update(data);
};
export const remove = async (id) => {
  const rol = await Rol.findByPk(id);
  if (!rol) throw new Error("Rol no encontrado");
  await rol.destroy();
  return { message: "Rol eliminado" };
};
