import "#config/env.js";
import bcrypt from "bcryptjs";
import sequelize from "#config/db.js";
import Usuario from "#domains/usuarios/model.js";
import Rol from "#domains/rol/model.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");

    // Buscar el rol SuperAdmin
    const superRol = await Rol.findOne({ where: { nombre: "SuperAdmin" } });
    if (!superRol) throw new Error("No existe el rol 'SuperAdmin' en la base de datos");

    const passwordHash = await bcrypt.hash("123456", 10);

    const [usuario, creado] = await Usuario.findOrCreate({
      where: { email: "superadmin@bryan.com" },
      defaults: {
        nombre: "Super Admin",
        email: "superadmin@bryan.com",
        password: passwordHash,
        rolId: superRol.id,
      },
    });

    if (creado) {
      console.log("SuperAdmin creado con éxito");
    } else {
      console.log("El SuperAdmin ya existía");
    }

    console.log("Correo:", usuario.email);
    console.log("Contraseña: 123456");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al crear el SuperAdmin:", error.message);
    process.exit(1);
  }
})();
