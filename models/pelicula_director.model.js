module.exports = (sequelize, DataTypes) => {
  const PeliculaDirector = sequelize.define("pelicula_director", {
    id_pelicula: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_director: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    tableName: "pelicula_director",
    timestamps: false
  });

  PeliculaDirector.associate = (models) => {
    PeliculaDirector.belongsTo(models.Pelicula, {
      foreignKey: "id_pelicula",
      as: "pelicula"
    });
    PeliculaDirector.belongsTo(models.Director, {
      foreignKey: "id_director",
      as: "director"
    });
  };

  return PeliculaDirector;
};
