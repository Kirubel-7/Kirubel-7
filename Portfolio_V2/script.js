const canvas = document.getElementById("matrix-rain");
const context = canvas.getContext("2d");

const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*<>[]{}";
let columns = [];
let fontSize = 18;
let animationFrameId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const columnCount = Math.ceil(canvas.width / fontSize);
  columns = Array.from({ length: columnCount }, () => Math.random() * -100);
}

function drawMatrix() {
  context.fillStyle = "rgba(2, 5, 3, 0.08)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#59ff87";
  context.font = `${fontSize}px "Share Tech Mono", monospace`;

  columns.forEach((y, index) => {
    const text = chars[Math.floor(Math.random() * chars.length)];
    const x = index * fontSize;
    context.fillText(text, x, y);

    if (y > canvas.height + Math.random() * 1000) {
      columns[index] = Math.random() * -500;
    } else {
      columns[index] = y + fontSize;
    }
  });

  animationFrameId = window.requestAnimationFrame(drawMatrix);
}

function startMatrix() {
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId);
  }
  resizeCanvas();
  drawMatrix();
}

window.addEventListener("resize", resizeCanvas);
startMatrix();

const trigger = document.getElementById("easter-egg-trigger");
const overlay = document.getElementById("hack-overlay");
const closeOverlay = document.getElementById("close-overlay");
const skillsShell = document.querySelector(".skills-shell");
const skillsToggle = document.getElementById("skills-toggle");

function openOverlay() {
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("overlay-open");
}

function dismissOverlay() {
  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overlay-open");
}

trigger.addEventListener("click", openOverlay);
closeOverlay.addEventListener("click", dismissOverlay);
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    dismissOverlay();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && overlay.classList.contains("active")) {
    dismissOverlay();
  }
});

if (skillsShell && skillsToggle) {
  skillsToggle.addEventListener("click", () => {
    const isOpen = skillsShell.classList.toggle("open");
    skillsToggle.setAttribute("aria-expanded", String(isOpen));
    skillsToggle.textContent = isOpen ? "Hide skills menu" : "Open skills menu";
  });
}
