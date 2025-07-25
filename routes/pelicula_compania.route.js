const express = require("express");
const router = express.Router();
const controller = require("../controllers/pelicula_compania.controller");

// Obtener todas las relaciones Película-Compañía
router.get("/", controller.findAll);

// Obtener una relación específica Película-Compañía
router.get("/:id_pelicula/:id_compania", controller.findOne);

// Crear una nueva relación Película-Compañía
router.post("/", controller.create);

// Actualizar una relación existente Película-Compañía
router.put("/:id_pelicula/:id_compania", controller.update);

// Eliminar una relación Película-Compañía
router.delete("/:id_pelicula/:id_compania", controller.remove);

module.exports = router;
