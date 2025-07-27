// Configura y conecta Sequelize a la base de datos
const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");

// Inicializa Sequelize con configuración personalizada
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

// Contenedor de modelos
const db = {};

// Referencias a Sequelize y la conexión
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos principales
db.Pelicula = require("./pelicula.model")(sequelize, DataTypes);
db.Actor = require("./actor.model")(sequelize, DataTypes);
db.Director = require("./director.model")(sequelize, DataTypes);
db.Compania = require("./compania.model")(sequelize, DataTypes);
db.Genero = require("./genero.model")(sequelize, DataTypes);
db.Idioma = require("./idioma.model")(sequelize, DataTypes);
db.Administrador = require("./administrador.model")(sequelize, DataTypes);

// Modelos intermedios para relaciones muchos a muchos
db.PeliculaActor = require("./pelicula_actor.model")(sequelize, DataTypes);
db.PeliculaDirector = require("./pelicula_director.model")(sequelize, DataTypes);
db.PeliculaCompania = require("./pelicula_compania.model")(sequelize, DataTypes);
db.PeliculaGenero = require("./pelicula_genero.model")(sequelize, DataTypes);
db.PeliculaIdioma = require("./pelicula_idioma.model")(sequelize, DataTypes);

// Ejecuta las asociaciones si el modelo las define (como Pelicula.associate)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exporta el contenedor con todos los modelos y Sequelize
module.exports = db;
