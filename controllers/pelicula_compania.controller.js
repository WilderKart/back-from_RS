const service = require("../services/pelicula_compania.service");

// Obtiene todas las relaciones película-compañía
exports.findAll = async (req, res) => {
  try {
    const data = await service.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al listar relaciones película-compañía", error });
  }
};

// Obtiene una relación específica entre película y compañía
exports.findOne = async (req, res) => {
  try {
    const data = await service.findOne(req.params.id_pelicula, req.params.id_compania);

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Relación película-compañía no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar la relación", error });
  }
};

// Crea una nueva relación película-compañía
exports.create = async (req, res) => {
  try {
    const data = await service.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al crear relación película-compañía", error });
  }
};

// Actualiza una relación existente
exports.update = async (req, res) => {
  try {
    const data = await service.update(
      req.params.id_pelicula,
      req.params.id_compania,
      req.body
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar relación película-compañía", error });
  }
};

// Elimina una relación película-compañía
exports.remove = async (req, res) => {
  try {
    await service.remove(req.params.id_pelicula, req.params.id_compania);
    res.status(204).send(); // Sin contenido: eliminación exitosa
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar relación película-compañía", error });
  }
};
