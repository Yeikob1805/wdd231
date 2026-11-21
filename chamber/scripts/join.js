const timestampField = document.querySelector("#timestamp");
const membershipLinks = document.querySelectorAll(".membership-link");
const closeButtons = document.querySelectorAll(".dialog-close");

timestampField.value = new Date().toISOString();

membershipLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const dialogId = link.dataset.dialog;
        const dialog = document.querySelector(`#${dialogId}`);

        if (dialog) {
            dialog.showModal();
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const dialog = button.closest("dialog");
        dialog.close();
    });
});
