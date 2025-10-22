import * as service from "./service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await service.login({ email, password });
    res.status(200).json(result);
  } catch (e) {
    console.error("Error en login:", e.message);
    res.status(401).json({ error: e.message });
  }
};


export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await service.refresh(refreshToken);
    res.status(200).json(result);
  } catch (e) {
    console.error("Error en refresh:", e.message);
    res.status(401).json({ error: e.message });
  }
};
