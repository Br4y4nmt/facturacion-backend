export const authorizeRoles = (...allowed) => {
  return (req, res, next) => {
    if (!req.user?.rolId) return res.status(403).json({ error: "Sin rol" });

    if (!allowed.includes(req.user.rolId)) {
      return res.status(403).json({ error: "No autorizado" });
    }
    next();
  };
};
