const express = require("express");
const router = express.Router();
const idiomaController = require("../controllers/idioma.controller");

// Crear un nuevo idioma
router.post("/", idiomaController.create);

// Obtener todos los idiomas
router.get("/", idiomaController.findAll);

// Obtener un idioma por ID
router.get("/:id", idiomaController.findOne);

// Actualizar un idioma por ID
router.put("/:id", idiomaController.update);

// Eliminar un idioma por ID
router.delete("/:id", idiomaController.delete);

module.exports = router;
