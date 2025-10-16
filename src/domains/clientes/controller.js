import * as service from "./service.js";


export const getClientes = async (req, res) => {
  try {
    const empresaId = req.user.empresaId;
    const clientes = await service.listarClientes({ empresaId, query: req.query });

    res.json(clientes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al obtener clientes" });
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
