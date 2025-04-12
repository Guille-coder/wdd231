


document.addEventListener("DOMContentLoaded", function() {
    const year = document.querySelector("#year");
const today = new Date();
year.innerHTML = `©${today.getFullYear()} ✨ Guillermo Aguirre ✨ Piura, Perú `;

const lastdate = document.querySelector("#lastdate")
lastdate.innerHTML =`Last modification: ${new Date(document.lastModified)}`;

    const lastVisitMessage = document.getElementById("last-visit-message");
    if (lastVisitMessage) {
        const lastVisit = localStorage.getItem("lastVisit");
        const now = Date.now();

        if (!lastVisit) {
            lastVisitMessage.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const timeDifference = now - parseInt(lastVisit, 10);
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            if (daysDifference < 1) {
                lastVisitMessage.textContent = "Back so soon! Awesome!";
            } else {
                const dayWord = daysDifference === 1 ? "day" : "days";
                lastVisitMessage.textContent = `You last visited ${daysDifference} ${dayWord} ago.`;
            }
        }

        // store current timestamp for future visits
        localStorage.setItem("lastVisit", now);
    }
});