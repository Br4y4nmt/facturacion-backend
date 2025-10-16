import { DataTypes } from "sequelize";
import sequelize from "#config/db.js";
import Empresa from "#domains/empresa/model.js";
import Rol from "#domains/rol/model.js";

const Usuario = sequelize.define("Usuario", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  activo: { type: DataTypes.BOOLEAN, defaultValue: true },
});

// Relaciones
Usuario.belongsTo(Empresa, { foreignKey: "empresaId" });
Usuario.belongsTo(Rol, { foreignKey: "rolId" });

export default Usuario;
