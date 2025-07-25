const actorService = require("../services/actor.service");

// Crea uno o varios actores
exports.create = async (req, res) => {
  try {
    const result = await actorService.create(req.body);

    // Si se reciben múltiples actores (arreglo)
    if (Array.isArray(req.body)) {
      // Todos los actores ya estaban registrados
      if (result.insertados.length === 0 && result.omitidos.length > 0) {
        return res.status(409).json({
          mensaje: "Todos los actores ya estaban registrados.",
          omitidos: result.omitidos
        });
      }

      // Algunos actores fueron insertados correctamente
      return res.status(201).json(result);
    }

    // Inserción individual exitosa
    return res.status(201).json(result);

  } catch (err) {
    // Actor duplicado
    if (err.message && err.message.includes("ya está registrado")) {
      return res.status(409).json({ error: err.message });
    }

    // Error interno del servidor
    res.status(500).json({ error: err.message });
  }
};

// Obtiene todos los actores
exports.findAll = async (req, res) => {
  try {
    const result = await actorService.findAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene un actor por ID
exports.findOne = async (req, res) => {
  try {
    const result = await actorService.findOne(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Actor no encontrado" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualiza un actor por ID
exports.update = async (req, res) => {
  try {
    const result = await actorService.update(req.params.id, req.body);
    res.json({ message: "Actor actualizado", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Elimina un actor por ID
exports.delete = async (req, res) => {
  try {
    await actorService.remove(req.params.id);
    res.json({ message: "Actor eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
