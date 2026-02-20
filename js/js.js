document.addEventListener("DOMContentLoaded", function () {

	'use strict';



	Splitting();
	// Re-enable luxy smooth-scrolling and integrate with GSAP ScrollTrigger
	// initialize luxy with slightly tweaked parameters for smoother interpolation
	// wrapperSpeed controls how quickly the fixed wrapper follows the native scroll
	// targetSpeed/targetPercentage affect parallax targets' responsiveness
	luxy.init({ wrapperSpeed: 0.12, targetSpeed: 0.03, targetPercentage: 0.12 });

	// Setup a scroller proxy and ensure ScrollTrigger updates alongside luxy's RAF loop.
	// This keeps animations in sync and restores smooth scrolling "butter" feel.
	ScrollTrigger.scrollerProxy('#luxy', {
		scrollTop(value) {
			if (arguments.length) { document.documentElement.scrollTop = value; }
			return document.documentElement.scrollTop;
		},
		getBoundingClientRect() {
			return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
		}
	});

	// Wrap luxy's animate loop so ScrollTrigger.update() runs after each RAF frame
	if (luxy && typeof luxy.animate === 'function') {
		(function() {
			const _origAnimate = luxy.animate.bind(luxy);
			luxy.animate = function() {
				_origAnimate();
				if (window.ScrollTrigger && typeof ScrollTrigger.update === 'function') {
					ScrollTrigger.update();
				}
			};
		})();

		// Refresh ScrollTrigger on window resize to recalc positions
		window.addEventListener('resize', function() {
			if (window.ScrollTrigger && typeof ScrollTrigger.refresh === 'function') {
				ScrollTrigger.refresh();
			}
		});

		// Initial refresh to sync everything
		if (window.ScrollTrigger && typeof ScrollTrigger.refresh === 'function') {
			ScrollTrigger.refresh();
		}
	}
	gsap.registerPlugin(ScrollTrigger);
	const cta = document.querySelector(".header__cta");

if (cta) {
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


	const gTl = gsap.timeline();
	gTl.from(".title .char", 1, { opacity: 0, yPercent: 130, stagger: 0.06, ease: "back.out" });
	gTl.to(".header__img", 2, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", scale: 1, ease: "expo.out" }, "-=1");
	gTl.from(".header__marq", 2, { opacity: 0, yPercent: 100, ease: "expo.out" }, "-=1.5");

const gsapSq = gsap.utils.toArray(".section-title__square");

gsapSq.forEach((sq) => {
  gsap.set(sq, { transformOrigin: "50% 50%" });

  gsap.to(sq, {
    rotation: "+=720",
    ease: "none",
    scrollTrigger: {
      trigger: sq,
      start: "top bottom",
      end: "bottom top",
      scrub: 4 // try 3–6 for more “coast”
    }
  });
});


	//header
	function header() {
		gsap.to('.title_paralax', {
			scrollTrigger: {
				trigger: '.header',
				start: 'top top',
				scrub: 1.9
			},
			yPercent: -150
		})
		gsap.to('.header .stroke', {
			scrollTrigger: {
				trigger: '.header',
				start: 'top top',
				scrub: 1.9
			},
			xPercent: 50
		})
		gsap.to('.header__img', {
			scrollTrigger: {
				trigger: '.header',
				start: 'top top',
				scrub: 1.9
			},
			xPercent: -70
		})
		gsap.to('.header__img img', {
			scrollTrigger: {
				trigger: '.header',
				start: 'top top',
				scrub: 1.9
			},
			scale: 1.3
		})
		gsap.to('.header__marq-wrapp', {
			scrollTrigger: {
				trigger: '.header',
				start: 'top top',
				scrub: 1.9
			},
			xPercent: -50
		})
		gsap.to('.header__marq-star img', {
			scrollTrigger: {
				trigger: '.header',
				start: 'top top',
				scrub: 1.9
			},
			rotate: -720
		})
	}
	header();


	//about
	function about() {
		gsap.from('.about__img', {
			scrollTrigger: {
				trigger: '.about',
				start: 'top bottom',
				scrub: 1.9
			},
			yPercent: 80
		})
		gsap.from('.about__img img', {
			scrollTrigger: {
				trigger: '.about',
				start: 'top bottom',
				scrub: 1.9
			},
			scale: 1.6
		})
		gsap.to('.about__txt', {
			scrollTrigger: {
				trigger: '.about__wrapp',
				start: 'top bottom',
				scrub: 1.9
			},
			yPercent: 50
		})
	}
	about();


	//benefits
	function benefits() {
		gsap.from('.benefits__num', {
			x: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))),
			scrollTrigger: {
				trigger: '.benefits__list',
				start: 'top bottom',
				scrub: 1.9
			}
		})
	}
	benefits();


	//portfolio
	//portfolio
//portfolio
//portfolio
function portfolio() {
  // Parallax only the images inside each work item
  const imgs = gsap.utils.toArray('.work__item-img img');

  imgs.forEach((img) => {
    gsap.fromTo(
      img,
      {
        scale: 1.2,   // start slightly zoomed
        yPercent: 5   // small vertical offset
      },
      {
        scale: 1,     // zoom back to normal
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest('.work__item'),
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      }
    );
  });
}
portfolio();




	//serv
	function serv() {
		gsap.from('.serv__item-arrow', {
			x: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))),
			scrollTrigger: {
				trigger: '.serv__list',
				start: 'top bottom',
				scrub: 1.9
			}
		})
	}
	serv();


	//footer
	function footer() {
		gsap.from('.footer__div span', {
			y: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))),
			opacity: 0,
			scrollTrigger: {
				trigger: '.footer',
				start: 'top bottom',
				end: 'bottom bottom',
				scrub: 1.9
			}
		})
	}
	footer();
});

// Intercept same-page anchor clicks (href="#id") and smoothly scroll to targets
// without breaking tel: or mailto: links. Uses an offset so fixed header/CTA
// don't cover the section. Updates the URL hash via history.pushState.
(function () {
  const headerCta = document.querySelector(".header__cta");
  const OFFSET = (headerCta?.offsetHeight || 0) + 100;

  document.addEventListener(
    "click",
    function (e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      const rect = target.getBoundingClientRect();
      const scroller = document.scrollingElement || document.documentElement;
      const targetY = scroller.scrollTop + rect.top - OFFSET;

      scroller.scrollTo({ top: targetY, behavior: "smooth" });

   // no pushState / no location.hash
    },
    { passive: false }
  );
})();

