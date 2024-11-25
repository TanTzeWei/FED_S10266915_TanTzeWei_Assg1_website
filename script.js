// Get modal elements
const modal = document.getElementById("sign-in-modal");
const openModalBtn = document.getElementById("open-modal");
const closeModalBtn = document.getElementById("close-modal");

// Open modal
openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex"; // Flex for centering
});

// Close modal
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside content
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

