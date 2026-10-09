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

  // The race is always on the second Saturday of October. Once this year's race
  // day has passed, show next year's date instead. The dates written in the HTML
  // are only a fallback for browsers without JavaScript.
  function raceDay(year) {
    var firstOfOctober = new Date(year, 9, 1).getDay(); // 0 = Sunday, 6 = Saturday
    return new Date(year, 9, 1 + (6 - firstOfOctober + 7) % 7 + 7);
  }
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var race = raceDay(today.getFullYear());
  if (today > race) race = raceDay(today.getFullYear() + 1);
  var da = document.documentElement.lang === "da";

  var MONTHS_DA = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];
  var MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // Every element with data-race-date gets the race date filled into its template,
  // e.g. data-race-date="{d}. {month} {year}". The second Saturday always falls
  // on the 8th to the 14th, so English templates can write "{d}th".
  document.querySelectorAll("[data-race-date]").forEach(function (el) {
    el.textContent = el.getAttribute("data-race-date")
      .replace("{d}", race.getDate())
      .replace("{month}", (da ? MONTHS_DA : MONTHS_EN)[race.getMonth()])
      .replace("{year}", race.getFullYear());
  });

  // Countdown strip under the menu, shown from 1 September until race day.
  var nav = document.querySelector(".site-nav");
  var countdownFrom = new Date(race.getFullYear(), 8, 1); // 1 September
  if (nav && today >= countdownFrom) {
    var days = Math.round((race - today) / 86400000);
    var strip = document.createElement("p");
    strip.className = "countdown";
    if (days > 0) {
      strip.innerHTML = "<strong></strong><span></span>";
      strip.querySelector("strong").textContent = days + (da ? (days === 1 ? " dag" : " dage") : (days === 1 ? " day" : " days"));
      strip.querySelector("span").textContent = da ? "til Copenhagen Harbour Race" : "until Copenhagen Harbour Race";
    } else {
      strip.textContent = da ? "Det er løbsdag i dag!" : "It's race day!";
    }
    nav.after(strip);
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
