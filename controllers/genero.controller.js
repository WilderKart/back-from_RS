const generoService = require("../services/genero.service");

// Crea uno o varios géneros
exports.create = async (req, res) => {
  try {
    const result = await generoService.create(req.body);

    // Si se recibe un arreglo de géneros
    if (Array.isArray(req.body)) {
      // Todos los géneros ya estaban registrados
      if (result.insertados.length === 0 && result.omitidos.length > 0) {
        return res.status(409).json({
          mensaje: "Todos los géneros ya estaban registrados.",
          omitidos: result.omitidos
        });
      }

      // Algunos se insertaron correctamente
      return res.status(201).json(result);
    }

    // Inserción individual exitosa
    return res.status(201).json(result);

  } catch (err) {
    // Género ya registrado
    if (err.message.includes("ya está registrado")) {
      return res.status(409).json({ error: err.message });
    }

    // Error interno
    res.status(500).json({ error: err.message });
  }
};

// Obtiene todos los géneros registrados
exports.findAll = async (req, res) => {
  try {
    const result = await generoService.findAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene un género por su ID
exports.findOne = async (req, res) => {
  try {
    const result = await generoService.findOne(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Género no encontrado" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualiza un género por ID
exports.update = async (req, res) => {
  try {
    const result = await generoService.update(req.params.id, req.body);
    res.json({ message: "Género actualizado", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Elimina un género por ID
exports.delete = async (req, res) => {
  try {
    await generoService.remove(req.params.id);
    res.json({ message: "Género eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
