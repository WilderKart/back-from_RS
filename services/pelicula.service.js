const db = require("../models");
const Pelicula = db.Pelicula;
const insertarSinDuplicados = require("../utils/insertarSinDuplicados");

// Crea una o varias películas, evitando duplicados por "titulo_espanol"
exports.create = async (data) => {
  return await insertarSinDuplicados(Pelicula, "titulo_espanol", data);
};

// Retorna todas las películas registradas
exports.findAll = async () => {
  return await Pelicula.findAll();
};

// ✅ Retorna una película específica por ID con todas sus relaciones
exports.findOne = async (id) => {
  return await Pelicula.findByPk(id, {
    include: [
      { association: "actores" },
      { association: "directores" },
      { association: "companias" },
      { association: "generos" },
      { association: "idiomas" }
    ]
  });
};

// Actualiza una película por ID
exports.update = async (id, data) => {
  return await Pelicula.update(data, {
    where: { id }
  });
};

// Elimina una película por ID
exports.remove = async (id) => {
  return await Pelicula.destroy({
    where: { id }
  });
};



exports.findOne = async (id) => {
  return await Pelicula.findByPk(id, {
    include: [
      { association: "actores" },
      { association: "directores" },
      { association: "companias" },
      { association: "generos" },
      { association: "idiomas" }
    ]
  });
};
