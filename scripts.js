// =====================================
// MAHI PORTFOLIO INTERACTIONS
// =====================================

// THEME TOGGLE
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

themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

    updateThemeControl();
});


// =====================================
// SCROLL REVEAL ANIMATIONS
// =====================================

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
        { threshold: 0.12 }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}


// =====================================
// ACTIVE NAVIGATION
// =====================================

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
        { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach(section => {
        navObserver.observe(section);
    });
}


// =====================================
// FLEXITAC — 16 × 16 TOUCH VISUALIZER
// =====================================

(() => {
    const sensorMatrix = document.getElementById("sensor-matrix");
    const responseMap = document.getElementById("response-map");

    if (!sensorMatrix || !responseMap) return;

    const coordinateLabel = document.getElementById("touch-coordinate");
    const intensityLabel = document.getElementById("touch-intensity");
    const activeCountLabel = document.getElementById("active-cell-count");
    const statusText = document.getElementById("sensor-status-text");
    const status = document.getElementById("sensor-status");
    const resetButton = document.getElementById("touch-reset");

    const SIZE = 16;
    const TOTAL_CELLS = SIZE * SIZE;

    const sensorCells = [];
    const responseCells = [];

    function createCell(className, label) {
        const cell = document.createElement("button");

        cell.type = "button";
        cell.className = className;
        cell.setAttribute("aria-label", label);

        return cell;
    }

    // Create the 16 × 16 sensor grid.
    for (let i = 0; i < TOTAL_CELLS; i++) {
        const row = Math.floor(i / SIZE);
        const col = i % SIZE;

        const cell = createCell(
            "sensor-point",
            `Sensor row ${row + 1}, column ${col + 1}`
        );

        cell.addEventListener("pointerenter", () => activateCell(i));
        cell.addEventListener("focus", () => activateCell(i));
        cell.addEventListener("click", () => activateCell(i));

        sensorMatrix.appendChild(cell);
        sensorCells.push(cell);
    }

    // Create the corresponding 16 × 16 response heatmap.
    for (let i = 0; i < TOTAL_CELLS; i++) {
        const cell = document.createElement("span");

        cell.className = "response-point";
        cell.setAttribute("aria-hidden", "true");

        responseMap.appendChild(cell);
        responseCells.push(cell);
    }

    function activateCell(index) {
        const row = Math.floor(index / SIZE);
        const col = index % SIZE;

        const intensity = 55 + Math.floor(Math.random() * 46);

        sensorCells.forEach((cell, i) => {
            cell.classList.toggle("is-active", i === index);
        });

        responseCells.forEach((cell, i) => {
            const currentRow = Math.floor(i / SIZE);
            const currentCol = i % SIZE;

            const distance =
                Math.abs(currentRow - row) +
                Math.abs(currentCol - col);

            const strength = Math.max(
                0,
                intensity - distance * 19
            );

            if (strength > 0) {
                cell.classList.add("is-active");

                cell.style.setProperty(
                    "--response-intensity",
                    `${strength}%`
                );
            } else {
                cell.classList.remove("is-active");
                cell.style.removeProperty("--response-intensity");
            }
        });

        if (coordinateLabel) {
            coordinateLabel.textContent =
                `R${row + 1} · C${col + 1}`;
        }

        if (intensityLabel) {
            intensityLabel.textContent = `${intensity}%`;
        }

        if (activeCountLabel) {
            const activeCount = responseCells.filter(cell =>
                cell.classList.contains("is-active")
            ).length;

            activeCountLabel.textContent =
                `${activeCount} SENSOR POINTS ACTIVE`;
        }

        if (statusText) {
            statusText.textContent = "CONTACT DETECTED";
        }

        status?.classList.add("is-active");
    }

    function resetGrid() {
        sensorCells.forEach(cell => {
            cell.classList.remove("is-active");
        });

        responseCells.forEach(cell => {
            cell.classList.remove("is-active");
            cell.style.removeProperty("--response-intensity");
        });

        if (coordinateLabel) coordinateLabel.textContent = "—";
        if (intensityLabel) intensityLabel.textContent = "0%";
        if (activeCountLabel) {
            activeCountLabel.textContent = "0 SENSOR POINTS ACTIVE";
        }

        if (statusText) {
            statusText.textContent = "NO CONTACT";
        }

        status?.classList.remove("is-active");
    }

    resetButton?.addEventListener("click", resetGrid);
})();
