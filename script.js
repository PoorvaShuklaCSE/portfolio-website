const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      section.classList.add("show");
    }
  });
});
