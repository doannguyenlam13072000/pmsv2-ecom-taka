import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mouse-follow glow on cards
const section = document.querySelector(".experiences-section");
if (section) {
  section.addEventListener("mousemove", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    card.style.setProperty("--mouse-x", String(x));
    card.style.setProperty("--mouse-y", String(y));
  });
  section.addEventListener("mouseleave", (e) => {
    const card = e.target.closest(".card");
    if (card && !card.contains(e.relatedTarget)) {
      card.style.removeProperty("--mouse-x");
      card.style.removeProperty("--mouse-y");
    }
  });
}

// One master timeline: each project runs after the previous one finishes (card → timeline-wrapper → timeline-content)
const DURATION = 0.3;
const EASE = "power2.out";

const wrappers = gsap.utils.toArray(".exp-card-wrapper");
const masterTl = gsap.timeline({
  scrollTrigger: {
    // The element that triggers the animation (the whole experience section)
    trigger: ".experiences-section",
    // Animation starts when the top of the trigger hits 85% down the viewport
    start: "top 85%",
    // Animation ends when the top of the trigger hits 25% down the viewport
    end: "top 25%",
    // play on enter, none on leave, reset on enterBack & leaveBack so animation restarts when scrolling back into view
    toggleActions: "play none reset reset",
    onLeaveBack: () => {
      masterTl.progress(0).pause();
      masterTl.invalidate(); // clear cache so next play runs from clean state
    },
  },
});

wrappers.forEach((wrapper) => {
  const card = wrapper.querySelector(".timeline-card");
  const timelineWrapper = wrapper.querySelector(".timeline-wrapper");
  const timelineContent = wrapper.querySelector(".timeline-content");

  if (!card || !timelineWrapper || !timelineContent) return;

  // Per project: 1) card left→right, 2) timeline-wrapper top→bottom, 3) timeline-content bottom→top (chained)
  masterTl
    .fromTo(card, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: DURATION, ease: EASE })
    .fromTo(
      timelineWrapper,
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: DURATION, ease: EASE, transformOrigin: "top center" }
    )
    .fromTo(timelineContent, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: DURATION, ease: EASE });
});
