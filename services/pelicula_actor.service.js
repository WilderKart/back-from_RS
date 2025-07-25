const db = require("../models");
const PeliculaActor = db.PeliculaActor;

// Obtener todas las relaciones Película-Actor
exports.findAll = async () => {
  return await PeliculaActor.findAll({
    attributes: ["id_pelicula", "id_actor", "personaje"],
    include: [
      {
        model: db.Actor,
        as: "actor",
        attributes: ["nombre", "imagen_url"]
      },
      {
        model: db.Pelicula,
        as: "pelicula",
        attributes: ["titulo_espanol"]
      }
    ]
  });
};

// Obtener una relación específica por IDs
exports.findOne = async (id_pelicula, id_actor) => {
  return await PeliculaActor.findOne({
    where: { id_pelicula, id_actor },
    attributes: ["id_pelicula", "id_actor", "personaje"],
    include: [
      {
        model: db.Actor,
        as: "actor",
        attributes: ["nombre", "imagen_url"]
      },
      {
        model: db.Pelicula,
        as: "pelicula",
        attributes: ["titulo_espanol"]
      }
    ]
  });
};

// Crear una nueva relación Película-Actor
exports.create = async (data) => {
  return await PeliculaActor.create(data);
};

// Actualizar una relación (puede cambiar los IDs)
exports.update = async (id_pelicula, id_actor, nuevosDatos) => {
  const transaction = await db.sequelize.transaction();
  try {
    // Verifica si la nueva relación ya existe
    const yaExiste = await PeliculaActor.findOne({
      where: {
        id_pelicula: nuevosDatos.id_pelicula,
        id_actor: nuevosDatos.id_actor
      }
    });

    if (yaExiste) {
      throw new Error("La nueva relación ya existe");
    }

    // Elimina la relación anterior
    await PeliculaActor.destroy({
      where: { id_pelicula, id_actor },
      transaction
    });

    // Crea la nueva relación
    const nuevaRelacion = await PeliculaActor.create(nuevosDatos, { transaction });

    await transaction.commit();
    return nuevaRelacion;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Eliminar una relación por IDs
exports.remove = async (id_pelicula, id_actor) => {
  await PeliculaActor.destroy({ where: { id_pelicula, id_actor } });
};
