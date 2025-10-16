import { DataTypes } from "sequelize";
import sequelize from "#config/db.js";

const Empresa = sequelize.define("Empresa", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ruc: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  razonSocial: { type: DataTypes.STRING, allowNull: false },
  nombreComercial: { type: DataTypes.STRING },
  direccion: { type: DataTypes.STRING },
  telefono: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  estado: { type: DataTypes.BOOLEAN, defaultValue: true },
});

export default Empresa;
