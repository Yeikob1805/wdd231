
const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        membersContainer.textContent = "Unable to load the business directory.";
        console.error(error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website.replace("https://", "")}</a>
            <span class="member-level">${getMembershipLevel(member.membershipLevel)}</span>
        `;

        membersContainer.appendChild(card);
    });
}

function getMembershipLevel(level) {
    const levels = {
        1: "Member",
        2: "Silver Member",
        3: "Gold Member"
    };

    return levels[level] || "Member";
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("members-grid");
    membersContainer.classList.remove("members-list");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("members-list");
    membersContainer.classList.remove("members-grid");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
});

getMembers();
