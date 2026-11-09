// =====================================
// MAHI PORTFOLIO INTERACTIONS
// =====================================

// DARK THEME IS THE DEFAULT.
// A saved light-theme preference is respected.

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

function updateThemeControl() {
    const isLight = document.body.classList.contains("light-theme");

    if (themeIcon) {
        themeIcon.textContent = isLight ? "☾" : "☼";
    }

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark theme" : "Switch to light theme"
        );
    }
}

updateThemeControl();


// THEME TOGGLE

themeToggle?.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

    updateThemeControl();

});


// SCROLL REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(
    ".project, .section-heading, .explore-layout, .contact-heading, .social-links, .flexitac-demo"
);

if ("IntersectionObserver" in window) {

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

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

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

}


// ACTIVE NAVIGATION

const sections = document.querySelectorAll(
    "#home, #work, #exploring, #contact"
);

const navLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {

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

    sections.forEach(section => {
        navObserver.observe(section);
    });

}


// =====================================
// FLEXITAC SENSOR + RESPONSE VISUALIZER
// =====================================

(() => {

    const sensor = document.getElementById("sensor-matrix");
    const response = document.getElementById("response-map");

    if (!sensor || !response) return;

    const coordinate = document.getElementById("touch-coordinate");
    const intensity = document.getElementById("touch-intensity");
    const count = document.getElementById("active-cell-count");

    const status = document.getElementById("sensor-status");
    const statusText = document.getElementById("sensor-status-text");

    const reset = document.getElementById("touch-reset");

    const dimension = 16;

    const sensorCells = [];
    const responseCells = [];


    // RESET THE SENSOR

    function clearContact() {

        sensorCells.forEach(cell => {
            cell.classList.remove("is-focused");
        });

        responseCells.forEach(cell => {
            cell.classList.remove("is-lit");
            cell.style.removeProperty("--heat");
        });

        coordinate.textContent = "—";
        intensity.textContent = "0%";

        count.textContent = "0 RESPONSE POINTS ACTIVE";

        statusText.textContent = "NO CONTACT";

        status.classList.remove("is-active");

    }


    // DISPLAY TOUCH RESPONSE

    function showContact(index) {

        const row = Math.floor(index / dimension);
        const col = index % dimension;

        const strength = 55 + Math.floor(Math.random() * 41);

        const radius = 3.2;


        // Highlight the selected sensor cell

        sensorCells.forEach((cell, i) => {

            cell.classList.toggle(
                "is-focused",
                i === index
            );

        });


        // Generate the corresponding heatmap

        let active = 0;

        responseCells.forEach((cell, i) => {

            const r = Math.floor(i / dimension);
            const c = i % dimension;

            const distance = Math.hypot(
                r - row,
                c - col
            );

            const value = Math.max(
                0,
                strength * (1 - distance / radius)
            );

            const lit = value > 8;

            cell.classList.toggle("is-lit", lit);

            if (lit) {

                active++;

                const hue = 78 - value * 0.12;

                cell.style.setProperty(
                    "--heat",
                    `hsl(${hue} 78% ${35 + value * 0.28}%)`
                );

            } else {

                cell.style.removeProperty("--heat");

            }

        });


        // Update live readings

        coordinate.textContent =
            `R${row + 1} · C${col + 1}`;

        intensity.textContent = `${strength}%`;

        count.textContent =
            `${active} RESPONSE POINTS ACTIVE`;

        statusText.textContent = "CONTACT DETECTED";

        status.classList.add("is-active");

    }


    // CREATE BOTH 16 × 16 GRIDS

    for (let i = 0; i < dimension * dimension; i++) {

        // SENSOR CELL

        const sensorCell = document.createElement("button");

        sensorCell.type = "button";

        sensorCell.className = "sensor-point";

        sensorCell.setAttribute(
            "aria-label",
            `Touch sensor row ${Math.floor(i / dimension) + 1}, column ${(i % dimension) + 1}`
        );

        sensorCell.addEventListener(
            "pointerenter",
            () => showContact(i)
        );

        sensorCell.addEventListener(
            "focus",
            () => showContact(i)
        );

        sensorCell.addEventListener(
            "click",
            () => showContact(i)
        );

        sensor.appendChild(sensorCell);

        sensorCells.push(sensorCell);


        // MATCHING RESPONSE CELL

        const responseCell = document.createElement("span");

        responseCell.className = "response-point";

        response.appendChild(responseCell);

        responseCells.push(responseCell);

    }


    // CLEAR CONTACT BUTTON

    reset?.addEventListener("click", clearContact);

})();
