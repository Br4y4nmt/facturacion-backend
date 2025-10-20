import "#config/env.js";
import sequelize from "#config/db.js";
import Permiso from "#domains/permiso/model.js";

const permisosBase = [
  // 🧾 CLIENTES
  { nombre: "ver_cliente", descripcion: "Puede listar los clientes" },
  { nombre: "crear_cliente", descripcion: "Puede crear nuevos clientes" },
  { nombre: "editar_cliente", descripcion: "Puede editar clientes existentes" },
  { nombre: "eliminar_cliente", descripcion: "Puede eliminar clientes" },

  // 🏢 EMPRESAS
  { nombre: "ver_empresa", descripcion: "Puede ver la lista y detalles de empresas" },
  { nombre: "crear_empresa", descripcion: "Puede registrar nuevas empresas" },
  { nombre: "editar_empresa", descripcion: "Puede actualizar datos de las empresas" },
  { nombre: "eliminar_empresa", descripcion: "Puede eliminar empresas" },

  // 👤 USUARIOS
  { nombre: "ver_usuario", descripcion: "Puede ver usuarios de su empresa" },
  { nombre: "crear_usuario", descripcion: "Puede crear nuevos usuarios" },
  { nombre: "editar_usuario", descripcion: "Puede modificar datos de usuarios" },
  { nombre: "eliminar_usuario", descripcion: "Puede eliminar usuarios" },

  // 💰 FINANZAS
  { nombre: "ver_finanza", descripcion: "Puede ver reportes financieros" },
  { nombre: "crear_finanza", descripcion: "Puede registrar movimientos financieros" },
  { nombre: "editar_finanza", descripcion: "Puede modificar movimientos financieros" },
  { nombre: "eliminar_finanza", descripcion: "Puede eliminar movimientos financieros" },

  // 📊 REPORTES
  { nombre: "ver_reporte", descripcion: "Puede ver y generar reportes del sistema" },
];

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");

    for (const permiso of permisosBase) {
      const [perm, created] = await Permiso.findOrCreate({
        where: { nombre: permiso.nombre },
        defaults: permiso,
      });
      if (created) {
        console.log(`🆕 Insertado: ${permiso.nombre}`);
      } else {
        console.log(`↩️ Ya existía: ${permiso.nombre}`);
      }
    }

    console.log("Todos los permisos se insertaron correctamente");
    process.exit(0);
  } catch (error) {
    console.error("Error al insertar permisos:", error);
    process.exit(1);
  }
})();
