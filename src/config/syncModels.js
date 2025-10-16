import sequelize from "./db.js";

// Importa todos tus modelos
import "#domains/empresa/model.js";
import "#domains/rol/model.js";
import "#domains/usuarios/model.js";
import "#domains/clientes/model.js";

// Aquí puedes importar otros modelos después (productos, comprobantes, etc.)

export const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión con la base de datos establecida correctamente.");

    // 🔥 Este comando crea las tablas si no existen
    await sequelize.sync({ alter: true }); 
    // 👉 cambia a { force: true } si quieres que se borren y vuelvan a crear (solo en desarrollo)

    console.log("✅ Tablas sincronizadas correctamente.");
  } catch (error) {
    console.error("❌ Error al sincronizar la base de datos:", error);
  }
};
