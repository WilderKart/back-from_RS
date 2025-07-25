const db = require("../models");
const PeliculaIdioma = db.PeliculaIdioma;
const Pelicula = db.Pelicula;
const Idioma = db.Idioma;

/**
 * Obtiene todas las combinaciones Película-Idioma,
 * incluyendo títulos de película e idioma legibles.
 */
exports.findAll = async () => {
  const data = await PeliculaIdioma.findAll({
    include: [
      { model: Pelicula, as: "pelicula", attributes: ["id", "titulo_espanol"] },
      { model: Idioma, as: "idioma", attributes: ["id", "nombre"] }
    ]
  });

  // Retorna solo los campos relevantes con nombres legibles
  return data.map(item => ({
    id_pelicula: item.id_pelicula,
    id_idioma: item.id_idioma,
    titulo_pelicula: item.pelicula?.titulo_espanol || "",
    nombre_idioma: item.idioma?.nombre || ""
  }));
};

/**
 * Busca una relación Película-Idioma por claves compuestas
 */
exports.findOne = async (id_pelicula, id_idioma) => {
  const item = await PeliculaIdioma.findOne({
    where: { id_pelicula, id_idioma },
    include: [
      { model: Pelicula, as: "pelicula", attributes: ["id", "titulo_espanol"] },
      { model: Idioma, as: "idioma", attributes: ["id", "nombre"] }
    ]
  });

  return item
    ? {
        id_pelicula: item.id_pelicula,
        id_idioma: item.id_idioma,
        titulo_pelicula: item.pelicula?.titulo_espanol || "",
        nombre_idioma: item.idioma?.nombre || ""
      }
    : null;
};

/**
 * Crea una nueva relación Película-Idioma
 */
exports.create = async (data) => {
  return await PeliculaIdioma.create(data);
};

/**
 * Actualiza una relación Película-Idioma existente
 */
exports.update = async (id_pelicula, id_idioma, data) => {
  const item = await PeliculaIdioma.findOne({ where: { id_pelicula, id_idioma } });
  if (!item) throw new Error("No encontrado");
  return await item.update(data);
};

/**
 * Elimina una relación Película-Idioma por claves compuestas
 */
exports.remove = async (id_pelicula, id_idioma) => {
  await PeliculaIdioma.destroy({ where: { id_pelicula, id_idioma } });
};
