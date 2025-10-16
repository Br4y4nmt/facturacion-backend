import Empresa from "./model.js";

export const findAll = () => Empresa.findAll({ order: [["id", "ASC"]] });
export const findById = (id) => Empresa.findByPk(id);
export const create = (data) => Empresa.create(data);
export const update = async (id, data) => {
  const empresa = await Empresa.findByPk(id);
  if (!empresa) throw new Error("Empresa no encontrada");
  return await empresa.update(data);
};
export const remove = async (id) => {
  const empresa = await Empresa.findByPk(id);
  if (!empresa) throw new Error("Empresa no encontrada");
  await empresa.destroy();
  return { message: "Empresa eliminada" };
};
