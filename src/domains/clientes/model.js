import { DataTypes } from "sequelize";
import sequelize from "#config/db.js";

const Cliente = sequelize.define("Cliente", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  documento: { type: DataTypes.STRING, unique: true },
  tipoDocumento: { type: DataTypes.STRING },
  direccion: { type: DataTypes.STRING },
});

export default Cliente;
