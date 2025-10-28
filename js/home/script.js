// ---------- Funcionalidades generales de Home ----------
window.addEventListener("DOMContentLoaded", () => {
  const aboutBtn        = document.querySelector("#about");     // "Sobre mí" (renderiza visor)
  const aboutSection    = document.querySelector(".about-section");
  const servicesTabBtn  = document.querySelector("#form");       // renombrado a "Servicios"
  const servicesSection = document.querySelector(".services-section"); // ahora cards
  const viewerBtn       = document.querySelector("#services");   // botón "Viewer" (tercera pestaña)
  const viewerSection   = document.querySelector(".viewer-section"); // sección dedicada a viewer (simple)
  const openFormular    = document.querySelector("#icon-formular");
  const asideContainer  = document.querySelector(".aside-container");

  // ---- Mostrar "Sobre mí" (visor principal) por defecto ----
  aboutSection.style.display    = "block";
  servicesSection.style.display = "none";
  viewerSection.style.display   = "none";
  [aboutBtn, servicesTabBtn, viewerBtn].forEach(b => b.classList.remove("active"));
  aboutBtn.classList.add("active");

  // Helper para marcar tab activo
  function setActive(btn) {
    [aboutBtn, servicesTabBtn, viewerBtn].forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  // ---- Tabs ----
  // ABOUT => muestra visor principal
  aboutBtn.addEventListener("click", () => {
    setActive(aboutBtn);
    aboutSection.style.display    = "block";
    servicesSection.style.display = "none";
    viewerSection.style.display   = "none";
  });

  // SERVICIOS => cards
  servicesTabBtn.addEventListener("click", () => {
    setActive(servicesTabBtn);
    aboutSection.style.display    = "none";
    servicesSection.style.display = "block";
    viewerSection.style.display   = "none";
  });

  // VIEWER => visor secundario (simple)
  viewerBtn.addEventListener("click", () => {
    setActive(viewerBtn);
    aboutSection.style.display    = "none";
    servicesSection.style.display = "none";
    viewerSection.style.display   = "block";
  });

  // ---------- Aside toggle  ----------
  openFormular.addEventListener("click", ()=> {
    const active = asideContainer.classList.toggle("active");
    openFormular.setAttribute("aria-expanded", String(active));
  });

  // ---------- Visor (reutilizable) ----------
  function initViewer(containerSelector) {
    const btn = document.querySelector(`${containerSelector} #vw-reload`);
    const out = document.querySelector(`${containerSelector} #vw-output`);
    if (!btn || !out) return;

    async function load() {
      const lang =
        window.currentLang ||
        localStorage.getItem("lang") ||
        (navigator.language?.startsWith("es") ? "es" : "en");

      const file = lang === "es" ? "datos.es.md" : "datos.en.md";

      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const text = await res.text();

        const get = re => (text.match(re)?.[1]?.trim() || "—");
        const name        = get(/name:\s*(.*)/i);
        const phone       = get(/phone:\s*(.*)/i);
        const address     = get(/address:\s*(.*)/i);
        const description = get(/description:\s*(.*)/i);

        out.textContent = ` ${name}, ${phone}, ${address}, ${description}.`;
      } catch (e) {
        console.error(e);
        out.textContent = "❌ Error al cargar.";
      }
    }

    btn.addEventListener("click", load);
    document.addEventListener("lang:change", load);
    load();
  }

  // Inicializa visor en ABOUT (principal) y en VIEWER (secundario)
  initViewer(".about-section");
  initViewer(".viewer-section");

  // --------------- Envío del formulario del ASIDE ---------------
  const sendBtn = document.getElementById("f-enviar");
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const data = {
        name:    document.getElementById("f-nombre").value.trim(),
        phone:  document.getElementById("f-telefono").value.trim(),
        email:     document.getElementById("f-email").value.trim(),
        address: document.getElementById("f-direccion").value.trim(),
        message:   document.getElementById("message").value.trim(),
        ts:        new Date().toISOString()
      };

      const arr = JSON.parse(localStorage.getItem("formResponses") || "[]");
      arr.unshift(data); 
      localStorage.setItem("formResponses", JSON.stringify(arr));

      alert("Formulario enviado ✔️");

      setTimeout(() => {
        if (asideContainer) asideContainer.classList.remove("active");
      }, 500);
    });
  }
});


// ---------- FOOTER dinámico ----------
function loadFooterData() {
  const lang =
    localStorage.getItem("lang") || "es";

  const file = lang === "es" ? "datos.es.md" : "datos.en.md";

  const nameEl = document.getElementById("footer-name");
  const phoneEl = document.getElementById("footer-phone");
  const addressEl = document.getElementById("footer-address");
  const emailEl = document.getElementById("footer-email");

  if (!nameEl || !phoneEl) return;

  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(text => {
      const get = re => (text.match(re)?.[1]?.trim() || "—");
      nameEl.textContent = get(/name:\s*(.*)/i);
      phoneEl.textContent = get(/phone:\s*(.*)/i);
      addressEl.textContent = get(/address:\s*(.*)/i);
      emailEl.textContent = get(/email:\s*(.*)/i);
    })
    .catch(e => {
      console.error(e);
      nameEl.textContent = "❌ Error al cargar datos";
    });
}
loadFooterData();
document.addEventListener("lang:change", loadFooterData);



