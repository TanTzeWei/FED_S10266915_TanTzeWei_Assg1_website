
const modal = document.getElementById("sign-in-modal");
const openModalBtn = document.getElementById("open-modal");
const closeModalBtn = document.getElementById("close-modal");


openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex"; // Flex for centering
});


closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});


window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});




