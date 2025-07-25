const db = require("../models");
const PeliculaGenero = db.PeliculaGenero;
const Pelicula = db.Pelicula;
const Genero = db.Genero;

/**
 * Obtiene todas las combinaciones Película-Género,
 * incluyendo los nombres legibles de la película y el género.
 */
exports.findAll = async () => {
  const data = await PeliculaGenero.findAll({
    include: [
      { model: Pelicula, as: "pelicula", attributes: ["id", "titulo_espanol"] },
      { model: Genero, as: "genero", attributes: ["id", "nombre"] }
    ]
  });

  // Retorna campos clave y nombres asociados
  return data.map(item => ({
    id_pelicula: item.id_pelicula,
    id_genero: item.id_genero,
    titulo_pelicula: item.pelicula?.titulo_espanol || "",
    nombre_genero: item.genero?.nombre || ""
  }));
};

/**
 * Busca una relación Película-Género por claves compuestas
 */
exports.findOne = async (id_pelicula, id_genero) => {
  const item = await PeliculaGenero.findOne({
    where: { id_pelicula, id_genero },
    include: [
      { model: Pelicula, as: "pelicula", attributes: ["id", "titulo_espanol"] },
      { model: Genero, as: "genero", attributes: ["id", "nombre"] }
    ]
  });

  return item
    ? {
        id_pelicula: item.id_pelicula,
        id_genero: item.id_genero,
        titulo_pelicula: item.pelicula?.titulo_espanol || "",
        nombre_genero: item.genero?.nombre || ""
      }
    : null;
};

/**
 * Crea una nueva relación Película-Género
 */
exports.create = async (data) => {
  return await PeliculaGenero.create(data);
};

/**
 * Actualiza los datos de una relación Película-Género existente
 */
exports.update = async (id_pelicula, id_genero, data) => {
  const item = await PeliculaGenero.findOne({ where: { id_pelicula, id_genero } });
  if (!item) throw new Error("No encontrado");
  return await item.update(data);
};

/**
 * Elimina una relación Película-Género por claves compuestas
 */
exports.remove = async (id_pelicula, id_genero) => {
  await PeliculaGenero.destroy({ where: { id_pelicula, id_genero } });
};
