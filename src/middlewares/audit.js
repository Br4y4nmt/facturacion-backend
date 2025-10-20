export const audit = (req, res, next) => {
  const user = req.user;
  const userEmail = user?.email || "Anónimo";
  console.log(
    `[AUDIT] ${userEmail} → ${req.method} ${req.originalUrl} [${new Date().toISOString()}]`
  );
  next();
};
