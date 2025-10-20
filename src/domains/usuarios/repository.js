import Usuario from "./model.js";

export const findByEmail = async (email) => {
  return await Usuario.findOne({ where: { email } });
};

export const create = async (data) => {
  return await Usuario.create(data);
};

export const findAll = async (empresaId) => {
  return await Usuario.findAll({ where: { empresaId } });
};
