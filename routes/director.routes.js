const express = require("express");
const router = express.Router();
const directorController = require("../controllers/director.controller");

// Crear un nuevo director
router.post("/", directorController.create);

// Obtener todos los directores
router.get("/", directorController.findAll);

// Obtener un director por ID
router.get("/:id", directorController.findOne);

// Actualizar un director por ID
router.put("/:id", directorController.update);

// Eliminar un director por ID
router.delete("/:id", directorController.delete);

module.exports = router;
