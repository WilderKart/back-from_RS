const express = require("express");
const router = express.Router();
const db = require("../models");

// Ruta para iniciar sesión como administrador
router.post("/login", async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    // Consulta segura con replacements (evita inyección SQL)
    const admin = await db.sequelize.query(
      `SELECT * FROM administradores WHERE usuario = :usuario AND contrasena = :contrasena`,
      {
        replacements: { usuario, contrasena },
        type: db.Sequelize.QueryTypes.SELECT,
      }
    );

    // Si no se encuentra el administrador
    if (!admin || admin.length === 0) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    // Éxito
    res.status(200).json({ mensaje: "Acceso autorizado" });

  } catch (error) {
    console.error("Error al validar administrador:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
