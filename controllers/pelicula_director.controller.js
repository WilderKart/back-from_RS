const service = require("../services/pelicula_director.service");

// Obtiene todas las relaciones película-director
exports.findAll = async (req, res) => {
  try {
    const data = await service.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al listar relaciones película-director", error });
  }
};

// Obtiene una relación específica entre película y director
exports.findOne = async (req, res) => {
  try {
    const data = await service.findOne(req.params.id_pelicula, req.params.id_director);

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Relación película-director no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar la relación", error });
  }
};

// Crea una nueva relación película-director
exports.create = async (req, res) => {
  try {
    const data = await service.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al crear relación película-director", error });
  }
};

// Actualiza una relación existente
exports.update = async (req, res) => {
  try {
    const data = await service.update(
      req.params.id_pelicula,
      req.params.id_director,
      req.body
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar relación película-director", error });
  }
};

// Elimina una relación película-director
exports.remove = async (req, res) => {
  try {
    await service.remove(req.params.id_pelicula, req.params.id_director);
    res.status(204).send(); // Eliminación exitosa sin contenido
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar relación película-director", error });
  }
};
