// Mostrar el modal de login
function mostrarLogin() {
  const modal = document.getElementById("modal-login");
  modal.style.display = "flex";
}

// Cerrar el modal de login
function cerrarLogin() {
  const modal = document.getElementById("modal-login");
  modal.style.display = "none";
}

// Captura del formulario de login
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  const errorMsg = document.getElementById("error-login");

  form.addEventListener("submit", async (e) => {
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

      // ✅ Éxito: redirige a la página del administrador
      window.location.href = "./html/admin.html";

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      errorMsg.textContent = "Error de conexión al servidor.";
    }
  });
});
