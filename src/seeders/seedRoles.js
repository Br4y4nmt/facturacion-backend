import "#config/env.js";
import sequelize from "#config/db.js";
import Rol from "#domains/rol/model.js";

const rolesBase = [
  {
    nombre: "SuperAdmin",
    descripcion: "Control total del sistema y configuración global",
    activo: true,
  },
  {
    nombre: "AdminEmpresa",
    descripcion:
      "Administrador de una empresa: controla usuarios, facturación y configuración propia",
    activo: true,
  },
  {
    nombre: "Vendedor",
    descripcion: "Emite comprobantes, cotizaciones y gestiona clientes",
    activo: true,
  },
  {
    nombre: "Cajero",
    descripcion: "Opera el punto de venta (POS) y registra ventas del día",
    activo: true,
  },
  {
    nombre: "Inventario",
    descripcion: "Gestiona productos, stock y movimientos de almacén",
    activo: true,
  },
  {
    nombre: "Contador",
    descripcion: "Accede a reportes contables, libros y finanzas",
    activo: true,
  },
  {
    nombre: "Soporte",
    descripcion: "Solo lectura para revisión, auditorías o soporte técnico",
    activo: true,
  },
];

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");

    for (const rol of rolesBase) {
      const [nuevoRol, creado] = await Rol.findOrCreate({
        where: { nombre: rol.nombre },
        defaults: rol,
      });
      if (creado) {
        console.log(`Rol insertado: ${rol.nombre}`);
      } else {
        console.log(`Rol ya existía: ${rol.nombre}`);
      }
    }

    console.log("Roles insertados correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al insertar roles:", error);
    process.exit(1);
  }
})();
