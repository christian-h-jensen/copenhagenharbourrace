// Phone "More" sheet, remembering the DA/EN choice, and offline support.
document.addEventListener("DOMContentLoaded", function () {
  var sheet = document.getElementById("more-sheet");
  var moreButton = document.querySelector(".tab-more");

  function setSheet(open) {
    if (!sheet) return;
    sheet.hidden = !open;
    document.body.classList.toggle("sheet-open", open);
    moreButton.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) sheet.querySelector("a, button").focus();
  }

  if (sheet && moreButton) {
    moreButton.addEventListener("click", function () { setSheet(sheet.hidden); });
    sheet.addEventListener("click", function (e) {
      if (e.target === sheet || e.target.closest(".sheet-close")) setSheet(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !sheet.hidden) { setSheet(false); moreButton.focus(); }
    });
  }

  document.querySelectorAll("[data-lang]").forEach(function (link) {
    link.addEventListener("click", function () {
      try { localStorage.setItem("lang", link.getAttribute("data-lang")); } catch (e) {}
    });
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("../sw.js", { scope: "../" }).catch(function () {});
  });
}
