import * as repo from "./repository.js";

export const listarPermisos = async () => await repo.findAll();
export const crearPermiso = async (data) => await repo.create(data);
export const eliminarPermiso = async (id) => await repo.remove(id);
