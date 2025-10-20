import { DataTypes } from "sequelize";
import sequelize from "#config/db.js";
import Permiso from "#domains/permiso/model.js";

const Rol = sequelize.define("Rol", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING },
  activo: { type: DataTypes.BOOLEAN, defaultValue: true },
});

Rol.belongsToMany(Permiso, { through: "roles_permisos", foreignKey: "rolId" });
Permiso.belongsToMany(Rol, { through: "roles_permisos", foreignKey: "permisoId" });

export default Rol;
