const express = require("express");
const cors = require("cors");
const db = require("./models");

// Importa todas las rutas solo una vez
const actorRoutes = require('./routes/actor.routes');
const directorRoutes = require('./routes/director.routes');
const companiaRoutes = require('./routes/compania.routes');
const generoRoutes = require('./routes/genero.routes');
const idiomaRoutes = require('./routes/idioma.routes');
const peliculaRoutes = require("./routes/pelicula.routes");
const peliculaActorRoutes = require("./routes/pelicula_actor.route");
const peliculaDirectorRoutes = require("./routes/pelicula_director.routes");
const peliculaCompaniaRoutes = require("./routes/pelicula_compania.route");
const peliculaIdiomaRoutes = require("./routes/pelicula_idioma.route");
const peliculaGeneroRoutes = require("./routes/pelicula_genero.routes");
const adminRoutes = require('./routes/admin.routes');

const app = express();
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente! 🚀");
});

app.use(cors());
app.use(express.json());

// Monta las rutas
app.use("/api/actores", actorRoutes);
app.use("/api/directores", directorRoutes);
app.use("/api/compania", companiaRoutes);
app.use("/api/peliculas", peliculaRoutes);
app.use("/api/genero", generoRoutes);
app.use("/api/idioma", idiomaRoutes);
app.use("/api/pelicula-actor", peliculaActorRoutes);
app.use("/api/pelicula_director", peliculaDirectorRoutes);
app.use("/api/pelicula-compania", peliculaCompaniaRoutes);
app.use("/api/pelicula-idioma", peliculaIdiomaRoutes);
app.use("/api/pelicula-genero", peliculaGeneroRoutes);
app.use("/api/admin", adminRoutes);

// Sincroniza base de datos
// db.sequelize.sync().then(() => {
//   console.log("Base de datos sincronizada");
// });
(async () => {
  try {
    await db.sequelize.sync();
    console.log("✅ Base de datos sincronizada correctamente");
  } catch (error) {
    console.error("❌ Error al sincronizar la base de datos:", error);
  }
})();

module.exports = app;





































// Rutas
/*const actorRoutes = require("./routes/actor.routes");
app.use("/api/actores", actorRoutes);

const directorRoutes = require("./routes/director.routes");
app.use("/api/directores", directorRoutes);

const companiaRoutes = require("./routes/compania.routes");
app.use("/api/compania", companiaRoutes);

const peliculaRoutes = require("./routes/pelicula.routes");
app.use("/api/peliculas", peliculaRoutes);

const generoRoutes = require("./routes/genero.routes");
app.use("/api/genero", generoRoutes);

const idiomaRoutes = require("./routes/idioma.routes");
app.use("/api/idioma", idiomaRoutes);

const peliculaActorRoutes = require("./routes/pelicula_actor.route");
app.use("/api/pelicula-actor", peliculaActorRoutes);

const peliculaDirectorRoutes = require("./routes/pelicula_director.routes");
app.use("/api/pelicula_director", peliculaDirectorRoutes);

const peliculaCompaniaRoutes = require("./routes/pelicula_compania.route");
app.use("/api/pelicula-compania", peliculaCompaniaRoutes);

const peliculaIdiomaRoutes = require("./routes/pelicula_idioma.route");
app.use("/api/pelicula-idioma", peliculaIdiomaRoutes);

const peliculaGeneroRoutes = require("./routes/pelicula_genero.routes");
app.use("/api/pelicula-genero", peliculaGeneroRoutes);

// Sincroniza base de datos
db.sequelize.sync().then(() => {
  console.log("Base de datos sincronizada");
});

module.exports = app;*/
