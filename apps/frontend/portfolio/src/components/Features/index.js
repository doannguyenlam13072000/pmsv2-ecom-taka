import gsap from "gsap";
import { observeViewport } from "../../scripts/utils.js";

const cardSelector = ".features-section .feature-card";
const fromState = { y: 50, opacity: 0 };
const toState = {
  y: 0,
  opacity: 1,
  stagger: 0.15,
  duration: 0.7,
  ease: "power2.out",
};

function runFeaturesAnimation() {
  gsap.killTweensOf(cardSelector);
  gsap.set(cardSelector, fromState);
  gsap.fromTo(cardSelector, fromState, toState);
}

const section = document.querySelector(".features-section");
if (section) {
  observeViewport([section], () => runFeaturesAnimation(), { threshold: 0.2 });
}
