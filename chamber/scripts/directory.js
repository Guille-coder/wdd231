
document.addEventListener("DOMContentLoaded", function () {
    const membersList = document.getElementById("members-list");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");

    let membersData = [];

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) {
                throw new Error("Error fetching members data: " + response.statusText);
            }
            membersData = await response.json();
            localStorage.setItem("members", JSON.stringify(membersData)); 
            displayMembers(membersData, "grid");
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displayMembers(members, viewType) {
        if (!membersList) return;

        membersList.innerHTML = "";
        membersList.classList.remove("grid-view", "list");
        membersList.classList.add(viewType === "grid" ? "grid-view" : "list");

        members.forEach(member => {
            const memberDiv = document.createElement("div");
            memberDiv.classList.add("member", viewType);
            let memberContent = `
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
            if (viewType === "grid") {
                memberContent = `<img src="${member.image}" alt="${member.name} logo">` + memberContent;
            }
            memberDiv.innerHTML = memberContent;
            membersList.appendChild(memberDiv);
        });
    }

    function handleViewToggle(viewType) {
        const storedMembers = localStorage.getItem("members");
        const members = storedMembers ? JSON.parse(storedMembers) : membersData;
        displayMembers(members, viewType);
    }

    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener("click", () => handleViewToggle("grid"));
        listViewBtn.addEventListener("click", () => handleViewToggle("list"));
    }

    fetchMembers();
});