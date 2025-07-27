const API_URL = "http://localhost:3000/api/peliculas";
const TRAILER_ID = 50; // ID de Titanes del Pacífico en tu base de datos

document.addEventListener("DOMContentLoaded", () => {
  cargarTrailerPrincipal();

  const form = document.getElementById("form-busqueda");
  const input = document.getElementById("campo-busqueda");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const consulta = input.value.trim();

    if (!consulta) return;

    try {
      const res = await fetch(`${API_URL}/buscar?query=${encodeURIComponent(consulta)}`);
      const resultados = await res.json();

      const contenedor = document.getElementById("resultados-busqueda");
      contenedor.innerHTML = "";

      if (resultados.length === 0) {
        contenedor.innerHTML = "<p style='color: white;'>No se encontraron resultados.</p>";
        return;
      }

      resultados.forEach(pelicula => {
        const div = document.createElement("div");
        div.classList.add("movie-card");
        div.innerHTML = `
          <img src="${pelicula.imagen_portada}" alt="${pelicula.titulo_espanol}">
          <div class="card-body">
            <h3 class="card-title">${pelicula.titulo_espanol}</h3>
            <p><strong>Duración:</strong> ${pelicula.duracion} min</p>
            <p><strong>Sinopsis:</strong> ${pelicula.sinopsis}</p>
          </div>
        `;

        // ✅ Enlace a la página de detalles
        div.addEventListener("click", () => {
          window.location.href = `detalle.html?id=${pelicula.id}`;
        });

        contenedor.appendChild(div);
      });

    } catch (err) {
      console.error("Error en la búsqueda:", err);
    }
  });
});

async function cargarTrailerPrincipal() {
  try {
    const res = await fetch(`${API_URL}/${TRAILER_ID}`);
    const pelicula = await res.json();
    const trailerUrl = new URL(pelicula.trailer_url);
    const videoId = trailerUrl.searchParams.get("v");

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&controls=1`;
    iframe.allow = "autoplay; encrypted-media";
    iframe.allowFullscreen = true;
    iframe.style.width = "100%";
    iframe.style.aspectRatio = "16 / 9";
    iframe.style.border = "none";

    document.getElementById("trailer-container").appendChild(iframe);
  } catch (error) {
    console.error("Error al cargar el tráiler:", error);
  }
}
