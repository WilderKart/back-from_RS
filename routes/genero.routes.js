const express = require("express");
const router = express.Router();
const generoController = require("../controllers/genero.controller");

// Crear un nuevo género
router.post("/", generoController.create);

// Obtener todos los géneros
router.get("/", generoController.findAll);

// Obtener un género por ID
router.get("/:id", generoController.findOne);

// Actualizar un género por ID
router.put("/:id", generoController.update);

// Eliminar un género por ID
router.delete("/:id", generoController.delete);

module.exports = router;
