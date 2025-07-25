const service = require("../services/pelicula_idioma.service");

// Obtiene todas las relaciones película-idioma
exports.findAll = async (req, res) => {
  try {
    const data = await service.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al listar relaciones película-idioma", error });
  }
};

// Obtiene una relación específica entre película e idioma
exports.findOne = async (req, res) => {
  try {
    const data = await service.findOne(req.params.id_pelicula, req.params.id_idioma);

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Relación película-idioma no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar la relación", error });
  }
};

// Crea una nueva relación película-idioma
exports.create = async (req, res) => {
  try {
    const data = await service.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al crear relación película-idioma", error });
  }
};

// Actualiza una relación existente
exports.update = async (req, res) => {
  try {
    const data = await service.update(
      req.params.id_pelicula,
      req.params.id_idioma,
      req.body
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar relación película-idioma", error });
  }
};

// Elimina una relación película-idioma
exports.remove = async (req, res) => {
  try {
    await service.remove(req.params.id_pelicula, req.params.id_idioma);
    res.status(204).send(); // Sin contenido, eliminación exitosa
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar relación película-idioma", error });
  }
};
