import { DataTypes } from "sequelize";
import sequelize from "#config/db.js";

const Permiso = sequelize.define("Permiso", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  descripcion: { type: DataTypes.STRING },
});

export default Permiso;
