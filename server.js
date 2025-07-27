// server.js 
const app = require("./app");

const PORT = process.env.PORT || 3000;

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
});

// Manejo de errores del servidor
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Error: El puerto ${PORT} ya está en uso.`);
  } else {
    console.error("❌ Error inesperado:", error.message);
  }
});

