const express = require("express");
const router = express.Router();
const controller = require("../controllers/pelicula_idioma.controller");

// Obtener todas las relaciones Película-Idioma
router.get("/", controller.findAll);

// Obtener una relación específica Película-Idioma
router.get("/:id_pelicula/:id_idioma", controller.findOne);

// Crear una nueva relación Película-Idioma
router.post("/", controller.create);

// Actualizar una relación existente Película-Idioma
router.put("/:id_pelicula/:id_idioma", controller.update);

// Eliminar una relación Película-Idioma
router.delete("/:id_pelicula/:id_idioma", controller.remove);

module.exports = router;
