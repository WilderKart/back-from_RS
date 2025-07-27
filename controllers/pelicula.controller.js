const peliculaService = require("../services/pelicula.service");

// Crea una o varias películas
exports.create = async (req, res) => {
  try {
    const result = await peliculaService.create(req.body);

    // Si se está creando un arreglo de películas
    if (Array.isArray(req.body)) {
      // Todas las películas ya existían
      if (result.insertados.length === 0 && result.omitidos.length > 0) {
        return res.status(409).json({
          mensaje: "Todas las películas ya estaban registradas.",
          omitidos: result.omitidos
        });
      }

      // Algunas películas fueron insertadas o ya existían
      return res.status(201).json(result);
    }

    // Se insertó una sola película
    return res.status(201).json(result);

  } catch (err) {
    // Si el error es por duplicidad
    if (err.message && err.message.includes("ya está registrado")) {
      return res.status(409).json({ error: err.message });
    }

    // Error interno del servidor
    res.status(500).json({ error: err.message });
  }
};

// Obtiene todas las películas
exports.findAll = async (req, res) => {
  try {
    const result = await peliculaService.findAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene una película por ID
exports.findOne = async (req, res) => {
  try {
    const result = await peliculaService.findOne(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualiza una película por ID
exports.update = async (req, res) => {
  try {
    const result = await peliculaService.update(req.params.id, req.body);
    res.json({ message: "Película actualizada", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Elimina una película por ID
exports.delete = async (req, res) => {
  try {
    await peliculaService.remove(req.params.id);
    res.json({ message: "Película eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Buscar películas por texto
exports.buscar = async (req, res) => {
  const { query } = req.query;

  try {
    const db = require("../models"); // Asegura acceso a Sequelize y relaciones

    const peliculas = await db.Pelicula.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { titulo_espanol: { [db.Sequelize.Op.iLike]: `%${query}%` } },
          { sinopsis: { [db.Sequelize.Op.iLike]: `%${query}%` } }
        ]
      },
      include: [
        { association: "actores" },
        { association: "directores" },
        { association: "companias" },
        { association: "generos" },
        { association: "idiomas" }
      ]
    });

    res.json(peliculas);
  } catch (err) {
    console.error("❌ Error al buscar películas:", err);
    res.status(500).json({ error: err.message });
  }
};