// ---------- SERVICES dinámicos con imágenes + modal ----------
let cachedServices = []; // para el modal

function loadServices() {
  const lang =
    localStorage.getItem("lang") || "es";
  const file = lang === "es" ? "datos.es.md" : "datos.en.md";
  const container = document.getElementById("servicesContainer");
  if (!container) return;

  fetch(file)
    .then(res => res.text())
    .then(text => {
      const section = text.split("# Services")[1];
      if (!section) {
        container.innerHTML = "<p>— No hay servicios —</p>";
        cachedServices = [];
        return;
      }

      // Parse MD 
      const services = [];
      let current = null;

      const lines = section.split("\n");
      for (let raw of lines) {
        const line = raw.replace(/\r/g, "");
        if (line.trim().startsWith("- title:")) {
          if (current) services.push(current);
          current = { title: line.split(":")[1].trim() };
        } else if (current && line.includes(":")) {
          const idx = line.indexOf(":");
          const key = line.slice(0, idx).trim();
          const value = line.slice(idx + 1).trim();
          if (key && value) current[key] = value;
        }
      }
      if (current) services.push(current);

      cachedServices = services;

      container.innerHTML = services
        .map((s, i) => {
          const hasImg = s.img && s.img.length > 0;
          return `
            <article class="card" data-index="${i}">
              ${hasImg ? `<img class="card__img" src="${s.img}" alt="${s.title}">` : `<div class="card__img"></div>`}
              <div class="card__body">
                <h3 class="card__title">${s.title}</h3>
                <p class="card__desc">${s.desc || ""}</p>
                <button class="card__btn" data-role="open-service" data-index="${i}">
                  ${s.cta || (lang === "en" ? "See more" : "Ver más")}
                </button>
              </div>
            </article>
          `;
        })
        .join("");
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>❌ Error al cargar servicios.</p>";
      cachedServices = [];
    });
}

// Delegado de clicks para abrir modal
document.addEventListener("click", (e) => {
  const btn = e.target.closest('button[data-role="open-service"]');
  if (!btn) return;
  const index = Number(btn.getAttribute("data-index"));
  const s = cachedServices[index];
  if (s) openServiceModal(s);
});

// Modal helpers
function openServiceModal(service) {
  const modal = document.getElementById("serviceModal");
  if (!modal) return;

  const img  = document.getElementById("serviceModalImg");
  const t    = document.getElementById("serviceModalTitle");
  const d    = document.getElementById("serviceModalDesc");
  const pz   = document.getElementById("serviceModalPrice");     
  const det  = document.getElementById("serviceModalDetails");

  t.textContent   = service.title || "";
  d.textContent   = service.desc || "";
  det.textContent = service.details || "";

    if (service.price) {
    pz.textContent = service.price;
    pz.style.display = "block";
  } else {
    pz.textContent = "";
    pz.style.display = "none";
  }

  if (service.img) {
    img.src = service.img;
    img.alt = service.title || "service";
    img.style.display = "block";
  } else {
    img.removeAttribute("src");
    img.style.display = "none";
  }

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // evita scroll de fondo
}

function closeServiceModal() {
  const modal = document.getElementById("serviceModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Cerrar modal: botón, fondo y ESC
document.addEventListener("click", (e) => {
  if (e.target.matches(".modal__close")) closeServiceModal();
  const modal = document.getElementById("serviceModal");
  if (modal && e.target === modal) closeServiceModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeServiceModal();
});

// Recargas
loadServices();
document.addEventListener("lang:change", () => {
  closeServiceModal();
  loadServices();
});


// ---------- ABOUT dinámico ----------
function loadAbout() {
  const lang =
    localStorage.getItem("lang") || "es";
  const file = lang === "es" ? "datos.es.md" : "datos.en.md";
  const container = document.getElementById("aboutContent");
  if (!container) return;

  fetch(file)
    .then(res => res.text())
    .then(text => {
      const section = text.split("# About Me")[1];
      if (!section) {
        container.innerHTML = "<p>— No hay información disponible —</p>";
        return;
      }

      const get = re => (section.match(re)?.[1]?.trim() || "—");
  

      const name = get(/name:\s*(.*)/i);
      const role = get(/role:\s*(.*)/i);
      const stack = get(/stack:\s*(.*)/i);
      const funfact = get(/funfact:\s*(.*)/i);
      const experience = get(/experience:\s*(.*)/i);
      const quote = get(/quote:\s*(.*)/i);

      container.innerHTML = `
        <p class="about-name">${name}</p>
        <p class="about-role">${role}</p>
        <p class="about-stack"><strong>Stack:</strong> ${stack}</p>
        <p class="about-experience">${experience}</p>
        <p class="about-funfact"><strong>Fun fact:</strong> ${funfact}</p>
        <p class="about-quote">“${quote}”</p>
      `;
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>❌ Error al cargar información.</p>";
    });
}
// Carga dinámica del About
loadAbout();
document.addEventListener("lang:change", loadAbout);
