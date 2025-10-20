import * as service from "./service.js";

/**
 * POST /usuarios/register
 * Crea un nuevo usuario
 */
export const postRegister = async (req, res) => {
  try {
    const result = await service.registrar(req.body);
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
};

/**
 * POST /usuarios/login
 * Inicia sesión y devuelve un JWT con permisos
 */
export const postLogin = async (req, res) => {
  try {
    const result = await service.login(req.body);
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(401).json({ error: e.message });
  }
};

/**
 * POST /usuarios/refresh
 * Devuelve un nuevo accessToken a partir de un refreshToken válido
 */
export const postRefresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await service.refresh(refreshToken);
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(401).json({ error: e.message });
  }
};

/**
 * GET /usuarios
 * Lista los usuarios de la empresa actual
 */
export const getUsuarios = async (req, res) => {
  try {
    const empresaId = req.user.empresaId;
    const usuarios = await service.listarUsuarios(empresaId);
    res.json(usuarios);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};
