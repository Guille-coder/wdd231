document.addEventListener("DOMContentLoaded", function () {
    const navMenu = document.getElementById("navMenu");
    const hamburger = document.querySelector(".hamburger");
    const overlay = document.getElementById("overlay");

    function toggleMenu() {
        if (navMenu.classList.contains("slide-out")) {
            navMenu.classList.remove("slide-out");
            navMenu.classList.add("slide-in");
            overlay.style.display = "block"; 
            setTimeout(() => {
                overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            }, 10);
        } else {
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
            setTimeout(() => {
                overlay.style.display = "none";
            }, 500);
            navMenu.classList.remove("slide-in");
            navMenu.classList.add("slide-out");
        }
    }

    if (hamburger && overlay) {
        hamburger.addEventListener("click", toggleMenu);
        overlay.addEventListener("click", toggleMenu);
    }

    // Highlight current page
    const currentPage = window.location.pathname;
    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
});