import * as repo from "./repository.js";


export const listarClientes = async ({ empresaId, query }) => {
  const { page = 1, limit = 10, search = "" } = query;
  const offset = (page - 1) * limit;
  return await repo.findAll({ empresaId, offset, limit, search });
};


export const crearCliente = async (data) => await repo.create(data);
