// document.addEventListener("DOMContentLoaded", () => {
//     const membersContainer = document.getElementById("members");
//     const toggleButton = document.getElementById("toggleView");

//     async function fetchMembers() {
//         try {
//             const response = await fetch("data/members.json");
//             const members = await response.json();
//             displayMembers(members);
//         } catch (error) {
//             console.error("Error fetching json members:", error);
//         }
//     }

//     function displayMembers(members) {
//         membersContainer.innerHTML = "";
//         members.forEach(member => {
//             const card = document.createElement("div");
//             card.classList.add("member-card");
//             card.innerHTML = `
                
//                 <img src="images/${member.image}" alt="${member.name}">
//                 <h3>${member.name}</h3>
//                 <p>${member.address}</p>
//                 <p>${member.phone}</p>
//                 <a href="${member.website}" target="_blank">Visit Website</a>
                
//             `;
//             membersContainer.appendChild(card);
//         });
//     }

//     toggleButton.addEventListener("click", () => {
//         document.body.classList.toggle("list-view");
//     });


//     fetchMembers();
// })
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
            const data = await response.json();
            membersData = data;
            localStorage.setItem("members", JSON.stringify(data)); 
            displayMembers(data, "grid"); 
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displayMembers(members, viewType) {
        membersList.innerHTML = "";
        members.forEach(member => {
            const memberDiv = document.createElement("div");
            memberDiv.classList.add("member", viewType);

            memberDiv.innerHTML = `
              <img src="${member.image}" alt="${member.name} logo">
              <h3>${member.name}</h3>
              <p>${member.address}</p>
              <p>${member.phone}</p>
              <a href="${member.website}" target="_blank">Visit Website</a>
          `;
            membersList.appendChild(memberDiv);
        });
    }

    function handleViewToggle(viewType) {
        const storedMembers = localStorage.getItem("members");
        const members = storedMembers ? JSON.parse(storedMembers) : membersData;
        displayMembers(members, viewType);
    }

    gridViewBtn.addEventListener("click", () => handleViewToggle("grid"));
    listViewBtn.addEventListener("click", () => handleViewToggle("list"));

    fetchMembers();
});
    

