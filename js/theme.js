window.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const btn = document.getElementById("themeBtn");

  // Tema guardado o preferencia del sistema
  const savedTheme = localStorage.getItem("theme");
  // Aplicar tema al cargar
  body.classList.add(savedTheme);
  if (btn) btn.textContent = savedTheme === "dark" ? "🌞" : "🌙";

  // Cambiar tema al hacer clic
  btn?.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    body.classList.toggle("light", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (btn) btn.textContent = isDark ? "🌞" : "🌙";
  });
  
});
