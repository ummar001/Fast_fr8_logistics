document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // =========================
  // NAV (mobile toggle)
  // =========================
  const nav = document.querySelector(".site-nav");
  const navBtn = document.querySelector(".site-nav__toggle");
  const navMenu = document.querySelector("#siteNavMenu");

  if (nav && navBtn && navMenu) {
    const setOpen = (open) => {
      navMenu.classList.toggle("is-open", open);
      nav.classList.toggle("is-open", open);
      navBtn.setAttribute("aria-expanded", open ? "true" : "false");
    };

    navBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("is-open");
      setOpen(!isOpen);
    });

    navMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // =========================
  // SAME-PAGE ANCHORS (fixes nav links)
  // =========================
  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      // Close menu if open (mobile)
      if (navMenu && navMenu.classList.contains("is-open")) {
        navMenu.classList.remove("is-open");
        if (nav) nav.classList.remove("is-open");
        if (navBtn) navBtn.setAttribute("aria-expanded", "false");
      }

      const navH = nav ? nav.offsetHeight : 0;
      const OFFSET = navH + 40;

      const y = target.getBoundingClientRect().top + window.pageYOffset - OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    { passive: false }
  );

  // =========================
  // LIB GUARDS
  // =========================
  if (window.Splitting) Splitting();

  const hasGSAP = !!window.gsap;
  const hasST = !!window.ScrollTrigger;
  if (!hasGSAP || !hasST) return;

  gsap.registerPlugin(ScrollTrigger);

  const exists = (sel) => document.querySelector(sel);

  // =========================
  // LUXY + SCROLLTRIGGER (optional)
  // =========================
  const luxyRoot = document.querySelector("#luxy");
  const hasLuxy = !!luxyRoot && window.luxy && typeof window.luxy.init === "function";

  if (hasLuxy) {
    window.luxy.init({ wrapperSpeed: 0.12, targetSpeed: 0.03, targetPercentage: 0.12 });

    ScrollTrigger.scrollerProxy(luxyRoot, {
      scrollTop(value) {
        if (arguments.length) document.documentElement.scrollTop = value;
        return document.documentElement.scrollTop;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: getComputedStyle(luxyRoot).transform !== "none" ? "transform" : "fixed",
    });

    if (typeof window.luxy.animate === "function") {
      const orig = window.luxy.animate.bind(window.luxy);
      window.luxy.animate = function () {
        orig();
        ScrollTrigger.update();
      };
    }

    window.addEventListener("resize", () => ScrollTrigger.refresh());
    ScrollTrigger.refresh();
  }

  // =========================
  // CTA active state
  // =========================
  const cta = exists(".header__cta");
  if (cta && exists(".header")) {
    ScrollTrigger.create({
      trigger: ".header",
      start: "top top",
      end: "bottom top",
      onEnter: () => cta.classList.add("is-active"),
      onEnterBack: () => cta.classList.add("is-active"),
      onLeave: () => cta.classList.remove("is-active"),
      onLeaveBack: () => cta.classList.remove("is-active"),
    });
  }

  // =========================
  // Intro timeline (safe)
  // =========================
  if (document.querySelectorAll(".title .char").length) {
    const tl = gsap.timeline();
    tl.from(".title .char", { duration: 1, opacity: 0, yPercent: 130, stagger: 0.06, ease: "back.out" });

    if (exists(".header__img")) {
      tl.to(
        ".header__img",
        { duration: 2, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", scale: 1, ease: "expo.out" },
        "-=1"
      );
    }

    if (exists(".header__marq")) {
      tl.from(".header__marq", { duration: 2, opacity: 0, yPercent: 100, ease: "expo.out" }, "-=1.5");
    }
  }

  // =========================
  // Spinning squares
  // =========================
  gsap.utils.toArray(".section-title__square").forEach((sq) => {
    gsap.set(sq, { transformOrigin: "50% 50%" });
    gsap.to(sq, {
      rotation: "+=720",
      ease: "none",
      scrollTrigger: {
        trigger: sq,
        start: "top bottom",
        end: "bottom top",
        scrub: 4,
      },
    });
  });

  // =========================
  // Header parallax
  // =========================
  if (exists(".header")) {
    if (exists(".title_paralax")) {
      gsap.to(".title_paralax", { yPercent: -150, scrollTrigger: { trigger: ".header", start: "top top", scrub: 1.9 } });
    }
    if (exists(".header .stroke")) {
      gsap.to(".header .stroke", { xPercent: 50, scrollTrigger: { trigger: ".header", start: "top top", scrub: 1.9 } });
    }
    if (exists(".header__img")) {
      gsap.to(".header__img", { xPercent: -70, scrollTrigger: { trigger: ".header", start: "top top", scrub: 1.9 } });
    }
    if (exists(".header__img img")) {
      gsap.to(".header__img img", { scale: 1.3, scrollTrigger: { trigger: ".header", start: "top top", scrub: 1.9 } });
    }
    if (exists(".header__marq-wrapp")) {
      gsap.to(".header__marq-wrapp", { xPercent: -50, scrollTrigger: { trigger: ".header", start: "top top", scrub: 1.9 } });
    }
    if (exists(".header__marq-star img")) {
      gsap.to(".header__marq-star img", { rotate: -720, scrollTrigger: { trigger: ".header", start: "top top", scrub: 1.9 } });
    }
  }

  // =========================
  // About
  // =========================
  if (exists(".about")) {
    if (exists(".about__img")) {
      gsap.from(".about__img", { yPercent: 80, scrollTrigger: { trigger: ".about", start: "top bottom", scrub: 1.9 } });
    }
    if (exists(".about__img img")) {
      gsap.from(".about__img img", { scale: 1.6, scrollTrigger: { trigger: ".about", start: "top bottom", scrub: 1.9 } });
    }
    if (exists(".about__txt") && exists(".about__wrapp")) {
      gsap.to(".about__txt", { yPercent: 50, scrollTrigger: { trigger: ".about__wrapp", start: "top bottom", scrub: 1.9 } });
    }
  }

  // =========================
  // Benefits
  // =========================
  if (exists(".benefits__list")) {
    gsap.from(".benefits__num", {
      x: (i, el) => 1 - parseFloat(el.getAttribute("data-speed")),
      scrollTrigger: { trigger: ".benefits__list", start: "top bottom", scrub: 1.9 },
    });
  }

  // =========================
  // Portfolio (image-only parallax)
  // =========================
  gsap.utils.toArray(".work__item-img img").forEach((img) => {
    const item = img.closest(".work__item");
    if (!item) return;

    gsap.fromTo(
      img,
      { scale: 1.2, yPercent: 5 },
      {
        scale: 1,
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      }
    );
  });

  // =========================
  // Services
  // =========================
  if (exists(".serv__list")) {
    gsap.from(".serv__item-arrow", {
      x: (i, el) => 1 - parseFloat(el.getAttribute("data-speed")),
      scrollTrigger: { trigger: ".serv__list", start: "top bottom", scrub: 1.9 },
    });
  }

  // =========================
  // Footer
  // =========================
  if (exists(".footer")) {
    gsap.from(".footer__div span", {
      y: (i, el) => 1 - parseFloat(el.getAttribute("data-speed")),
      opacity: 0,
      scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: 1.9 },
    });
  }
});
