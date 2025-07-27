// Definición del modelo Pelicula y sus asociaciones N:M
module.exports = (sequelize, DataTypes) => {
  const Pelicula = sequelize.define("Pelicula", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo_espanol: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    titulo_original: {
      type: DataTypes.STRING(255)
    },
    ano_estreno: {
      type: DataTypes.INTEGER
    },
    pais: {
      type: DataTypes.STRING(100)
    },
    duracion: {
      type: DataTypes.INTEGER
    },
    sinopsis: {
      type: DataTypes.TEXT
    },
    trailer_url: {
      type: DataTypes.TEXT
    },
    imagen_portada: {
      type: DataTypes.TEXT
    },
    calificacion: {
      type: DataTypes.DECIMAL(2, 1)
    },
    fecha_estreno: {
      type: DataTypes.DATEONLY
    },
    fecha_creacion: {
      type: DataTypes.DATE
    }
  }, {
    tableName: "peliculas",
    timestamps: false
  });

  // Asociaciones N:M con modelos relacionados
  Pelicula.associate = (models) => {
    Pelicula.belongsToMany(models.Actor, {
      through: models.PeliculaActor,
      foreignKey: "id_pelicula",
      otherKey: "id_actor",
      as: "actores"
    });

    Pelicula.belongsToMany(models.Director, {
      through: models.PeliculaDirector,
      foreignKey: "id_pelicula",
      otherKey: "id_director",
      as: "directores"
    });

    Pelicula.belongsToMany(models.Compania, {
      through: models.PeliculaCompania,
      foreignKey: "id_pelicula",
      otherKey: "id_compania",
      as: "companias"
    });

    Pelicula.belongsToMany(models.Genero, {
      through: models.PeliculaGenero,
      foreignKey: "id_pelicula",
      otherKey: "id_genero",
      as: "generos"
    });

    Pelicula.belongsToMany(models.Idioma, {
      through: models.PeliculaIdioma,
      foreignKey: "id_pelicula",
      otherKey: "id_idioma",
      as: "idiomas"
    });
  };

  return Pelicula;
};
