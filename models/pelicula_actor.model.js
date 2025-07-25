module.exports = (sequelize, DataTypes) => {
  const PeliculaActor = sequelize.define("pelicula_actor", {
    id_pelicula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_actor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    personaje: {
      type: DataTypes.STRING(255),
    }
  }, {
    tableName: "pelicula_actor",
    timestamps: false,
  });

  PeliculaActor.associate = (models) => {
    PeliculaActor.belongsTo(models.Actor, {
      foreignKey: "id_actor",
      as: "actor",
    });

    PeliculaActor.belongsTo(models.Pelicula, {
      foreignKey: "id_pelicula",
      as: "pelicula",
    });
  };

  return PeliculaActor;
};
