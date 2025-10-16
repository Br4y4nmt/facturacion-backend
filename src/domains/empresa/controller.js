import * as service from "./service.js";

export const getEmpresas = async (req, res) => {
  try {
    const empresas = await service.listarEmpresas();
    res.json(empresas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getEmpresa = async (req, res) => {
  try {
    const empresa = await service.obtenerEmpresa(req.params.id);
    if (!empresa) return res.status(404).json({ error: "No encontrada" });
    res.json(empresa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const postEmpresa = async (req, res) => {
  try {
    const nueva = await service.crearEmpresa(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const putEmpresa = async (req, res) => {
  try {
    const actualizada = await service.actualizarEmpresa(req.params.id, req.body);
    res.json(actualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteEmpresa = async (req, res) => {
  try {
    const resultado = await service.eliminarEmpresa(req.params.id);
    res.json(resultado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
