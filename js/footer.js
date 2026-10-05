// Builds the shared footer.
(function () {
  const NAME = "Jasen Zhang";

  const socials = [
    { href: "mailto:jasenzhang@g.ucla.edu", icon: "fa-solid fa-envelope", label: "Email" },
    { href: "https://www.linkedin.com/in/jasenzhang/", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
    { href: "https://github.com/jasenzhang1", icon: "fa-brands fa-github", label: "GitHub" },
    { href: "https://www.instagram.com/jasenzhangorigami", icon: "fa-brands fa-instagram", label: "Instagram" },
    { href: "https://www.tiktok.com/@jasenzhangorigami", icon: "fa-brands fa-tiktok", label: "TikTok" },
    { href: "https://www.youtube.com/@ChasingCup", icon: "fa-brands fa-youtube", label: "YouTube" },
  ];

  const links = socials
    .map((s) => {
      const ext = s.href.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
      return `<li><a href="${s.href}"${ext} aria-label="${s.label}" title="${s.label}"><i class="${s.icon}"></i></a></li>`;
    })
    .join("");

  document.getElementById("site-footer").innerHTML = `
    <div class="container footer-inner">
      <span>&copy; ${new Date().getFullYear()} ${NAME}. Built one module at a time.</span>
      <ul class="socials">${links}</ul>
    </div>`;
})();
