const service = require("../services/pelicula_genero.service");

// Obtiene todas las relaciones película-género
exports.findAll = async (req, res) => {
  try {
    const data = await service.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al listar relaciones película-género", error });
  }
};

// Obtiene una relación específica entre película y género
exports.findOne = async (req, res) => {
  try {
    const data = await service.findOne(req.params.id_pelicula, req.params.id_genero);

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Relación película-género no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar la relación", error });
  }
};

// Crea una nueva relación película-género
exports.create = async (req, res) => {
  try {
    const data = await service.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al crear relación película-género", error });
  }
};

// Actualiza una relación existente
exports.update = async (req, res) => {
  try {
    const data = await service.update(
      req.params.id_pelicula,
      req.params.id_genero,
      req.body
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar relación película-género", error });
  }
};

// Elimina una relación película-género
exports.remove = async (req, res) => {
  try {
    await service.remove(req.params.id_pelicula, req.params.id_genero);
    res.status(204).send(); // Sin contenido: eliminación exitosa
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar relación película-género", error });
  }
};
