
// =====================================
// MAHI PORTFOLIO INTERACTIONS
// =====================================

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

// DARK MODE IS DEFAULT
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

// Update toggle icon
function updateThemeIcon() {
    const isLight = document.body.classList.contains("light-theme");

    if (themeIcon) {
        themeIcon.textContent = isLight ? "☾" : "☀";
    }
}

updateThemeIcon();

// THEME TOGGLE
themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

    updateThemeIcon();
});

// SCROLL REVEAL
const revealElements = document.querySelectorAll(
    ".project, .section-heading, .explore-layout, .contact-heading, .social-links"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerInstance.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => observer.observe(element));

// ACTIVE NAVIGATION
const sections = document.querySelectorAll(
    "#home, #work, #exploring, #contact"
);

const navLinks = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });
        }
    });
}, {
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach(section => navObserver.observe(section));

// IMAGE ERROR CHECK
document.querySelectorAll("img").forEach(image => {
    image.addEventListener("error", () => {
        console.error("Image could not be loaded:", image.src);
    });
});
