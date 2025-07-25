const companiaService = require("../services/compania.service");

// Crea una o varias compañías
exports.create = async (req, res) => {
  try {
    const result = await companiaService.create(req.body);

    // Si se recibe un arreglo de compañías
    if (Array.isArray(req.body)) {
      // Todas las compañías ya estaban registradas
      if (result.insertados.length === 0 && result.omitidos.length > 0) {
        return res.status(409).json({
          mensaje: "Todas las compañías ya estaban registradas.",
          omitidos: result.omitidos
        });
      }

      // Algunas se insertaron correctamente
      return res.status(201).json(result);
    }

    // Inserción individual exitosa
    return res.status(201).json(result);

  } catch (err) {
    // Compañía duplicada
    if (err.message && err.message.includes("ya está registrada")) {
      return res.status(409).json({ error: err.message });
    }

    // Error interno
    res.status(500).json({ error: err.message });
  }
};

// Obtiene todas las compañías
exports.findAll = async (req, res) => {
  try {
    const result = await companiaService.findAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtiene una compañía por ID
exports.findOne = async (req, res) => {
  try {
    const result = await companiaService.findOne(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Compañía no encontrada" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualiza una compañía por ID
exports.update = async (req, res) => {
  try {
    const result = await companiaService.update(req.params.id, req.body);
    res.json({ message: "Compañía actualizada", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Elimina una compañía por ID
exports.delete = async (req, res) => {
  try {
    await companiaService.remove(req.params.id);
    res.json({ message: "Compañía eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
