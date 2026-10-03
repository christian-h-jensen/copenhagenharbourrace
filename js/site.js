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

  // Open linked images in an overlay instead of navigating to the bare file:
  // the installed iPhone app has no back button to get out of it again.
  var viewer = null;
  function closeViewer() {
    if (!viewer) return;
    viewer.remove();
    viewer = null;
    document.body.classList.remove("viewer-open");
  }
  document.querySelectorAll('a[href$=".jpg"], a[href$=".png"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var img = link.querySelector("img");
      viewer = document.createElement("div");
      viewer.className = "viewer";
      viewer.setAttribute("role", "dialog");
      viewer.setAttribute("aria-modal", "true");
      viewer.innerHTML = '<button class="viewer-close" type="button"></button><img alt="">';
      viewer.querySelector("button").textContent = document.documentElement.lang === "da" ? "Luk" : "Close";
      viewer.querySelector("img").src = link.href;
      viewer.querySelector("img").alt = img ? img.alt : "";
      viewer.addEventListener("click", function (e) {
        if (e.target === viewer || e.target.closest(".viewer-close")) { closeViewer(); link.focus(); }
      });
      document.body.appendChild(viewer);
      document.body.classList.add("viewer-open");
      viewer.querySelector("button").focus();
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && viewer) closeViewer();
  });

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
