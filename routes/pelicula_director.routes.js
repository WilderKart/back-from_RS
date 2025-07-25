const express = require("express");
const router = express.Router();
const controller = require("../controllers/pelicula_director.controller");

// Obtener todas las relaciones Película-Director
router.get("/", controller.findAll);

// Obtener una relación específica Película-Director
router.get("/:id_pelicula/:id_director", controller.findOne);

// Crear una nueva relación Película-Director
router.post("/", controller.create);

// Actualizar una relación existente Película-Director
router.put("/:id_pelicula/:id_director", controller.update);

// Eliminar una relación Película-Director
router.delete("/:id_pelicula/:id_director", controller.remove);

module.exports = router;
