const db = require("../models");
const Director = db.Director;
const insertarSinDuplicados = require("../utils/insertarSinDuplicados");

// Crear un director, evitando duplicados por nombre
exports.create = async (data) => {
  return await insertarSinDuplicados(Director, "nombre", data);
};

// Obtener todos los directores
exports.findAll = async () => {
  return await Director.findAll();
};

// Obtener un director por su ID
exports.findOne = async (id) => {
  return await Director.findByPk(id);
};

// Actualizar un director por ID
exports.update = async (id, data) => {
  return await Director.update(data, {
    where: { id }
  });
};

// Eliminar un director por ID
exports.remove = async (id) => {
  return await Director.destroy({
    where: { id }
  });
};
