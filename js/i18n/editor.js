// ./js/i18n/editor.js
import i18next from 'https://unpkg.com/i18next@latest/dist/esm/i18next.js';

const resources = {
  es: {
    translation: {
      // Nav + labels
      nav: { home: "Inicio", editor: "Editor", audit: "Historial", responses: "Respuestas" },
      langLabel: "Idioma",

      // Editor
      open: "Abrir archivo datos.es.md",
      save: "Guardar",
      editLabel: "Edita aquí tu contenido:",
      title: "✏️ Edición: datos.es.md",
      opened: "✅ Archivo abierto correctamente",
      saved: "✅ Archivo guardado con éxito",
      openError: "❌ Error al abrir el archivo",
      saveError: "❌ Error al guardar el archivo",

      // Secciones
      audit: { title: "Historial de accesos" },
      responses: { title: "Respuestas de formulario" },

      // Login + tema
      accessTitle: "Acceso",
      loginUser: "Usuario",
      loginPass: "Contraseña",
      loginBtn: "Entrar",
      logout: "Cerrar sesión",
      theme: "Cambiar tema",

      // Tablas (thead)
      th: {
        idx: "#",
        user: "Usuario",
        datetime: "Fecha / hora",
        name: "Nombre",
        phone: "Teléfono",
        address: "Dirección",
        email: "Correo",
        message: "Mensaje",
        date: "Fecha"
      },

      // Otros
      cancel: "Cancelar Edición"
    }
  },
  en: {
    translation: {
      // Nav + labels
      nav: { home: "Home", editor: "Editor", audit: "History", responses: "Submissions" },
      langLabel: "Language",

      // Editor
      open: "Open datos.en.md file",
      save: "Save",
      editLabel: "Edit your content here:",
      title: "✏️ Editing: datos.en.md",
      opened: "✅ File opened successfully",
      saved: "✅ File saved successfully",
      openError: "❌ Error opening file",
      saveError: "❌ Error saving file",

      // Sections
      audit: { title: "Access history" },
      responses: { title: "Form responses" },

      // Login + theme
      accessTitle: "Access",
      loginUser: "User",
      loginPass: "Password",
      loginBtn: "Enter",
      logout: "Logout",
      theme: "Change theme",

      // Tables (thead)
      th: {
        idx: "#",
        user: "User",
        datetime: "Date / time",
        name: "Name",
        phone: "Phone",
        address: "Address",
        email: "Email",
        message: "Message",
        date: "Date"
      },

      // Others
      cancel: "Cancel Editing"
    }
  }
};

const savedLang = localStorage.getItem("lang") || "es";

await i18next.init({
  lng: savedLang,
  debug: true,
  resources
});

// 🔗 Referencias de UI
const langSelect      = document.getElementById("langSelect");
const langSelectLabel = document.getElementById("langSelectLabel");

const titleEl     = document.getElementById("title");
const openBtn     = document.getElementById("openBtn");
const saveBtn     = document.getElementById("saveBtn");
const editLabel   = document.getElementById("title-editor");
const cancelBtn   = document.querySelector(".cancel-edition");

const accessTitle = document.getElementById("accessTitle");
const loginUser   = document.getElementById("loginUser");
const loginPass   = document.getElementById("loginPass");
const loginBtn    = document.getElementById("loginBtn");
const logoutBtn   = document.getElementById("logoutBtn");
const themeBtn    = document.getElementById("themeBtn");

// Nav
const navHome      = document.getElementById("navHome");
const navEditor    = document.getElementById("navEditor");
const navAudit     = document.getElementById("navAudit");
const navResponses = document.getElementById("navResponses");

// Títulos de secciones
const auditTitle     = document.getElementById("auditTitle");
const responsesTitle = document.getElementById("responsesTitle");

// 🈺 Aplicar traducciones
function translateUI() {
  // Label del selector de idioma
  if (langSelectLabel) langSelectLabel.textContent = i18next.t('langLabel');

  // Nav
  if (navHome)      navHome.textContent      = i18next.t('nav.home');
  if (navEditor)    navEditor.textContent    = i18next.t('nav.editor');
  if (navAudit)     navAudit.textContent     = i18next.t('nav.audit');
  if (navResponses) navResponses.textContent = i18next.t('nav.responses');

  // Editor
  if (titleEl)   titleEl.textContent   = i18next.t('title');
  if (openBtn)   openBtn.textContent   = i18next.t('open');
  if (saveBtn)   saveBtn.textContent   = i18next.t('save');
  if (editLabel) editLabel.textContent = i18next.t('editLabel');
  if (cancelBtn) cancelBtn.textContent = i18next.t('cancel');

  // Secciones
  if (auditTitle)     auditTitle.textContent     = i18next.t('audit.title');
  if (responsesTitle) responsesTitle.textContent = i18next.t('responses.title');

  // Login + tema
  if (accessTitle) accessTitle.textContent = i18next.t('accessTitle');
  if (loginUser)   loginUser.placeholder   = i18next.t('loginUser');
  if (loginPass)   loginPass.placeholder   = i18next.t('loginPass');
  if (loginBtn)    loginBtn.textContent    = i18next.t('loginBtn');
  if (logoutBtn)   logoutBtn.textContent   = i18next.t('logout');
  if (themeBtn)    themeBtn.textContent    = i18next.t('theme');

  // Tablas: encabezados
  const auditThs = document.querySelectorAll("#loginHistoryTable thead th");
  if (auditThs.length >= 3) {
    auditThs[0].textContent = i18next.t('th.idx');
    auditThs[1].textContent = i18next.t('th.user');
    auditThs[2].textContent = i18next.t('th.datetime');
  }

  const respThs = document.querySelectorAll("#formResponsesTable thead th");
  if (respThs.length >= 7) {
    respThs[0].textContent = i18next.t('th.idx');
    respThs[1].textContent = i18next.t('th.name');
    respThs[2].textContent = i18next.t('th.phone');
    respThs[3].textContent = i18next.t('th.address');
    respThs[4].textContent = i18next.t('th.email');
    respThs[5].textContent = i18next.t('th.message');
    respThs[6].textContent = i18next.t('th.date');
  }
}

// 🔄 Re-render cuando cambie el idioma
i18next.on('languageChanged', translateUI);

// 🗣️ Cambiador de idioma
if (langSelect) {
  langSelect.value = i18next.language || 'es';
  langSelect.addEventListener("change", (e) => {
    const lang = e.target.value;
    i18next.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  });
}

// ▶️ Primera pasada
translateUI();
