document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members");
    const toggleButton = document.getElementById("toggleView");

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error fetching json members:", error);
        }
    }

    function displayMembers(members) {
        membersContainer.innerHTML = "";
        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");
            card.innerHTML = `
                
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                
            `;
            membersContainer.appendChild(card);
        });
    }

    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("list-view");
    });


    fetchMembers();
});
    

