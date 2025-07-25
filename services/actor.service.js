const db = require("../models");
const Actor = db.Actor;
const insertarSinDuplicados = require("../utils/insertarSinDuplicados");

// Crear un actor, evitando duplicados por nombre
exports.create = async (data) => {
  return await insertarSinDuplicados(Actor, "nombre", data);
};

// Obtener todos los actores
exports.findAll = async () => {
  return await Actor.findAll();
};

// Obtener un actor por su ID
exports.findOne = async (id) => {
  return await Actor.findByPk(id);
};

// Actualizar un actor por ID
exports.update = async (id, data) => {
  return await Actor.update(data, {
    where: { id }
  });
};

// Eliminar un actor por ID
exports.remove = async (id) => {
  return await Actor.destroy({
    where: { id }
  });
};
