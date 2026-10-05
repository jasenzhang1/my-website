// Builds the shared footer.
(function () {
  const NAME = "Jasen Zhang";

  const socials = [
    { href: "https://github.com/jasenzhang1", icon: "fa-brands fa-github", label: "GitHub" },
    { href: "https://www.linkedin.com/in/jasenzhang/", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
    { href: "mailto:jasenzhang@g.ucla.edu", icon: "fa-solid fa-envelope", label: "Email" },
  ];

  const links = socials
    .map((s) => `<li><a href="${s.href}" aria-label="${s.label}" title="${s.label}"><i class="${s.icon}"></i></a></li>`)
    .join("");

  document.getElementById("site-footer").innerHTML = `
    <div class="container footer-inner">
      <span>&copy; ${new Date().getFullYear()} ${NAME}. Built one module at a time.</span>
      <ul class="socials">${links}</ul>
    </div>`;
})();
