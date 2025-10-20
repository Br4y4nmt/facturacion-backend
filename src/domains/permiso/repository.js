import Permiso from "./model.js";

export const findAll = () => Permiso.findAll();
export const create = (data) => Permiso.create(data);
export const findById = (id) => Permiso.findByPk(id);
export const remove = (id) => Permiso.destroy({ where: { id } });
