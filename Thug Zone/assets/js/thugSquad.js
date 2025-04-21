const scriptURL =
  "https://script.google.com/macros/s/AKfycbwhGpUCSUXJhSSzJQw5b2NZ8zSQGrMcwq9Gz51C77buGngdpcRjdgstv0JO6VYPenEQ9A/exec";
const form = document.forms["google-sheet"];
const loaderPopup = document.getElementById("loaderPopup");
const successPopup = document.getElementById("successPopup");
const backHomeBtn = document.getElementById("backHomeBtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loaderPopup.style.display = "flex";

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      loaderPopup.style.display = "none";
      successPopup.style.display = "flex";
    })
    .catch((error) => {
      loaderPopup.style.display = "none";
      alert("Error submitting the form! Please try again.");
      console.error("Error!", error.message);
    });
});

backHomeBtn.addEventListener("click", () => {
  window.location.href = "https://thugzone.in";
});

// Function to handle the visibility of the .hide sections and toggle icons
document.querySelectorAll(".playerbox").forEach((playerbox) => {
  playerbox.addEventListener("click", function (event) {
    if (event.target.closest(".playerinput")) {
      return;
    }

    const hideBox = this.querySelector(".hide");
    const plusIcon = this.querySelector("#plus-icon");
    const minusIcon = this.querySelector("#minus-icon");

    document.querySelectorAll(".hide").forEach((otherHide) => {
      if (otherHide !== hideBox && otherHide.classList.contains("visible")) {
        otherHide.classList.remove("visible");
        const otherPlayerbox = otherHide.closest(".playerbox");
        const otherPlusIcon = otherPlayerbox.querySelector("#plus-icon");
        const otherMinusIcon = otherPlayerbox.querySelector("#minus-icon");
        otherPlusIcon.style.opacity = "1";
        otherMinusIcon.style.opacity = "0";
      }
    });

    hideBox.classList.toggle("visible");

    if (hideBox.classList.contains("visible")) {
      plusIcon.style.opacity = "0";
      minusIcon.style.opacity = "1";
    } else {
      plusIcon.style.opacity = "1";
      minusIcon.style.opacity = "0";
    }
  });
});

// Restrict input fields to numeric values
document.querySelectorAll('input[id$="_uid"]').forEach((input) => {
  input.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  });

  input.addEventListener("paste", (event) => {
    const paste = (event.clipboardData || window.clipboardData).getData("text");
    if (!/^\d+$/.test(paste)) {
      event.preventDefault();
    }
  });
});

// Handle payment method selection and required fields
document.addEventListener("DOMContentLoaded", () => {
  const bankContainer = document.querySelector(".bank-container");
  const upiContainer = document.querySelector(".upi-container");
  const redeemContainer = document.querySelector(".redeem-container");
  const nextButton = document.querySelector(".nextBtn");

  const containers = [bankContainer, upiContainer, redeemContainer];

  function toggleContainer(selectedId) {
    containers.forEach((container) => {
      container.classList.remove("visible");
      container.querySelectorAll("input").forEach((input) => {
        input.removeAttribute("required");
      });
    });

    const selectedContainer = document.querySelector(
      `.${selectedId}-container`
    );
    if (selectedContainer) {
      selectedContainer.classList.add("visible");
      selectedContainer.querySelectorAll("input").forEach((input) => {
        input.setAttribute("required", "true");
      });
    }
  }

  document.querySelectorAll(".methodChoose input").forEach((radio) => {
    radio.addEventListener("change", (event) => {
      toggleContainer(event.target.id);
    });
  });
});

// Form navigation
document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.querySelector(".nextBtn");
  const backButton = document.querySelector(".cancelBtn");
  const submitButton = document.querySelector(".submitBtn");

  const infoContainer = document.querySelector(".info-container");
  const paymentContainer = document.querySelector(".paymentContainer");
  const feePayContainer = document.querySelector(".feePay");

  let step = 1;

  nextButton.addEventListener("click", function () {
    let currentContainer = step === 1 ? infoContainer : paymentContainer;
    const requiredInputs = currentContainer.querySelectorAll("input[required]");
    let allFilled = true;

    requiredInputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });

    if (!allFilled) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }

    if (step === 1) {
      infoContainer.classList.add("slide-up");
      setTimeout(() => {
        infoContainer.style.display = "none";
        paymentContainer.style.display = "flex";
        setTimeout(() => paymentContainer.classList.add("active"), 10);
      }, 500);
      step++;
    } else if (step === 2) {
      paymentContainer.classList.remove("active");
      setTimeout(() => {
        paymentContainer.style.display = "none";
        feePayContainer.style.display = "flex";
        setTimeout(() => feePayContainer.classList.add("active"), 10);
      }, 500);
      step++;
      submitButton.style.display = "block";
      nextButton.style.display = "none";
    }
  });

  backButton.addEventListener("click", function () {
    if (step === 3) {
      feePayContainer.classList.remove("active");
      setTimeout(() => {
        feePayContainer.style.display = "none";
        paymentContainer.style.display = "flex";
        setTimeout(() => paymentContainer.classList.add("active"), 10);
      }, 500);
      step--;
      submitButton.style.display = "none";
      nextButton.style.display = "block";
    } else if (step === 2) {
      paymentContainer.classList.remove("active");
      setTimeout(() => {
        paymentContainer.style.display = "none";
        infoContainer.style.display = "block";
        setTimeout(() => infoContainer.classList.remove("slide-up"), 10);
      }, 500);
      step--;
    } else if (step === 1) {
      window.location.href = "https://thugzone.in";
    }
  });
});
