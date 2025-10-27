# 🌐 Webprojekt — HTML · JavaScript · SASS

Dieses Projekt ist eine **modulare und dynamische Webplattform**, entwickelt mit **HTML, JavaScript und SASS**.  
Es integriert reale Funktionen wie **Internationalisierung (i18n)**, **dynamisches Laden von Markdown-Dateien**, **Login über JSON**, **anpassbare Themes**, **Versionskontrolle mit Git und GitHub** sowie **lokale Datenspeicherung**.  
Das Ziel war es, eine funktionale und skalierbare Anwendung zu erstellen, die sauberen Code, modernes Design und gute Webentwicklungspraktiken vereint.

---

## 🧭 Allgemeine Struktur

Die Anwendung ist in mehrere Abschnitte unterteilt:

- **🏠 Home:** Enthält einen animierten Hero-Bereich und ein Tab-System mit dynamischen Inhalten.  
- **💼 Services:** Zeigt interaktive Karten, die aus `.md`-Dateien geladen werden – inklusive Bildern, Preisen und detaillierten Beschreibungen.  
- **👤 About Me:** Persönlicher Bereich, der dynamisch aus mehrsprachigen Markdown-Dateien generiert wird.  
- **📝 Editor:** Ein funktionsfähiges Tool zum Öffnen, Bearbeiten und Speichern von `.md`-Dateien – mit **Login-System**, JSON-Validierung und **geschützten Bereichen**.  
- **📨 Kontakt-Aside:** Ein seitlich ausfahrendes Formular mit Animation, das Eingaben im `localStorage` speichert.  
- **💬 WhatsApp-Button:** Ein **eingebettetes SVG-Icon**, das direkt zu einem Chat mit dem Autor verlinkt.

---

## 💡 Entwicklungsstrategie

Beim Entwickeln lag der Fokus auf **Modularität, klarer Code-Struktur und flüssiger DOM-Interaktion** – ganz ohne Frameworks, mit nativem JavaScript.

### Zentrale Entwicklungsentscheidungen:
- **Asynchrone Verarbeitung (`async/await`)** zum Laden von Markdown- und JSON-Dateien.  
- **Login- und Authentifizierungssimulation** über `users.json` zur Zugangskontrolle geschützter Bereiche.  
- **Sitzungsspeicherung** mit `localStorage`, um Benutzerstatus und Historie zu erhalten.  
- **Internationalisierung (i18n)** mit *i18next* für Echtzeit-Umschaltung zwischen Spanisch und Englisch.  
- **Modulares Design mit SASS**, globale **CSS-Variablen** und **Licht-/Dunkelmodus** über JavaScript steuerbar.  
- **Dynamische DOM-Manipulation:** Inhalte werden je nach aktivem Tab geladen und aktualisiert.  
- **SVG inline** für barrierefreie, skalierbare Icons ohne externe Abhängigkeiten.  
- **Versionskontrolle mit Git und GitHub**, inklusive Deployment über **GitHub Pages**.  
- **UX & Barrierefreiheit:** semantische Struktur, kontrastreiche Farben, weiche CSS-Übergänge.

---

## ⚙️ Verwendete Technologien

| Kategorie | Technologie | Zweck |
|------------|-------------|--------|
| **Grundlagen** | HTML5, JavaScript (ES6+), SASS | Struktur, Logik und Styling |
| **Internationalisierung** | i18next | Dynamische Übersetzung (ES/EN) |
| **Datenquellen** | Markdown (`.md`), JSON (`users.json`) | Inhalte und Benutzerverwaltung |
| **Lokale Speicherung** | localStorage | Sitzungs- und Formularpersistenz |
| **Responsive Design** | SASS + CSS-Variablen + Transitions | Themenwechsel & Animationen |
| **Grafiken** | SVG inline | Skalierbare Icons |
| **Asynchronität** | async/await + fetch | Datenladen ohne Seitenreload |
| **Versionskontrolle** | Git + GitHub | Historie, Zusammenarbeit & Hosting (GitHub Pages) |

---

## 🚀 Lernprozess & Zielsetzung

Das Projekt wurde mit dem Ziel entwickelt, **den realen Entwicklungsprozess im Frontend zu verstehen und umzusetzen**.  
Es vereint Design, Logik und Inhalt in einer einzigen Anwendung und legt Wert auf sauberen, nachvollziehbaren Code.

### Zentrale Lernergebnisse:
- Verständnis des DOM-Workflows ohne Frameworks.  
- Implementierung von i18n und Markdown-Inhalten.  
- Simulation eines Backends über lokale Dateien (`.md`, `.json`).  
- Gestaltung einer konsistenten Benutzeroberfläche mit Theme-Optionen.  
- Nutzung von **Git und GitHub** für Versionierung, Rückverfolgung und Veröffentlichung.  
- Erstellung wiederverwendbarer und persistenter Komponenten.

Das Endergebnis ist eine **zweisprachige, zugängliche und modular aufgebaute Anwendung** mit sauberer Architektur, die sich leicht auf professionelle Projekte übertragen lässt.

---

## 📁 Projektstruktur


/assets
├── hero.png
├── icons/
└── services/
/js
├── i18n/
├── editor/
├── home/
└── theme.js
/styles
├── scss/style.scss (_aside, _home, _editor)
└── css/style.css
/access
├── access.json
datos.es.md
datos.en.md
editor.html
home.html


---

© 2025 · Bildungsprojekt entwickelt von **Matías**