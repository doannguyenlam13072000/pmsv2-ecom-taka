import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

(function initContactAnimation() {
  const section = document.querySelector(".contact-section");
  if (!section) return;

  const header = section.querySelector(".contact-header");
  const imageWrap = section.querySelector(".contact-image-wrap");
  const formWrap = section.querySelector(".contact-form-wrap");
  const formGroups = formWrap ? gsap.utils.toArray(formWrap.querySelectorAll(".form-group")) : [];

  const elements = [header, imageWrap, formWrap].filter(Boolean);
  if (!elements.length) return;

  const DURATION = 0.5;
  const EASE = "power2.out";
  const STAGGER = 0.08;

  // Initial state
  gsap.set(elements, { opacity: 0 });
  if (formGroups.length) gsap.set(formGroups, { opacity: 0, y: 24 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });

  if (header) {
    tl.fromTo(header, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: DURATION, ease: EASE });
  }
  if (imageWrap) {
    tl.fromTo(
      imageWrap,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: DURATION, ease: EASE },
      "-=0.25"
    );
  }
  if (formWrap) {
    tl.fromTo(
      formWrap,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: DURATION, ease: EASE },
      "-=0.25"
    );
  }
  if (formGroups.length) {
    tl.to(formGroups, { opacity: 1, y: 0, duration: 0.35, stagger: STAGGER, ease: EASE }, "-=0.2");
  }
})();
