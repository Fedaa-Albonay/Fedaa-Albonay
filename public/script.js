const loader = document.getElementById("loader");
window.addEventListener("load", () => setTimeout(() => loader.classList.add("hide"), 700));
const header = document.getElementById("header"),
    progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", scrollY > 30);
    const h = document.documentElement;
    progress.style.width = `${(h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100}%`;
});
const menuBtn = document.getElementById("menuBtn"),
    navLinks = document.getElementById("navLinks");
menuBtn.onclick = () => navLinks.classList.toggle("open");
document.querySelectorAll(".nav-links a").forEach((a) => (a.onclick = () => navLinks.classList.remove("open")));
const words = ["Software Engineer", "Full Stack Developer", "Web Developer", "Problem Solver"];
let wi = 0,
    ci = 0,
    del = false;
const typing = document.getElementById("typing");
function type() {
    const w = words[wi];
    typing.textContent = w.slice(0, ci);
    if (!del && ci < w.length) ci++;
    else if (del && ci > 0) ci--;
    else {
        del = !del;
        if (!del) wi = (wi + 1) % words.length;
    }
    setTimeout(type, del ? 55 : 95);
}
type();
const observer = new IntersectionObserver(
    (entries) =>
        entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("show");
        }),
    {threshold: 0.15}
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});
const particles = document.getElementById("particles");
for (let i = 0; i < 70; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = 100 + Math.random() * 100 + "%";
    p.style.animationDelay = Math.random() * 8 + "s";
    p.style.animationDuration = 5 + Math.random() * 8 + "s";
    particles.appendChild(p);
}
document.querySelectorAll(".filter").forEach((btn) =>
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        document
        .querySelectorAll(".project")
        .forEach((p) => (p.style.display = f === "all" || p.dataset.category === f ? "block" : "none"));
    })
);
const form = document.getElementById("contactForm"),
    status = document.getElementById("formStatus");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Sending...";
    const data = Object.fromEntries(new FormData(form));
    try {
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        const out = await res.json();
        status.textContent = out.message;
        if (out.success) form.reset();
    } catch {
        status.textContent = "Could not send. Make sure Node.js server is running.";
    }
});
