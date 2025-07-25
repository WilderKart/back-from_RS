// insertarSinDuplicados.js
module.exports = async function insertarSinDuplicados(Modelo, campoUnico, data) {
  // Asegurarse que siempre trabajamos con un array
  const listaOriginal = Array.isArray(data) ? data : [data];

  // Paso 1: Limpiar y validar datos
  const listaValida = listaOriginal
    .map(e => {
      const valor = e[campoUnico];

      // Si no es string, se descarta
      if (typeof valor !== "string") return null;

      const limpio = valor.trim();

      // Si queda vacío después de trim, se descarta
      if (limpio === "") return null;

      // Retorna el objeto con el campo limpio
      return { ...e, [campoUnico]: limpio };
    })
    .filter(e => e !== null); // Eliminar los inválidos

  // Si no hay ninguno válido, se lanza error
  if (listaValida.length === 0) {
    throw new Error(`Debe incluir al menos un ${campoUnico} válido.`);
  }

  // Paso 2: Extraer los valores únicos a verificar
  const valores = listaValida.map(e => e[campoUnico]);

  // Paso 3: Buscar en la base de datos los registros existentes con ese campo
  const existentes = await Modelo.findAll({
    where: { [campoUnico]: valores }
  });
  const yaExistentes = existentes.map(e => e[campoUnico]);

  // Paso 4: Filtrar los que aún no existen
  const nuevos = listaValida.filter(e => !yaExistentes.includes(e[campoUnico]));

  // Paso 5: Insertar los nuevos registros si hay alguno
  const insertados = nuevos.length > 0 ? await Modelo.bulkCreate(nuevos) : [];

  // Si el parámetro original no era array
  if (!Array.isArray(data)) {
    const original = data[campoUnico]?.trim();
    if (yaExistentes.includes(original)) {
      throw new Error(`El ${campoUnico} "${original}" ya está registrado.`);
    }
    return insertados[0];
  }

  // Si era array, devolver un resumen
  return {
    insertados,
    omitidos: yaExistentes
  };
};
