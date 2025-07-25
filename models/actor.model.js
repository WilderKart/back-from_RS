module.exports = (sequelize, DataTypes) => {
  // Definición del modelo Actor
  const Actor = sequelize.define("Actor", {
    // ID único del actor (clave primaria, autoincremental)
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // Nombre del actor (obligatorio)
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // URL de la imagen del actor (opcional)
    imagen_url: {
      type: DataTypes.STRING
    }
  }, {
    // Nombre de la tabla en la base de datos
    tableName: "actores",
    // Desactiva timestamps (createdAt, updatedAt)
    timestamps: false
  });

  return Actor;
};
