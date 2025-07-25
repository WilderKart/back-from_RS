const API_URL = "http://localhost:3000/api/peliculas";

// Obtener el ID de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function cargarDetalle() {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const pelicula = await res.json();

    // Crear contenedor responsivo para el iframe (video-wrapper)
    const wrapper = document.createElement("div");
    wrapper.className = "video-wrapper";

    // Crear iframe del tráiler
    const iframe = document.createElement("iframe");
    const youtubeUrl = new URL(pelicula.trailer_url);
    const videoId = youtubeUrl.searchParams.get("v");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&showinfo=0&controls=1`;
    iframe.allow = "autoplay; encrypted-media";
    iframe.allowFullscreen = true;
    iframe.frameBorder = "0";

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
  }
}

cargarDetalle();
