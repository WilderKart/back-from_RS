module.exports = (sequelize, DataTypes) => {
  const PeliculaGenero = sequelize.define("pelicula_genero", {
    id_pelicula: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_genero: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    tableName: "pelicula_genero",
    timestamps: false
  });

  PeliculaGenero.associate = (models) => {
    PeliculaGenero.belongsTo(models.Pelicula, {
      foreignKey: "id_pelicula",
      as: "pelicula"
    });
    PeliculaGenero.belongsTo(models.Genero, {
      foreignKey: "id_genero",
      as: "genero"
    });
  };

  return PeliculaGenero;
};
