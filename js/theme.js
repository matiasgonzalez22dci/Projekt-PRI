window.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const btn = document.getElementById("themeBtn");
  const channel = new BroadcastChannel("theme_channel");

  // Cargar tema guardado o del sistema
  const saved = localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  body.classList.add(saved);

  if (btn) btn.textContent = saved === "dark" ? "☀️ Light" : "🌙 Dark";

  // 🔹 Al hacer clic, cambiar tema y avisar al resto
  btn?.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    body.classList.toggle("light", !isDark);
    const theme = isDark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    if (btn) btn.textContent = isDark ? "☀️ Light" : "🌙 Dark";

    // 👉 avisar a otras pestañas
    channel.postMessage({ theme });
  });

  // 🔹 Escuchar cambios desde otras páginas
  channel.onmessage = (e) => {
    const theme = e.data.theme;
    if (!theme) return;
    body.classList.remove("light", "dark");
    body.classList.add(theme);
    localStorage.setItem("theme", theme);
    if (btn) btn.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
  };
});
