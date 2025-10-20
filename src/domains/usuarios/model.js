import { DataTypes } from "sequelize";
import sequelize from "#config/db.js";
import Rol from "#domains/rol/model.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    empresaId: { type: DataTypes.INTEGER },
    rolId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  }
);

Usuario.belongsTo(Rol, { foreignKey: "rolId" });

export default Usuario;
