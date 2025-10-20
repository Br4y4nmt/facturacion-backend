export const authorizeAdvanced = (allowedRoles = [], allowedActions = []) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user)
      return res.status(401).json({ error: "Usuario no autenticado" });

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.rolId)) {
      return res.status(403).json({ error: "Rol no autorizado" });
    }

    if (allowedActions.length > 0) {
      const userPermissions = user.permissions || [];
      const hasPermission = allowedActions.every((p) =>
        userPermissions.includes(p)
      );
      if (!hasPermission) {
        return res.status(403).json({ error: "Permisos insuficientes" });
      }
    }

    next();
  };
};
