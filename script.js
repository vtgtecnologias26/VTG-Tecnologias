// VTG Tecnologias: interações leves para o site
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    });
  });
}

// Revela os elementos suavemente conforme a pessoa rola a página.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Atualiza o ano do rodapé automaticamente.
const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// O formulário usa mailto para não fingir que salva dados num servidor.
const form = document.querySelector("#suggestion-form");
const feedback = document.querySelector("#form-feedback");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "Mensagem pelo site");
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      feedback.textContent = "Preencha seu nome, e-mail e mensagem antes de continuar.";
      return;
    }

    // Troque o endereço abaixo pelo e-mail oficial quando ele existir.
    const destination = "contatovtg26@gmail.com";
    const body = `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`;
    const mailto = `mailto:${destination}?subject=${encodeURIComponent("[VTG Tecnologias] " + subject)}&body=${encodeURIComponent(body)}`;

    feedback.textContent = "Vamos abrir seu aplicativo de e-mail para preparar a mensagem. Confira o endereço antes de enviar.";
    window.location.href = mailto;
  });
}
