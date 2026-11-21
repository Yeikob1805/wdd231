const params = new URLSearchParams(window.location.search);

const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const timestamp = params.get("timestamp");

document.querySelector("#firstName").textContent = firstName || "Not provided";
document.querySelector("#lastName").textContent = lastName || "Not provided";
document.querySelector("#email").textContent = email || "Not provided";
document.querySelector("#phone").textContent = phone || "Not provided";
document.querySelector("#organization").textContent = organization || "Not provided";

if (timestamp) {
    const applicationDate = new Date(timestamp);

    document.querySelector("#timestamp").textContent = applicationDate.toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short"
    });
} else {
    document.querySelector("#timestamp").textContent = "Not available";
}
