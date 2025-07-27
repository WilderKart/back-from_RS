const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const db = require("../models");

router.get("/", async (req, res) => {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ error: "Debe enviar un término de búsqueda" });
  }

  try {
    const peliculas = await db.Pelicula.findAll({
      where: {
        [Op.or]: [
          { titulo_espanol: { [Op.iLike]: `%${q}%` } },
          { sinopsis: { [Op.iLike]: `%${q}%` } }
        ]
      },
      include: [
        {
          model: db.Actor,
          where: { nombre: { [Op.iLike]: `%${q}%` } },
          required: false
        },
        {
          model: db.Director,
          where: { nombre: { [Op.iLike]: `%${q}%` } },
          required: false
        },
        {
          model: db.Genero,
          where: { nombre: { [Op.iLike]: `%${q}%` } },
          required: false
        },
        {
          model: db.Idioma,
          where: { nombre: { [Op.iLike]: `%${q}%` } },
          required: false
        },
        {
          model: db.Compania,
          where: { nombre: { [Op.iLike]: `%${q}%` } },
          required: false
        }
      ],
      distinct: true
    });

    res.json(peliculas);
  } catch (error) {
    console.error("Error en búsqueda:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
