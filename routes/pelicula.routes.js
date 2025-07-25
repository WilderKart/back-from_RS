const express = require("express");
const router = express.Router();
const peliculaController = require("../controllers/pelicula.controller");

// Crear una nueva película
router.post("/", peliculaController.create);

// Obtener todas las películas
router.get("/", peliculaController.findAll);

// Obtener una película por ID
router.get("/:id", peliculaController.findOne);

// Actualizar una película por ID
router.put("/:id", peliculaController.update);

// Eliminar una película por ID
router.delete("/:id", peliculaController.delete);

module.exports = router;
