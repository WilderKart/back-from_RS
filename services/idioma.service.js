const db = require("../models");
const Idioma = db.Idioma;
const insertarSinDuplicados = require("../utils/insertarSinDuplicados");

// Crear un idioma, evitando duplicados por nombre
exports.create = async (data) => {
  return await insertarSinDuplicados(Idioma, "nombre", data);
};

// Obtener todos los idiomas
exports.findAll = async () => {
  return await Idioma.findAll();
};

// Obtener un idioma por su ID
exports.findOne = async (id) => {
  return await Idioma.findByPk(id);
};

// Actualizar un idioma por ID
exports.update = async (id, data) => {
  return await Idioma.update(data, {
    where: { id }
  });
};

// Eliminar un idioma por ID
exports.remove = async (id) => {
  return await Idioma.destroy({
    where: { id }
  });
};
