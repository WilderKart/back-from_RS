const db = require("../models");
const Compania = db.Compania;
const insertarSinDuplicados = require("../utils/insertarSinDuplicados");

// Crear una compañía, evitando duplicados por nombre
exports.create = async (data) => {
  return await insertarSinDuplicados(Compania, "nombre", data);
};

// Obtener todas las compañías
exports.findAll = async () => {
  return await Compania.findAll();
};

// Obtener una compañía por su ID
exports.findOne = async (id) => {
  return await Compania.findByPk(id);
};

// Actualizar una compañía por ID
exports.update = async (id, data) => {
  return await Compania.update(data, {
    where: { id }
  });
};

// Eliminar una compañía por ID
exports.remove = async (id) => {
  return await Compania.destroy({
    where: { id }
  });
};
