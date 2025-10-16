import * as service from "./service.js";

export const getClientes = async (req, res) => {
  try {
    const clientes = await service.listarClientes();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
};

export const postCliente = async (req, res) => {
  try {
    const nuevo = await service.crearCliente(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear cliente" });
  }
};
