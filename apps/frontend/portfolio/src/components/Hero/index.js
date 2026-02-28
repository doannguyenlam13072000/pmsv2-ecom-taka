import gsap from "gsap";
import { observeViewport } from "../../scripts/utils.js";

const selector = ".hero-section h1";
const fromState = { y: 50, opacity: 0 };
const toState = {
  y: 0,
  opacity: 1,
  stagger: 1,
  duration: 1,
  ease: "power2.inOut",
};

function runHeroAnimation() {
  gsap.killTweensOf(selector);
  gsap.set(selector, fromState);
  gsap.fromTo(selector, fromState, toState);
}

const heroSection = document.querySelector(".hero-section");
if (heroSection) {
  observeViewport([heroSection], () => runHeroAnimation(), { threshold: 0.2 });
}
