const year = document.querySelector("#year");
const today = new Date();
year.innerHTML = `©${today.getFullYear()} ✨ Guillermo Aguirre ✨ Piura, Perú `;

const lastdate = document.querySelector("#lastdate")
lastdate.innerHTML =`Last modification: ${new Date(document.lastModified)}`;