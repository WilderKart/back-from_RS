const app = require("./app");

const PORT = process.env.PORT || 3000;

// Iniciar servidor con manejo de errores
const server = app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
});

// Manejo de errores en el inicio del servidor
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Error: El puerto ${PORT} ya está en uso.`);
  } else {
    console.error("❌ Error inesperado:", error.message);
  }
});