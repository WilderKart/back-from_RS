module.exports = (sequelize, DataTypes) => {
  // Definición del modelo Compania
  const Compania = sequelize.define("compania", {
    // ID único de la compañía (clave primaria, autoincremental)
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Nombre de la compañía
    nombre: {
      type: DataTypes.STRING(255)
    },
    // URL del logo de la compañía (formato texto largo)
    logo_url: {
      type: DataTypes.TEXT
    }
  }, {
    // Nombre explícito de la tabla en la base de datos
    tableName: "companias",
    // No usar columnas createdAt / updatedAt
    timestamps: false
  });

  return Compania;
};
