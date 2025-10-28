import "#config/env.js";
import bcrypt from "bcryptjs";
import sequelize from "#config/db.js";
import Usuario from "#domains/usuarios/model.js";
import Rol from "#domains/rol/model.js";
import Empresa from "#domains/empresa/model.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos");

    // Buscar el rol AdminEmpresa
    const adminRol = await Rol.findOne({ where: { nombre: "AdminEmpresa" } });
    if (!adminRol) throw new Error("No existe el rol 'AdminEmpresa' en la base de datos");

    // Crear o buscar empresa
    const [empresa, empresaCreada] = await Empresa.findOrCreate({
      where: { ruc: "20123456789" },
      defaults: {
        razonSocial: "Tech Solutions SAC",
        nombreComercial: "TechSol",
        direccion: "Av. Los Ingenieros 456, Lima",
        telefono: "987654321",
        email: "contacto@techsol.com",
        estado: true,
      },
    });

    if (empresaCreada) {
      console.log("🏢 Empresa creada con éxito:", empresa.razonSocial);
    } else {
      console.log("🏢 La empresa ya existía:", empresa.razonSocial);
    }

    // Encriptar contraseña
    const passwordHash = await bcrypt.hash("123456", 10);

    // Crear o buscar usuario adminempresa
    const [usuario, creado] = await Usuario.findOrCreate({
      where: { email: "adminempresa@techsol.com" },
      defaults: {
        nombre: "Administrador Empresa",
        email: "adminempresa@techsol.com",
        password: passwordHash,
        empresaId: empresa.id,
        rolId: adminRol.id,
      },
    });

    if (creado) {
      console.log("👤 Usuario AdminEmpresa creado con éxito");
    } else {
      console.log("👤 El usuario AdminEmpresa ya existía");
    }

    console.log("📧 Correo:", usuario.email);
    console.log("🔑 Contraseña: 123456");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error al crear el AdminEmpresa:", error.message);
    process.exit(1);
  }
})();
