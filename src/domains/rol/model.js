import { DataTypes } from "sequelize";
import sequelize from "#config/db.js";

const Rol = sequelize.define("Rol", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, unique: true, allowNull: false },
  descripcion: { type: DataTypes.STRING },
  activo: { type: DataTypes.BOOLEAN, defaultValue: true },
});

export default Rol;
