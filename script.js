const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
  });
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

function setTheme(theme) {
  const dark = theme === "dark";

  document.body.classList.toggle("dark", dark);

  if (themeIcon) {
    themeIcon.textContent = dark ? "☀" : "☾";
  }

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      dark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeToggle.setAttribute(
      "title",
      dark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  localStorage.setItem("haneen-theme", theme);
}

const savedTheme = localStorage.getItem("haneen-theme");

setTheme(savedTheme === "dark" ? "dark" : "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(
      document.body.classList.contains("dark")
        ? "light"
        : "dark"
    );
  });
}

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document
  .querySelectorAll(
    ".skill-card, .project, .timeline-item, .edu-card"
  )
  .forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition =
      "opacity .55s ease, transform .55s ease";

    observer.observe(el);
  });
