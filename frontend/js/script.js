// URL del backend (ajústala si cambiaste el puerto o la ruta)
const API_URL = "http://localhost:3000/api/peliculas";

async function cargarPeliculas() {
  try {
    const respuesta = await fetch(API_URL);
    const peliculas = await respuesta.json();
    const contenedor = document.getElementById("contenedor-peliculas");

    peliculas.forEach(pelicula => {
      const div = document.createElement("div");
      div.classList.add("movie-card");

      div.innerHTML = `
        <div class="movie-poster">
          <img src="${pelicula.imagen_portada}" alt="${pelicula.titulo_espanol}">
          <div class="card-overlay">

          <a href="html/detalle.html?id=${pelicula.id}" class="play-trailer">
        <i class="fas fa-play"></i> Ver Tráiler
      </a>

          </div>
        </div>

        <div class="card-info">
          <h3>${pelicula.titulo_espanol}</h3>
         
          
          <div class="movie-meta">
             <p><strong>Duración:</strong> ${pelicula.duracion} min</p>

            <span>${pelicula.ano_estreno}</span>
            <span class="rating">${pelicula.calificacion}/10</span>
          </div>
        </div>
      `;

      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error("Error cargando películas:", error);
  }
}

cargarPeliculas();
