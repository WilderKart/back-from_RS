const express = require("express");
const router = express.Router();
const companiaController = require("../controllers/compania.controller");

// Crear una nueva compañía
router.post("/", companiaController.create);

// Obtener todas las compañías
router.get("/", companiaController.findAll);

// Obtener una compañía por ID
router.get("/:id", companiaController.findOne);

// Actualizar una compañía por ID
router.put("/:id", companiaController.update);

// Eliminar una compañía por ID
router.delete("/:id", companiaController.delete);

module.exports = router;
