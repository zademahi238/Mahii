
/* =========================================
   MAHI — PERSONAL PORTFOLIO
   JavaScript Interactions
========================================= */


/* =========================================
   01. DARK / LIGHT THEME
========================================= */

const themeToggle = document.getElementById("theme-toggle");

const body = document.body;


// Load previously selected theme

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    body.classList.add("light-theme");
}


// Update theme button icon

function updateThemeIcon() {

    if (body.classList.contains("light-theme")) {
        themeToggle.textContent = "☾";
    } else {
        themeToggle.textContent = "☼";
    }

}

updateThemeIcon();


// Toggle theme on click

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-theme");

    const currentTheme = body.classList.contains("light-theme")
        ? "light"
        : "dark";

    localStorage.setItem("portfolio-theme", currentTheme);

    updateThemeIcon();

});


/* =========================================
   02. SCROLL REVEAL ANIMATIONS
========================================= */

// Elements that appear as visitors scroll

const revealElements = document.querySelectorAll(
    ".section, .featured-project, .exploration-item, .exploration-image-container"
);


// Add reveal class

revealElements.forEach((element) => {
    element.classList.add("reveal");
});


// Observe scrolling

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


// Start observing elements

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================
   03. NAVIGATION ACTIVE STATE
========================================= */

const sections = document.querySelectorAll("main section");

const navLinks = document.querySelectorAll(".nav-links a");


const navigationObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                navLinks.forEach((link) => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);


sections.forEach((section) => {
    navigationObserver.observe(section);
});


/* =========================================
   04. PROJECT IMAGE INTERACTIONS
========================================= */

const projectImages = document.querySelectorAll(
    ".project-image, .exploration-image, .profile-photo"
);


projectImages.forEach((image) => {

    image.addEventListener("error", () => {

        image.classList.add("image-error");

        console.warn(
            "Image could not be loaded:",
            image.getAttribute("src")
        );

    });

});


/* =========================================
   05. CURRENT YEAR
========================================= */

const footerYear = document.querySelector(".footer p:nth-child(2)");

if (footerYear) {

    footerYear.textContent =
        `© ${new Date().getFullYear()} · mahi's little corner of the internet.`;

}


/* =========================================
   06. REDUCED MOTION SUPPORT
========================================= */

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

if (prefersReducedMotion.matches) {

    document.documentElement.style.scrollBehavior = "auto";

}


/* =========================================
   07. CONSOLE MESSAGE
========================================= */

console.log(
    "%c hii, welcome to my little corner of the internet! ✳",
    "color: #B6C19A; font-size: 14px; font-weight: bold;"
);
