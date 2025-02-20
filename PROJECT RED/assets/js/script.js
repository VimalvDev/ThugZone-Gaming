/* ==============================FAQ================================= */

const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  const icon = accordion.querySelector(".icon");
  const answer = accordion.querySelector(".answer");

  accordion.addEventListener("click", () => {
    // Close all other accordions
    accordions.forEach((item) => {
      if (item !== accordion) {
        item.querySelector(".icon").classList.remove("active");
        item.querySelector(".answer").classList.remove("active");
      }
    });

    // Toggle the current accordion
    icon.classList.toggle("active");
    answer.classList.toggle("active");
  });
});

/* =========================Animation======================= */

window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(
    ".autoShowjs, .autoShowParajs"
  );

  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.9) {
      element.style.animationPlayState = "running";
    }
  });
});


window.addEventListener("scroll", () => {
  const animatedElements = document.querySelectorAll(
    ".autoCharSlideRjs, .autoCharSlideLjs"
  );

  animatedElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.7) {
      element.style.animationPlayState = "running";
    }
  });
});