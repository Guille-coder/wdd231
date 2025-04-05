document.addEventListener("DOMContentLoaded", () => {
    const hamburgerButton = document.getElementById("mobileMenu");
    const mainNav = document.getElementById("navigation");

    hamburgerButton.addEventListener("click", () => {
        mainNav.classList.toggle("active");
        if (mainNav.classList.contains("active")) {
            mobileMenu.innerHTML = "x";
        } else {
            mobileMenu.innerHTML ="≡";
        }
    });
});