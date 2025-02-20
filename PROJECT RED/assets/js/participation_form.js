// Function to handle the visibility of the .hide sections and toggle icons
document.querySelectorAll(".playerbox").forEach((playerbox) => {
  playerbox.addEventListener("click", function (event) {
    // Prevent click events on .playerinput from triggering the parent .playerbox click
    if (event.target.closest(".playerinput")) {
      return; // Do nothing if clicking inside .playerinput
    }

    const hideBox = this.querySelector(".hide");
    const plusIcon = this.querySelector("#plus-icon");
    const minusIcon = this.querySelector("#minus-icon");

    // Close any other open .hide sections
    document.querySelectorAll(".hide").forEach((otherHide) => {
      if (otherHide !== hideBox && otherHide.classList.contains("visible")) {
        otherHide.classList.remove("visible");
        // Reset the icon visibility
        const otherPlayerbox = otherHide.closest(".playerbox");
        const otherPlusIcon = otherPlayerbox.querySelector("#plus-icon");
        const otherMinusIcon = otherPlayerbox.querySelector("#minus-icon");
        otherPlusIcon.style.opacity = "1";
        otherMinusIcon.style.opacity = "0";
      }
    });

    // Toggle the current .hide section visibility
    hideBox.classList.toggle("visible");

    // Toggle icons: show plus when hidden, minus when visible
    if (hideBox.classList.contains("visible")) {
      plusIcon.style.opacity = "0"; // Fade out plus
      minusIcon.style.opacity = "1"; // Fade in minus
    } else {
      plusIcon.style.opacity = "1"; // Fade in plus
      minusIcon.style.opacity = "0"; // Fade out minus
    }
  });
});


document.querySelectorAll('input[id$="_uid"]').forEach((input) => {
  input.addEventListener("input", (event) => {
    // Remove any non-numeric characters
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  });

  // Optional: Prevent pasting non-numeric content
  input.addEventListener("paste", (event) => {
    const paste = (event.clipboardData || window.clipboardData).getData("text");
    if (!/^\d+$/.test(paste)) {
      event.preventDefault();
    }
  });
});
