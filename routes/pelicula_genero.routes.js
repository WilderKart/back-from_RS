const express = require("express");
const router = express.Router();
const controller = require("../controllers/pelicula_genero.controller");

// Obtener todas las relaciones Película-Género
router.get("/", controller.findAll);

// Obtener una relación específica Película-Género
router.get("/:id_pelicula/:id_genero", controller.findOne);

// Crear una nueva relación Película-Género
router.post("/", controller.create);

// Actualizar una relación existente Película-Género
router.put("/:id_pelicula/:id_genero", controller.update);

// Eliminar una relación Película-Género
router.delete("/:id_pelicula/:id_genero", controller.remove);

module.exports = router;
