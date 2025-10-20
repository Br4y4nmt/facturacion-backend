import * as service from "./service.js";

export const getPermisos = async (req, res) => {
  try {
    const permisos = await service.listarPermisos();
    res.json(permisos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener permisos" });
  }
};

export const postPermiso = async (req, res) => {
  try {
    const nuevo = await service.crearPermiso(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear permiso" });
  }
};

export const deletePermiso = async (req, res) => {
  try {
    await service.eliminarPermiso(req.params.id);
    res.json({ mensaje: "Permiso eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar permiso" });
  }
};
