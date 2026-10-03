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

  // Countdown strip under the menu. Update RACE_DAY each year.
  var RACE_DAY = new Date(2026, 9, 10); // 10 October 2026 (months count from 0)
  var nav = document.querySelector(".site-nav");
  if (nav) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var days = Math.round((RACE_DAY - today) / 86400000);
    var da = document.documentElement.lang === "da";
    var strip = document.createElement("p");
    strip.className = "countdown";
    if (days > 0) {
      strip.innerHTML = "<strong></strong><span></span>";
      strip.querySelector("strong").textContent = days + (da ? (days === 1 ? " dag" : " dage") : (days === 1 ? " day" : " days"));
      strip.querySelector("span").textContent = da ? "til Copenhagen Harbour Race" : "until Copenhagen Harbour Race";
    } else if (days === 0) {
      strip.textContent = da ? "Det er løbsdag i dag!" : "It's race day!";
    }
    if (days >= 0) nav.after(strip);
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
