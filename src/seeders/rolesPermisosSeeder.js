import "#config/env.js";
import sequelize from "#config/db.js";
import Rol from "#domains/rol/model.js";
import Permiso from "#domains/permiso/model.js";

const asignarPermisos = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida con MySQL");

    // Obtener todos los permisos
    const permisos = await Permiso.findAll();

    // Roles por ID
    const roles = {
      SuperAdmin: 1,
      AdminEmpresa: 2,
      Vendedor: 3,
      Cajero: 4,
    };

    // SuperAdmin: todos los permisos
    const superAdmin = await Rol.findByPk(roles.SuperAdmin);
    await superAdmin.setPermisos(permisos);

    // AdminEmpresa: permisos seleccionados
    const admin = await Rol.findByPk(roles.AdminEmpresa);
    await admin.setPermisos(
      permisos.filter((p) =>
        [
          "ver_cliente",
          "crear_cliente",
          "editar_cliente",
          "ver_empresa",
          "editar_empresa",
          "ver_usuario",
          "crear_usuario",
        ].includes(p.nombre)
      )
    );

    // Vendedor: permisos básicos
    const vendedor = await Rol.findByPk(roles.Vendedor);
    await vendedor.setPermisos(
      permisos.filter((p) =>
        ["ver_cliente", "crear_cliente"].includes(p.nombre)
      )
    );

    // Cajero: solo ver clientes
    const cajero = await Rol.findByPk(roles.Cajero);
    await cajero.setPermisos(
      permisos.filter((p) => ["ver_cliente"].includes(p.nombre))
    );

    console.log("Permisos asociados correctamente a los roles");
    process.exit(0);
  } catch (error) {
    console.error("Error al asignar permisos:", error);
    process.exit(1);
  }
};

asignarPermisos();
