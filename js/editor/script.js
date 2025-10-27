
window.addEventListener("DOMContentLoaded", ()=>{

//Language selection
const langSelection = document.getElementById("langSelect");
const langLocalStorage = localStorage.getItem("lang") || "es";


langSelection.addEventListener("change", (e)=>{

  const newLang = e.target.value;
  localStorage.setItem("lang", newLang);
  console.log("Language changed to", newLang)
});

//----------Login Elements-------------//

  const loginBox   = document.getElementById("loginBox");
  const loginUser  = document.getElementById("loginUser");
  const loginPass  = document.getElementById("loginPass");
  const loginBtn   = document.getElementById("loginBtn");
  const loginMsg   = document.getElementById("loginMsg");
  const editorArea = document.querySelector(".editorArea");
  const savedUser = localStorage.getItem("authUser");

  //Ask if there is already a user in localstorage
  if (savedUser) {
    loginBox.style.display = "none";
    editorArea.classList.add("editorArea-active");
    
  }

//Login
loginBtn.addEventListener("click", async ()=>{

  try {
      const response = await fetch("access/access.json");
      const data = await response.json();

      const userEnter = loginUser.value;
      const passwordEnter = loginPass.value;

      const UserFoundJson = data.users.find(u => u.user=== userEnter && u.password === passwordEnter);

      if (UserFoundJson) {
        localStorage.setItem("authUser", JSON.stringify({ user: userEnter, ts: Date.now() }));
        const history = JSON.parse(localStorage.getItem("loginHistory") || "[]");
        history.unshift({ user: userEnter, ts: Date.now() });
        localStorage.setItem("loginHistory", JSON.stringify(history));
        renderHistory();
        editorArea.classList.add("editorArea-active");
        loginBox.style.display="none";
        alert("Access success")
      } 
      else {
        alert("Invalid user name or password")
      }
      
  } catch (error) {
    console.error("Error loading access.json", error);
      loginMsg.textContent = "Error loading access.json";
    
  }
})

//Logout

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", ()=>{
  alert("Logout Successful")
  localStorage.removeItem("authUser")
  editorArea.classList.remove("editorArea-active");
  loginBox.style.display="block";

});


  // ======== Mostrar historial de accesos ========
  const historyBody = document.getElementById("loginHistoryBody");

  function renderHistory() {
    // lee el array de historial (si no existe, array vacío)
    const history = JSON.parse(localStorage.getItem("loginHistory") || "[]");

    if (history.length === 0) {
      historyBody.innerHTML = `
        <tr><td colspan="3" style="padding:8px;color:#666;">Sin accesos registrados aún.</td></tr>`;
      return;
    }

    historyBody.innerHTML = history
      .map((item, index) => {
        const date = new Date(item.ts).toLocaleString("es-ES");
        return `
          <tr>
            <td style="padding:6px;border-bottom:1px solid #eee;">${index + 1}</td>
            <td style="padding:6px;border-bottom:1px solid #eee;">${item.user}</td>
            <td style="padding:6px;border-bottom:1px solid #eee;">${date}</td>
          </tr>`;
      })
      .join("");
  }

  // Renderiza al cargar
  renderHistory();


});


//READ AND SAVE MD

  const openBtn = document.getElementById("openBtn");
  const saveBtn = document.getElementById("saveBtn");
  const mdArea  = document.getElementById("m-edition");
  const cancelEdition = document.querySelector(".cancel-edition");


  let fileHandle = null;

  // Estado inicial
  openBtn.disabled = false;       
  saveBtn.disabled = true;        
  mdArea.disabled  = true;        


  //READ THE FILE
  openBtn.addEventListener("click", async ()=>{

  try {
    
    const [handle] = await window.showOpenFilePicker({
      types: [{ description: "Markdown", accept: { "text/markdown": [".md"] } }],
        excludeAcceptAllOption: false,
        multiple: false
      
    });

      fileHandle = handle;

      const file = await handle.getFile();
      const getTextMD = await file.text();

       openBtn.disabled = false;       
        saveBtn.disabled = false; 
          cancelEdition.classList.add("btn-visible");

        mdArea.value =getTextMD;       
        mdArea.disabled  = false; 
      alert("Picked succesfully")
    
  } catch (error) {
    console.error(error);
      alert("Error opening file");
    
  }


});

//SAVE THE FILE::

saveBtn.addEventListener("click", async () => {
  if (!fileHandle) {
    alert("Open a .md file first");
    return;
  }
  try {
    const writable = await fileHandle.createWritable();
    await writable.write(mdArea.value);
    alert("File saved successfully");

  openBtn.disabled = false;       
  saveBtn.disabled = true;        
  mdArea.disabled  = true; 
  cancelEdition.classList.remove("btn-visible");

    await writable.close();
    
  } catch (error) {
    console.error("Error saving file:", error);
    alert("Error saving file");
  }
});


//Cancel saving


cancelEdition.addEventListener("click", ()=>{
  mdArea.value ="";
  mdArea.disabled  = true; 
  cancelEdition.classList.remove("btn-visible");

});



// Showing the responses from the formular
document.addEventListener("DOMContentLoaded", () => {
  const responsesBody = document.getElementById("formResponsesBody");
  if (!responsesBody) return;

  function renderFormResponses() {
    const rows = JSON.parse(localStorage.getItem("formResponses") || "[]");

    if (rows.length === 0) {
      responsesBody.innerHTML = `<tr><td colspan="7" style="padding:8px;color:#666;">Sin respuestas registradas.</td></tr>`;
      return;
    }

    responsesBody.innerHTML = rows.map((r, i) => {
      const date = new Date(r.ts).toLocaleString();
      const replyBtn = r.email
        ? `<a href="mailto:${encodeURIComponent(r.email)}" 
              style="display:inline-block;padding:4px 8px;margin-top:4px;border:2px solid #ccc;
                     border-radius:6px;text-decoration:none;font-size:0.9em;">
              📩
           </a>`
        : "-";

      return `
        <tr>
          <td style="padding:6px;border-bottom:1px solid #eee;">${i + 1}</td>
          <td style="padding:6px;border-bottom:1px solid #eee;">${r.nombre || "-"}</td>
          <td style="padding:6px;border-bottom:1px solid #eee;">${r.telefono || "-"}</td>
          <td style="padding:6px;border-bottom:1px solid #eee;">${r.direccion || "-"}</td>
          <td style="padding:6px;border-bottom:1px solid #eee;">
            ${r.email || "-"}<br>${replyBtn}
          </td>
          <td style="padding:6px;border-bottom:1px solid #eee;white-space:pre-wrap;">${r.mensaje || "-"}</td>
          <td style="padding:6px;border-bottom:1px solid #eee;">${date}</td>
        </tr>`;
    }).join("");
  }

  renderFormResponses();
});
