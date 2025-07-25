const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actor.controller");

// Crear un nuevo actor
router.post("/", actorController.create);

// Obtener todos los actores
router.get("/", actorController.findAll);

// Obtener un actor por ID
router.get("/:id", actorController.findOne);

// Actualizar un actor por ID
router.put("/:id", actorController.update);

// Eliminar un actor por ID
router.delete("/:id", actorController.delete);

module.exports = router;
