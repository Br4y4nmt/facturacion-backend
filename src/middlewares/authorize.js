export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.rolId;

    if (!userRole) {
      return res.status(403).json({ error: "No se encontró el rol del usuario" });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: "No tienes permiso para acceder a esta ruta" });
    }

    next(); 
  };
};
