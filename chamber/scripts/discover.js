import { places } from "../data/discover.mjs";

const container = document.querySelector("#discover-container");
const visitMessage = document.querySelector("#visit-message");

function displayPlaces() {
    places.forEach((place, index) => {
        const card = document.createElement("article");
        card.classList.add("discover-card", `place-${index + 1}`);

        const title = document.createElement("h2");
        title.textContent = place.name;

        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = place.image;
        image.alt = place.name;
        image.width = 300;
        image.height = 200;
        image.loading = "lazy";
        figure.appendChild(image);

        const address = document.createElement("address");
        address.textContent = place.address;

        const description = document.createElement("p");
        description.textContent = place.description;

        const button = document.createElement("button");
        button.textContent = "Learn More";
        button.type = "button";
        button.addEventListener("click", () => {
            const dialog = document.createElement("dialog");
            dialog.classList.add("place-dialog");

            const title = document.createElement("h2");
            title.textContent = place.name;

            const address = document.createElement("address");
            address.textContent = place.address;

            const description = document.createElement("p");
            description.textContent = place.description;

            const closeButton = document.createElement("button");
            closeButton.textContent = "Close";
            closeButton.type = "button";
            closeButton.addEventListener("click", () => dialog.close());

            dialog.append(title, address, description, closeButton);
            document.body.appendChild(dialog);

            dialog.addEventListener("close", () => dialog.remove());
            dialog.showModal();
        });

        card.append(title, figure, address, description, button);
        container.appendChild(card);
    });
}

function displayVisitMessage() {
    const currentVisit = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = currentVisit - Number(lastVisit);
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysDifference === 1 ? "day" : "days";
            visitMessage.textContent = `You last visited ${daysDifference} ${dayText} ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentVisit);
}

displayPlaces();
displayVisitMessage();
