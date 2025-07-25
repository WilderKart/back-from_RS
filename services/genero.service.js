const db = require("../models");
const Genero = db.Genero;
const insertarSinDuplicados = require("../utils/insertarSinDuplicados");

// Crear un género, evitando duplicados por nombre
exports.create = async (data) => {
  return await insertarSinDuplicados(Genero, "nombre", data);
};

// Obtener todos los géneros
exports.findAll = async () => {
  return await Genero.findAll();
};

// Obtener un género por su ID
exports.findOne = async (id) => {
  return await Genero.findByPk(id);
};

// Actualizar un género por ID
exports.update = async (id, data) => {
  return await Genero.update(data, { where: { id } });
};

// Eliminar un género por ID
exports.remove = async (id) => {
  return await Genero.destroy({ where: { id } });
};
