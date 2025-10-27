// ./js/i18n/home.js
// Mismo estilo que editor: i18next + init asíncrono + translateUI()
import i18next from 'https://unpkg.com/i18next@latest/dist/esm/i18next.js';

const resources = {
  es: {
    translation: {
      hero: {
        title: "Bienvenido/a",
        desc: "Explora los servicios y hagamos realidad tu próximo proyecto digital"
      },
      menu: { about: "Sobre mí", form: "Servicios", viewer: "Visor" },
      about: { title: "Sobre mí", load: "Cargar" },
      services: { title: "Servicios", cta: "Ver más" },
      viewer: { title: "Visor", load: "Cargar" },
      formBtn: "💬 Contáctame",
      form: {
        title: "Formulario",
        name: "Nombre",
        phone: "Teléfono",
        address: "Dirección",
        email: "Email",
        message: "Mensaje",
        submit: "Enviar",
        preview: "Vista previa"
      }
    }
  },
  en: {
    translation: {
      hero: {
        title: "Welcome to my Page",
        desc: "Explore the services and letś make real your next digital project."
      },
      menu: { about: "About Me", form: "Services", viewer: "Viewer" },
      about: { title: "About Me", load: "Load" },
      services: { title: "Services", cta: "See more" },
      viewer: { title: "Viewer", load: "Load" },
      formBtn: "💬 Contact me",
      form: {
        title: "Form",
        name: "Name",
        phone: "Phone",
        address: "Address",
        email: "Email",
        message: "Message",
        submit: "Send",
        preview: "Preview"
      }
    }
  }
};


const savedLang = localStorage.getItem("lang") ||
  (navigator.language?.startsWith("es") ? "es" : "en");

(async () => {
  await i18next.init({
    lng: savedLang,
    debug: true,
    resources
  });

  // --- referencias de UI ---
  const langSelect   = document.getElementById("langSelect");

  // tabs (header)
  const btnAbout     = document.getElementById("about");
  const btnForm      = document.getElementById("form");      // "Servicios"
  const btnViewer    = document.getElementById("services");  // "Viewer"

  // about / viewer secciones
  const aboutTitle   = document.querySelector('.about-section [data-i18n="about.title"]');
  const aboutLoad    = document.querySelector('.about-section [data-i18n="about.load"]');
  const viewerTitle  = document.querySelector('.viewer-section [data-i18n="viewer.title"]');
  const viewerLoad   = document.querySelector('.viewer-section [data-i18n="viewer.load"]');

  // servicios (cards)
  const servicesTitle = document.querySelector('.services-section [data-i18n="services.title"]');
  const servicesCtas  = document.querySelectorAll('.services-section [data-i18n="services.cta"]');

  // aside form (siempre disponible)
  const formTitle   = document.querySelector('.form-section [data-i18n="form.title"]');
  const lblName     = document.querySelector('.form-section [data-i18n="form.name"]');
  const lblPhone    = document.querySelector('.form-section [data-i18n="form.phone"]');
  const lblAddress  = document.querySelector('.form-section [data-i18n="form.address"]');
  const lblEmail    = document.querySelector('.form-section [data-i18n="form.email"]');
  const lblMessage  = document.querySelector('.form-section [data-i18n="form.message"]');
  const btnSubmit   = document.querySelector('.form-section [data-i18n="form.submit"]');

  // inputs para placeholders
  const formBtn     = document.getElementById("icon-formular");
  const inName      = document.getElementById("f-nombre");
  const inPhone     = document.getElementById("f-telefono");
  const inAddress   = document.getElementById("f-direccion");
  const inEmail     = document.getElementById("f-email");
  const inMessage   = document.getElementById("message");


  // hero
  const heroTitle = document.querySelector('[data-i18n="hero.title"]');
  const heroDesc  = document.querySelector('[data-i18n="hero.desc"]');

  function translateUI() {
    // menú (tabs)
    if (btnAbout)  btnAbout.textContent  = i18next.t('menu.about');
    if (btnForm)   btnForm.textContent   = i18next.t('menu.form');
    if (btnViewer) btnViewer.textContent = i18next.t('menu.viewer');

    // about (visor principal)
    if (aboutTitle) aboutTitle.textContent = i18next.t('about.title');
    if (aboutLoad)  aboutLoad.textContent  = i18next.t('about.load');

    // viewer (visor secundario)
    if (viewerTitle) viewerTitle.textContent = i18next.t('viewer.title');
    if (viewerLoad)  viewerLoad.textContent  = i18next.t('viewer.load');

    // servicios
    if (servicesTitle) servicesTitle.textContent = i18next.t('services.title');
    servicesCtas.forEach(el => el.textContent = i18next.t('services.cta'));

    // aside form labels
    if (formBtn)  formBtn.textContent  = i18next.t('formBtn');
    if (formTitle)  formTitle.textContent  = i18next.t('form.title');
    if (lblName)    lblName.textContent    = i18next.t('form.name');
    if (lblPhone)   lblPhone.textContent   = i18next.t('form.phone');
    if (lblAddress) lblAddress.textContent = i18next.t('form.address');
    if (lblEmail)   lblEmail.textContent   = i18next.t('form.email');
    if (lblMessage) lblMessage.textContent = i18next.t('form.message');
    if (btnSubmit)  btnSubmit.textContent  = i18next.t('form.submit');

    // placeholders
    if (inName)    inName.placeholder    = '...';
    if (inPhone)   inPhone.placeholder   = '...';
    if (inAddress) inAddress.placeholder = '...';
    if (inEmail)   inEmail.placeholder   = '...';
    if (inMessage) inMessage.placeholder = '...';

    // hero
    if (heroTitle) heroTitle.textContent = i18next.t('hero.title');
    if (heroDesc)  heroDesc.textContent  = i18next.t('hero.desc');

  }

  // aplicar al cargar
  translateUI();

  // selector de idioma
  if (langSelect) {
    langSelect.value = i18next.language || 'es';
    langSelect.addEventListener("change", () => {
      const lang = langSelect.value;
      i18next.changeLanguage(lang);
      localStorage.setItem("lang", lang);
      translateUI();
      // mantiene compatibilidad con tu otro código
      document.dispatchEvent(new CustomEvent("lang:change", { detail: { lang } }));
    });
  }
})();
