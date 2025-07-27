const API_URL = "http://localhost:3000/api/peliculas";
const form = document.getElementById("form-pelicula");
const tbody = document.getElementById("peliculas-body");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const pelicula = {
    titulo_espanol: form.titulo_espanol.value,
    titulo_original: form.titulo_original.value,
    ano_estreno: form.ano_estreno.value,
    pais: form.pais.value,
    duracion: form.duracion.value,
    sinopsis: form.sinopsis.value,
    trailer_url: form.trailer_url.value,
    imagen_portada: form.imagen_portada.value,
    calificacion: form.calificacion.value,
    fecha_estreno: form.fecha_estreno.value,
  };

  const id = form.id.value;

  try {
    if (id) {
      // Actualizar
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pelicula),
      });
    } else {
      // Crear
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pelicula),
      });
    }

    form.reset();
    form.id.value = "";
    cargarPeliculas();

  } catch (error) {
    console.error("Error guardando película:", error);
  }
});

async function cargarPeliculas() {
  const res = await fetch(API_URL);
  const peliculas = await res.json();

  tbody.innerHTML = "";

  peliculas.forEach((p) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.titulo_espanol}</td>
      <td>${p.ano_estreno}</td>
      <td class="actions">
        <button onclick="editarPelicula(${p.id})" class="btn">Editar</button>
        <button onclick="eliminarPelicula(${p.id})" class="btn">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function editarPelicula(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const p = await res.json();

  for (let key in p) {
    if (form[key]) {
      form[key].value = p[key];
    }
  }

  form.id.value = p.id;
}

async function eliminarPelicula(id) {
  if (!confirm("¿Eliminar esta película?")) return;
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  cargarPeliculas();
}

// Cargar al iniciar
cargarPeliculas();
