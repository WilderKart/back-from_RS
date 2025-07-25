const express = require("express");
const router = express.Router();
const controller = require("../controllers/pelicula_actor.controller");

// Obtener todas las relaciones Película-Actor
router.get("/", controller.findAll);

// Obtener una relación específica Película-Actor
router.get("/:id_pelicula/:id_actor", controller.findOne);

// Crear una nueva relación Película-Actor
router.post("/", controller.create);

// Actualizar una relación existente Película-Actor
router.put("/:id_pelicula/:id_actor", controller.update);

// Eliminar una relación Película-Actor
router.delete("/:id_pelicula/:id_actor", controller.remove);

module.exports = router;
