module.exports = (sequelize, DataTypes) => {
  // Definición del modelo Director
  const Director = sequelize.define("director", {
    // ID único del director (clave primaria, autoincremental)
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Nombre del director
    nombre: {
      type: DataTypes.STRING(255)
    },
    // URL de la imagen del director
    imagen_url: {
      type: DataTypes.TEXT
    }
  }, {
    // Nombre explícito de la tabla en la base de datos
    tableName: "directores",
    // No usar columnas createdAt / updatedAt
    timestamps: false
  });

  return Director;
};
