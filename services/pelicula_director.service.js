const db = require("../models");
const PeliculaDirector = db.PeliculaDirector;
const Pelicula = db.Pelicula;
const Director = db.Director;

/**
 * Lista todas las relaciones Película-Director,
 * incluyendo nombre e imagen del director y título de la película.
 */
exports.findAll = async () => {
  const data = await PeliculaDirector.findAll({
    include: [
      { model: Pelicula, as: "pelicula", attributes: ["titulo_espanol"] },
      { model: Director, as: "director", attributes: ["nombre", "imagen_url"] }
    ]
  });

  // Se transforma la salida para facilitar el uso en el frontend
  return data.map(item => ({
    id_pelicula: item.id_pelicula,
    id_director: item.id_director,
    titulo_pelicula: item.pelicula?.titulo_espanol || "",
    nombre_director: item.director?.nombre || "",
    imagen_director: item.director?.imagen_url || ""
  }));
};

/**
 * Busca una relación Película-Director por claves compuestas
 */
exports.findOne = async (id_pelicula, id_director) => {
  const item = await PeliculaDirector.findOne({
    where: { id_pelicula, id_director },
    include: [
      { model: Pelicula, as: "pelicula", attributes: ["titulo_espanol"] },
      { model: Director, as: "director", attributes: ["nombre", "imagen_url"] }
    ]
  });

  if (!item) return null;

  return {
    id_pelicula: item.id_pelicula,
    id_director: item.id_director,
    titulo_pelicula: item.pelicula?.titulo_espanol || "",
    nombre_director: item.director?.nombre || "",
    imagen_director: item.director?.imagen_url || ""
  };
};

/**
 * Crea una nueva relación Película-Director
 */
exports.create = async (data) => {
  return await PeliculaDirector.create(data);
};

/**
 * Actualiza una relación existente Película-Director
 */
exports.update = async (id_pelicula, id_director, data) => {
  const item = await PeliculaDirector.findOne({ where: { id_pelicula, id_director } });
  if (!item) throw new Error("No encontrado");
  return await item.update(data);
};

/**
 * Elimina una relación Película-Director
 */
exports.remove = async (id_pelicula, id_director) => {
  await PeliculaDirector.destroy({ where: { id_pelicula, id_director } });
};
