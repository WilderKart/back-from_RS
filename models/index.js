const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");

// Configuración y conexión a la base de datos con Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: dbConfig.pool,
  logging: false
});

const db = {};

// Guardamos referencias a Sequelize y la conexión
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos principales (entidades)
db.Pelicula = require("./pelicula.model")(sequelize, DataTypes);
db.Actor = require("./actor.model")(sequelize, DataTypes);
db.Director = require("./director.model")(sequelize, DataTypes);
db.Compania = require("./compania.model")(sequelize, DataTypes);
db.Genero = require("./genero.model")(sequelize, DataTypes);
db.Idioma = require("./idioma.model")(sequelize, DataTypes);

// Modelos intermedios para relaciones muchos a muchos (N:N)
db.PeliculaActor = require("./pelicula_actor.model")(sequelize, DataTypes);
db.PeliculaDirector = require("./pelicula_director.model")(sequelize, DataTypes);
db.PeliculaCompania = require("./pelicula_compania.model")(sequelize, DataTypes);
db.PeliculaGenero = require("./pelicula_genero.model")(sequelize, DataTypes);
db.PeliculaIdioma = require("./pelicula_idioma.model")(sequelize, DataTypes);

// Activar las asociaciones definidas en cada modelo (como en pelicula.model.js)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
