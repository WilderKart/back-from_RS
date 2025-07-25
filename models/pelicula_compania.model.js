module.exports = (sequelize, DataTypes) => {
  const PeliculaCompania = sequelize.define("pelicula_compania", {
    id_pelicula: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_compania: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    tableName: "pelicula_compania",
    timestamps: false
  });

  PeliculaCompania.associate = (models) => {
    PeliculaCompania.belongsTo(models.Pelicula, {
      foreignKey: "id_pelicula",
      as: "pelicula"
    });
    PeliculaCompania.belongsTo(models.Compania, {
      foreignKey: "id_compania",
      as: "compania"
    });
  };

  return PeliculaCompania;
};
