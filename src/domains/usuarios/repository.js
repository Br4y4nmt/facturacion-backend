import Usuario from "./model.js";
import Empresa from "#domains/empresa/model.js";
import Rol from "#domains/rol/model.js";

export const findByEmail = (email) => Usuario.findOne({ where: { email } });

export const create = (data) => Usuario.create(data);

export const findById = (id) =>
  Usuario.findByPk(id, {
    include: [
      { model: Empresa, attributes: ["id", "razonSocial"] },
      { model: Rol, attributes: ["id", "nombre"] },
    ],
  });
