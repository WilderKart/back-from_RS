const API_URL = "http://localhost:3000/api/peliculas";

// Obtener el ID de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("No se especificó ninguna película.");
} else {
  cargarDetalle();
}

async function cargarDetalle() {
  try {
    const res = await fetch(`${API_URL}/${id}`);

    if (!res.ok) {
      throw new Error("Película no encontrada");
    }

    const pelicula = await res.json();

    if (!pelicula || !pelicula.id) {
      throw new Error("Película inválida o no encontrada.");
    }

    // Crear contenedor responsivo para el iframe (video-wrapper)
    const wrapper = document.createElement("div");
    wrapper.className = "video-wrapper";

    // Crear iframe del tráiler
    const youtubeUrl = new URL(pelicula.trailer_url);
    const videoId = youtubeUrl.searchParams.get("v");
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&showinfo=0&controls=1`;
    iframe.allow = "autoplay; encrypted-media";
    iframe.allowFullscreen = true;
    iframe.frameBorder = "0";
    iframe.style.width = "100%";
    iframe.style.aspectRatio = "16 / 9";
    iframe.style.border = "none";

    // Insertar iframe en el contenedor
    wrapper.appendChild(iframe);
    document.getElementById("iframe-container").appendChild(wrapper);

    // Mostrar datos principales de la película
    document.getElementById("titulo").textContent = pelicula.titulo_espanol;
    document.getElementById("duracion").textContent = `Duración: ${pelicula.duracion} minutos`;
    document.getElementById("sinopsis").textContent = pelicula.sinopsis;

    // Mostrar relaciones si existen
    document.getElementById("actores").textContent =
      pelicula.actores?.map(actor => actor.nombre).join(", ") || "Sin datos";
    document.getElementById("directores").textContent =
      pelicula.directores?.map(dir => dir.nombre).join(", ") || "Sin datos";
    document.getElementById("generos").textContent =
      pelicula.generos?.map(g => g.nombre).join(", ") || "Sin datos";
    document.getElementById("companias").textContent =
      pelicula.companias?.map(c => c.nombre).join(", ") || "Sin datos";
    document.getElementById("idiomas").textContent =
      pelicula.idiomas?.map(i => i.nombre).join(", ") || "Sin datos";

  } catch (error) {
    console.error("Error cargando detalles:", error);
    alert("Ocurrió un error al cargar los datos de la película.");
    document.getElementById("info-container").innerHTML = "<p>Error al cargar la información de la película.</p>";
  }
}
