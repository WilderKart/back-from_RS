const directorService = require("../services/director.service");

// Crea uno o varios directores
exports.create = async (req, res) => {
  try {
    const result = await directorService.create(req.body);

    // Si se recibe un arreglo de directores
    if (Array.isArray(req.body)) {
      // Todos los directores ya estaban registrados
      if (result.insertados.length === 0 && result.omitidos.length > 0) {
        return res.status(409).json({
          mensaje: "Todos los directores ya estaban registrados.",
          omitidos: result.omitidos
        });
      }

      // Algunos se insertaron correctamente
      return res.status(201).json(result);
    }

    // Inserción individual exitosa
    return res.status(201).json(result);

  } catch (err) {
    // Director ya registrado
    if (err.message && err.message.includes("ya está registrado")) {
      return res.status(409).json({ error: err.message });
    }

    // Error interno
    res.status(500).json({ error: err.message });
  }
};

// Obtiene todos los directores registrados
exports.findAll = async (req, res) => {
  try {
    const result = await directorService.findAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene un director por ID
exports.findOne = async (req, res) => {
  try {
    const result = await directorService.findOne(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Director no encontrado" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualiza un director por ID
exports.update = async (req, res) => {
  try {
    const result = await directorService.update(req.params.id, req.body);
    res.json({ message: "Director actualizado", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Elimina un director por ID
exports.delete = async (req, res) => {
  try {
    await directorService.remove(req.params.id);
    res.json({ message: "Director eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
