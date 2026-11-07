
// =====================================
// MAHI PORTFOLIO INTERACTIONS
// =====================================

// THEME TOGGLE
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    if (themeIcon) themeIcon.textContent = "☀";
}

themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");

    localStorage.setItem(
        "portfolio-theme",
        isDark ? "dark" : "light"
    );

    if (themeIcon) {
        themeIcon.textContent = isDark ? "☀" : "◐";
    }
});


// SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(
    ".project, .section-heading, .explore-layout, .contact-heading, .social-links"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(
    (entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observerInstance.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => observer.observe(element));


// ACTIVE NAVIGATION LINK
const sections = document.querySelectorAll(
    "#work, #exploring, #contact"
);

const navLinks = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(
    entries => {
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
    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach(section => navObserver.observe(section));


// FOOTER YEAR
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// IMAGE ERROR CHECK
document.querySelectorAll("img").forEach(image => {
    image.addEventListener("error", () => {
        console.error("Image could not be loaded:", image.src);
        image.classList.add("image-error");
        image.alt = "Image unavailable — check the image filename and path.";
    });
});
