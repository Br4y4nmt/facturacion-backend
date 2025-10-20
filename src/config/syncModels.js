import sequelize from "./db.js";
import "#domains/empresa/model.js";
import "#domains/rol/model.js";
import "#domains/usuarios/model.js";
import "#domains/clientes/model.js";
import "#domains/permiso/model.js";

export const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión con la base de datos establecida correctamente.");

    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas correctamente.");
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  }
};

if (process.argv[1].includes("syncModels.js")) {
  syncDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
