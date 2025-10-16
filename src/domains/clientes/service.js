import * as repo from "./repository.js";

export const listarClientes = async () => await repo.findAll();
export const crearCliente = async (data) => await repo.create(data);
