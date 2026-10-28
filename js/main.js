(function () {
  "use strict";
  var toggle = document.getElementById("mob-toggle");
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.getElementById("mob-overlay");
  var closeBtn = document.getElementById("drawer-close");

  function openDrawer() {
    drawer.removeAttribute("hidden");
    overlay.classList.add("visible");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
    document.documentElement.style.overflow = "hidden";
  }
  function closeDrawer() {
    drawer.setAttribute("hidden", "");
    overlay.classList.remove("visible");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    document.documentElement.style.overflow = "";
  }
  if (toggle && drawer && overlay) {
    toggle.addEventListener("click", function () {
      if (toggle.getAttribute("aria-expanded") === "true") { closeDrawer(); } else { openDrawer(); }
    });
    if (closeBtn) { closeBtn.addEventListener("click", closeDrawer); }
    overlay.addEventListener("click", closeDrawer);
    var links = drawer.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) { links[i].addEventListener("click", closeDrawer); }
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeDrawer(); } });
    if (window.matchMedia) {
      var mq = window.matchMedia("(min-width: 769px)");
      var onChange = function (ev) { if (ev.matches) { closeDrawer(); } };
      if (mq.addEventListener) { mq.addEventListener("change", onChange); }
    }
  }

  var qs = document.querySelectorAll(".faq-q");
  for (var j = 0; j < qs.length; j++) {
    qs[j].addEventListener("click", function () {
      var item = this.parentNode;
      var open = item.classList.toggle("open");
      this.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var fc = document.querySelector(".float-call");
  var foot = document.querySelector(".sitefooter");
  if (fc && foot && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { fc.classList.toggle("away", en.isIntersecting); });
    }, { threshold: 0.05 });
    io.observe(foot);
  }
})();
