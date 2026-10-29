// Handicap calculator for the Mix/masters 8+ class (handicap.html), following
// "H-Faktor i Copenhagen Harbour Race" (rev 6), linked from rule 5 on rules.html.

// The document's table of H-factors (section 4.1, version 4): age, men, women.
// This is the only copy; the table on the page is filled in from it.
var H_FACTORS = [
  [25, 1.000, 0.848],
  [30, 0.950, 0.829],
  [35, 0.929, 0.820],
  [40, 0.911, 0.811],
  [45, 0.904, 0.807],
  [50, 0.895, 0.800],
  [55, 0.890, 0.795],
  [60, 0.884, 0.789],
  [65, 0.881, 0.787],
  [70, 0.874, 0.782],
  [75, 0.850, 0.763],
  [80, 0.807, 0.728]
];

// The document doesn't say what to do between the rows, so each rower uses the row
// for their 5-year age group: 27 uses 25, 34 uses 30, 85 uses 80. Under 25 uses 25.
function hFactor(gender, age) {
  var row = H_FACTORS[0];
  H_FACTORS.forEach(function (r) { if (age >= r[0]) row = r; });
  return gender === "m" ? row[1] : row[2];
}

// The crew's H-factor is the average of the rowers' factors.
function crewFactor(factors) {
  var sum = 0;
  factors.forEach(function (f) { sum += f; });
  return sum / factors.length;
}

// Rounds halves up, which toFixed() alone doesn't always do: the average of
// 4 × 0.950 and 4 × 0.829 comes out as 0.88949999… and would show as 0.889.
function decimal(x, digits, mark) {
  var p = Math.pow(10, digits);
  return (Math.round(x * p + 1e-9) / p).toFixed(digits).replace(".", mark);
}

// "24:21,7", "24:21.7" or "24:21" → seconds. Anything else gives NaN.
function parseTime(text) {
  var m = /^(\d+):([0-5]\d)(?:[.,](\d+))?$/.exec(text.trim());
  return m ? Number(m[1]) * 60 + Number(m[2] + "." + (m[3] || "0")) : NaN;
}

// Seconds → "21:55,5", rounded to tenths of a second like the document's times.
function formatTime(seconds, mark) {
  var tenths = Math.round(seconds * 10 + 1e-9);
  var s = Math.floor(tenths / 10) % 60;
  return Math.floor(tenths / 600) + ":" + (s < 10 ? "0" : "") + s + mark + tenths % 10;
}

document.addEventListener("DOMContentLoaded", function () {
  var calculator = document.getElementById("calculator");
  if (!calculator) return;
  var mark = document.documentElement.lang === "da" ? "," : ".";

  // Reference table: one row per age group, e.g. 25–29, and 80+ for the last.
  var tbody = document.getElementById("h-table");
  H_FACTORS.forEach(function (r, i) {
    var next = H_FACTORS[i + 1];
    var tr = document.createElement("tr");
    tr.innerHTML = '<th scope="row"></th><td></td><td></td>';
    tr.children[0].textContent = next ? r[0] + "–" + (next[0] - 1) : r[0] + "+";
    tr.children[1].textContent = decimal(r[1], 3, mark);
    tr.children[2].textContent = decimal(r[2], 3, mark);
    tbody.appendChild(tr);
  });

  var form = calculator.querySelector("form");
  var rows = form.querySelectorAll("tbody tr");
  var time = document.getElementById("time");

  // Each rower's age is the age they turn in the year of the next race (site.js),
  // so everyone born in the same year counts as the same age.
  var raceYear = nextRaceDay().getFullYear();

  // Recalculate on every change. Only rowers with both gender and year of birth count.
  function update() {
    var factors = [];
    var tooYoung = false;
    rows.forEach(function (row) {
      var gender = row.querySelector("select").value;
      var bornInput = row.querySelector("input");
      var born = /^\d{4}$/.test(bornInput.value) ? Number(bornInput.value) : NaN;
      var age = born <= raceYear ? raceYear - born : NaN;
      var ok = gender !== "" && !isNaN(age);
      var f = ok ? hFactor(gender, age) : NaN;
      if (ok) factors.push(f);
      if (age < 27) tooYoung = true;
      // Don't flag a year that is still being typed, only a whole one that can't be right.
      var bad = age < 27 || (bornInput.value.length >= 4 && isNaN(age));
      bornInput.setAttribute("aria-invalid", bad ? "true" : "false");
      row.querySelector(".age").textContent = isNaN(age) ? "–" : age;
      row.querySelector(".factor").textContent = ok ? decimal(f, 3, mark) : "–";
    });

    var crew = factors.length ? crewFactor(factors) : NaN;
    var seconds = time.value.trim() === "" ? NaN : parseTime(time.value);
    var badTime = time.value.trim() !== "" && isNaN(seconds);
    time.setAttribute("aria-invalid", badTime ? "true" : "false");

    document.getElementById("count").textContent = factors.length;
    document.getElementById("crew-factor").textContent = factors.length ? decimal(crew, 3, mark) : "–";
    document.getElementById("crew-factor-exact").textContent = factors.length ? "(" + decimal(crew, 4, mark) + ")" : "";
    document.getElementById("corrected").textContent =
      factors.length && !isNaN(seconds) ? formatTime(seconds * crew, mark) : "–";
    document.getElementById("warn-count").hidden = !(factors.length > 0 && factors.length < 8);
    document.getElementById("warn-age").hidden = !tooYoung;
    document.getElementById("warn-time").hidden = !badTime;
  }

  form.addEventListener("input", update);
  form.addEventListener("change", update);
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  calculator.hidden = false;
  update(); // the browser may have kept the values from an earlier visit
});
