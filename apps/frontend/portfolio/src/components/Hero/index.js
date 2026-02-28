import gsap from "gsap";
import { observeViewport } from "../../scripts/utils.js";

const headingSelector = ".hero-section h1";
const ctaSelector = ".hero-cta";
const fromState = { y: 50, opacity: 0 };
const toState = {
  y: 0,
  opacity: 1,
  stagger: 1,
  duration: 1,
  ease: "power2.inOut",
};

const ctaFromState = { y: 40, opacity: 0 };
const ctaToState = {
  y: 0,
  opacity: 1,
  duration: 0.8,
  delay: 0.5,
  ease: "power2.out",
};

function runHeroAnimation() {
  gsap.killTweensOf([headingSelector, ctaSelector]);
  gsap.set(headingSelector, fromState);
  gsap.set(ctaSelector, ctaFromState);
  gsap.fromTo(headingSelector, fromState, toState);
  gsap.fromTo(ctaSelector, ctaFromState, ctaToState);
}

const heroSection = document.querySelector(".hero-section");
if (heroSection) {
  observeViewport([heroSection], () => runHeroAnimation(), { threshold: 0.2 });
}
