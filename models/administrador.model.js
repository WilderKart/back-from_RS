// models/administrador.model.js
module.exports = (sequelize, DataTypes) => {
  const Administrador = sequelize.define("Administrador", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    usuario: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    contrasena: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: "administradores",
    timestamps: false
  });

  return Administrador;
};
