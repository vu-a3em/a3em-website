document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    nav.classList.toggle("open");
    toggle.setAttribute(
      "aria-expanded",
      nav.classList.contains("open") ? "true" : "false"
    );
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
});

/* ---------- Deployment photo slideshow ---------- */
document.addEventListener("DOMContentLoaded", function () {
  var img = document.getElementById("slide-img");
  if (!img) return;

  var base = "assets/img/deployments/";
  var photos = [
    "PXL_20250326_151552608.jpg",
    "PXL_20250501_144124964.jpg",
    "PXL_20250501_155104304.jpg",
    "PXL_20250501_160259734.jpg",
    "PXL_20250501_161007105.jpg",
    "PXL_20250516_121717803.jpg",
    "PXL_20250519_053435988.MP.jpg",
    "PXL_20250525_074611160.MP.jpg",
    "PXL_20250525_074623118.MP.jpg",
    "PXL_20250601_072351163.MP.jpg",
    "IMG-20250626-WA0000.jpg",
    "IMG-20250626-WA0001.jpg",
    "IMG-20250707-WA0001.jpg",
    "IMG-20250708-WA0000.jpg",
    "IMG-20250708-WA0001.jpg",
    "IMG-20250714-WA0000.jpg",
    "IMG-20250714-WA0001.jpg",
    "PXL_20250929_162250726.MP.jpg",
    "PXL_20250929_162257862.MP.jpg",
    "PXL_20250929_162301668.jpg",
    "PXL_20250929_182454171.jpg",
    "PXL_20251025_160922634.MP.jpg",
    "PXL_20260128_153846337.jpg",
    "PXL_20260204_181328971.jpg",
    "PXL_20260207_000740706.jpg",
    "PXL_20260219_005311327.jpg",
    "PXL_20260219_005332225.jpg",
    "PXL_20260219_145614134.jpg",
    "PXL_20260219_145632546.jpg",
    "PXL_20260225_143229714.jpg",
    "PXL_20260225_143259875.jpg",
    "PXL_20260410_090410512.jpg",
    "PXL_20260410_090421745.jpg",
    "PXL_20260411_092552650.jpg",
    "PXL_20260428_152611785.jpg",
    "PXL_20260508_190855657.jpg",
    "PXL_20260508_190910281.jpg",
    "Picture1.png",
    "Picture2.png"
  ];

  var frame = img.closest(".slide-frame");
  var prevBtn = frame.querySelector(".slide-btn.prev");
  var nextBtn = frame.querySelector(".slide-btn.next");
  var playBtn = document.querySelector(".slide-play");
  var current = document.getElementById("slide-current");
  var total = document.getElementById("slide-total");

  var idx = 0;
  var timer = null;
  var interval = 5000;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  total.textContent = photos.length;

  function preload(i) {
    var pre = new Image();
    pre.src = base + photos[(i + photos.length) % photos.length];
  }

  function show(i) {
    idx = (i + photos.length) % photos.length;
    img.classList.add("is-loading");
    img.onload = function () { img.classList.remove("is-loading"); };
    img.src = base + photos[idx];
    img.alt = "Field deployment photo " + (idx + 1) + " of " + photos.length;
    current.textContent = idx + 1;
    preload(idx + 1);
    preload(idx - 1);
  }

  function go(step) {
    show(idx + step);
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
    if (playBtn) {
      playBtn.setAttribute("aria-pressed", "false");
      playBtn.innerHTML = "&#9654; Play";
    }
  }

  function start() {
    if (reduceMotion || timer) return;
    timer = setInterval(function () { go(1); }, interval);
    if (playBtn) {
      playBtn.setAttribute("aria-pressed", "true");
      playBtn.innerHTML = "&#9208; Pause";
    }
  }

  prevBtn.addEventListener("click", function () { stop(); go(-1); });
  nextBtn.addEventListener("click", function () { stop(); go(1); });

  if (playBtn) {
    playBtn.addEventListener("click", function () {
      if (timer) { stop(); } else { start(); }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { stop(); go(-1); }
    else if (e.key === "ArrowRight") { stop(); go(1); }
  });

  frame.addEventListener("mouseenter", function () {
    if (timer) { clearInterval(timer); timer = null; }
  });
  frame.addEventListener("mouseleave", function () {
    if (!reduceMotion && playBtn && playBtn.getAttribute("aria-pressed") === "true") {
      timer = setInterval(function () { go(1); }, interval);
    }
  });

  show(0);
  if (reduceMotion) { stop(); } else { start(); }
});
