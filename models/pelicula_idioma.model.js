module.exports = (sequelize, DataTypes) => {
  const PeliculaIdioma = sequelize.define("pelicula_idioma", {
    id_pelicula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    id_idioma: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }, {
    tableName: "pelicula_idioma",
    timestamps: false
  });

  PeliculaIdioma.associate = (models) => {
    PeliculaIdioma.belongsTo(models.Pelicula, {
      foreignKey: "id_pelicula",
      as: "pelicula"
    });
    PeliculaIdioma.belongsTo(models.Idioma, {
      foreignKey: "id_idioma",
      as: "idioma"
    });
  };

  return PeliculaIdioma;
};
