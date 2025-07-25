const idiomaService = require("../services/idioma.service");

// Crea uno o varios idiomas
exports.create = async (req, res) => {
  try {
    const result = await idiomaService.create(req.body);

    // Si se envió un arreglo de idiomas
    if (Array.isArray(req.body)) {
      // Todos los idiomas ya estaban registrados
      if (result.insertados.length === 0 && result.omitidos.length > 0) {
        return res.status(409).json({
          mensaje: "Todos los idiomas ya estaban registrados.",
          omitidos: result.omitidos
        });
      }

      // Algunos idiomas se insertaron
      return res.status(201).json(result);
    }

    // Se insertó un único idioma
    return res.status(201).json(result);

  } catch (err) {
    // Conflicto por idioma ya existente
    if (err.message && err.message.includes("ya está registrado")) {
      return res.status(409).json({ error: err.message });
    }

    // Error interno del servidor
    res.status(500).json({ error: err.message });
  }
};

// Obtiene todos los idiomas registrados
exports.findAll = async (req, res) => {
  try {
    const result = await idiomaService.findAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene un idioma por ID
exports.findOne = async (req, res) => {
  try {
    const result = await idiomaService.findOne(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Idioma no encontrado" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualiza un idioma por ID
exports.update = async (req, res) => {
  try {
    const result = await idiomaService.update(req.params.id, req.body);
    res.json({ message: "Idioma actualizado", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Elimina un idioma por ID
exports.delete = async (req, res) => {
  try {
    await idiomaService.remove(req.params.id);
    res.json({ message: "Idioma eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
