document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;

  try {
    const res = await fetch("http://localhost:3000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, contrasena })
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = "../html/admin.html";
    } else {
      document.getElementById("mensaje-error").textContent = data.mensaje || "Error en el login";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("mensaje-error").textContent = "Error en el servidor";
  }
});
