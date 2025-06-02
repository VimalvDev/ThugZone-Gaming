/* ==============================FAQ================================= */
const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  const icon = accordion.querySelector(".icon");
  const answer = accordion.querySelector(".answer");

  accordion.addEventListener("click", () => {
    // Close all other accordions
    accordions.forEach((item) => {
      if (item === accordion) return;
      item.classList.remove("active-border");
      item.querySelector(".icon").classList.remove("active");
      item.querySelector(".answer").classList.remove("active");
    });

    // Toggle the current accordion
    accordion.classList.toggle("active-border");
    icon.classList.toggle("active");
    answer.classList.toggle("active");
  });
});

// ============================animation==================================
// GSAP animations

// Homepage animations
const tl = gsap.timeline();
tl.from(".mainHeading, .subHeading", {
  yPercent: 100,
  duration: 1.2,
  ease: "power4.out",
  stagger: 0.5,
}).from(
  ".paraDiv p, .btn_1st ",
  {
    y: 80,
    duration: 1.2,
    stagger: 0.5,
    ease: "power3.out",
    opacity: 0,
  },
  "-=1"
);
//sec4 (sec2)
gsap.from(".aboutUsTxt, .aboutUsBorder", {
  opacity: 0,
  xPercent: -40,
  stagger: 0.3,
  scrollTrigger: {
    scroller: "body",
    trigger: ".aboutUsTxt",
    scrub: 2,
    start: "top 80%",
    end: "top 40%",
  },
});
gsap.from(".sec4-paragraph", {
  opacity: 0,
  yPercent: 40,
  stagger: 0.3,
  scrollTrigger: {
    scroller: "body",
    trigger: ".sec4-paragraph",
    scrub: 2,
    start: "top 90%",
    end: "top 60%",
  },
});
gsap.from(".sec4-char", {
  opacity: 0,
  xPercent: 40,
  scrollTrigger: {
    scroller: "body",
    trigger: ".sec4-char",
    scrub: 2,
    start: "top 80%",
    end: "top 50%",
  },
});
//sec2

gsap.from(" .sec2-heading img , .sec2-heading .updateTxt", {
  opacity: 0,
  yPercent: -30,
  stagger: 0.3,
  scrollTrigger: {
    scroller: "body",
    trigger: ".sec2-heading h2",
    scrub: 2,
    start: "top 80%",
    end: "top 50%",
  },
});

// =========================nav bar===================================
/*=============== SHOW MENU ===============*/
// Get navigation elements
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav__link"); // Updated class selector

// Function to toggle menu visibility
const toggleMenu = () => navMenu.classList.toggle("show-menu");

// Open menu
navToggle?.addEventListener("click", toggleMenu);

// Close menu
navClose?.addEventListener("click", toggleMenu);

// Close menu when a nav link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("show-menu"));
});

// Add active class to nav link when section is in viewport
const sections = document.querySelectorAll("section");

const setActiveLink = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${section.id}`) {
          link.classList.add("active");
        }
      });
    }
  });
};

window.addEventListener("scroll", setActiveLink);

// Initial call to set the active link on page load
setActiveLink();
