const API_URL = "http://localhost:3000/api/peliculas";
const TRAILER_ID = 50;

// Mostrar modal login
function mostrarLogin() {
  const modal = document.getElementById("modal-login");
  modal.style.display = "flex";
}

// Cerrar modal
function cerrarLogin() {
  const modal = document.getElementById("modal-login");
  modal.style.display = "none";
}

// Login administrador
document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");
  const errorMsg = document.getElementById("error-login");

  formLogin?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ usuario, contrasena: password })
      });

      const data = await res.json();

      if (!res.ok) {
        errorMsg.textContent = data.error || "Credenciales inválidas.";
        return;
      }

      window.location.href = "./html/admin.html";

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      errorMsg.textContent = "Error de conexión al servidor.";
    }
  });

  // Búsqueda de películas
  const formBusqueda = document.getElementById("form-busqueda");
  formBusqueda?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const consulta = document.getElementById("campo-busqueda").value.trim();
    if (!consulta) return;

    try {
      const res = await fetch(`${API_URL}/buscar?query=${encodeURIComponent(consulta)}`);
      const resultados = await res.json();

      const contenedor = document.getElementById("resultados-busqueda");
      contenedor.innerHTML = "";

      if (resultados.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
      }

      resultados.forEach(pelicula => {
        const div = document.createElement("div");
        div.classList.add("movie-card");
        div.innerHTML = `
          <img src="${pelicula.imagen_portada}" alt="${pelicula.titulo_espanol}">
          <h3>${pelicula.titulo_espanol}</h3>
          <p><strong>Duración:</strong> ${pelicula.duracion} min</p>
          <p><strong>Sinopsis:</strong> ${pelicula.sinopsis}</p>
        `;
        contenedor.appendChild(div);
      });

    } catch (err) {
      console.error("Error en la búsqueda:", err);
    }
  });

  // Cargar tráiler principal (Titanes del Pacífico)
  cargarTrailerPrincipal();
});

async function cargarTrailerPrincipal() {
  try {
    const res = await fetch(`${API_URL}/${TRAILER_ID}`);
    const pelicula = await res.json();
    const trailerUrl = new URL(pelicula.trailer_url);
    const videoId = trailerUrl.searchParams.get("v");

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&controls=1`;
    iframe.className = "trailer-video";
    iframe.allow = "autoplay; encrypted-media";
    iframe.allowFullscreen = true;

    document.getElementById("trailer-container").appendChild(iframe);
  } catch (error) {
    console.error("Error al cargar el tráiler:", error);
  }
}
