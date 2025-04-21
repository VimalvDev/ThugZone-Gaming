document.addEventListener("DOMContentLoaded", () => {
  let e = document.forms["google-sheet"],
    t = [
      "shot12",
      "raj57",
      "rester41",
      "glion5m",
      "smg94",
      "rajib007",
      "ziyayt",
      "gucizaid",
      "na",
      "tza007",
    ];
  (s = document.querySelector("#loaderPopup")),
    (i = document.querySelector("#successPopup")),
    (r = document.querySelector("#promoCodePopup")),
    (l = document.querySelector("#homeBtn")),
    (o = document.querySelector("#closePromoPopup")).addEventListener(
      "click",
      () => {
        r.classList.add("hidden");
      }
    ),
    e.addEventListener("submit", (a) => {
      a.preventDefault();
      let c = e
        .querySelector('input[name="promoCode"]')
        .value.trim()
        .toLowerCase();
      if (!t.includes(c)) {
        r.classList.remove("hidden");
        return;
      }
      s.classList.remove("hidden"),
        fetch(
          "https://script.google.com/macros/s/AKfycbzUg6uN81zZT-dAbTrV2McM98Ua5TRwQBJKD0kbBZqIrCAGUcsizxuZGVr9GWJXjYQi5g/exec",
          { method: "POST", body: new FormData(e) }
        )
          .then(() => {
            s.classList.add("hidden"), i.classList.remove("hidden");
          })
          .catch((e) => {
            s.classList.add("hidden"),
              alert("Form submission failed. Please try again."),
              console.error("Error!", e.message);
          });
    }),
    l.addEventListener("click", () => {
      window.location.href = "/index.html";
    }),
    document.querySelectorAll(".playerbox").forEach((e) => {
      e.addEventListener("click", (t) => {
        if (t.target.closest("input")) return;
        let a = e.querySelector(".hide"),
          c = e.querySelector("#plus-icon"),
          n = e.querySelector("#minus-icon");
        document.querySelectorAll(".playerbox .hide").forEach((e) => {
          if (e !== a && e.classList.contains("visible")) {
            e.classList.remove("visible");
            let t = e.closest(".playerbox");
            (t.querySelector("#plus-icon").style.opacity = "1"),
              (t.querySelector("#minus-icon").style.opacity = "0");
          }
        }),
          a.classList.toggle("visible");
        let d = a.classList.contains("visible");
        (c.style.opacity = d ? "0" : "1"), (n.style.opacity = d ? "1" : "0");
      });
    }),
    document
      .querySelectorAll(
        'input[placeholder*="UID"], input[placeholder*="A/C No."]'
      )
      .forEach((e) => {
        e.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/\D/g, "");
        }),
          e.addEventListener("paste", (e) => {
            let t = (e.clipboardData || window.clipboardData).getData("text");
            /^\d+$/.test(t) || e.preventDefault();
          });
      });
  let a = document.querySelector(".bank-container"),
    c = document.querySelector(".upi-container"),
    n = document.querySelector(".redeem-container");
  document.querySelectorAll(".methodChoose input").forEach((e) => {
    e.addEventListener("change", () => {
      [a, c, n].forEach((e) => {
        e.classList.remove("visible"),
          e.querySelectorAll("input").forEach((e) => {
            e.removeAttribute("required");
          });
      });
      let t;
      "bank" === e.id
        ? (t = a)
        : "upi" === e.id
        ? (t = c)
        : "redeem" === e.id && (t = n),
        t &&
          (t.classList.add("visible"),
          t.querySelectorAll("input").forEach((e) => {
            e.setAttribute("required", "true");
          }));
    });
  });
});
