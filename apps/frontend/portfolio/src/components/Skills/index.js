import gsap from "gsap";
import { observeViewport } from "../../scripts/utils.js";

const sectionSelector = ".skills-section";
const mainTitleSelector = ".skills-section > h1";
const fromState = { x: 100, opacity: 0 };
const toState = {
    x: 0,
    opacity: 1,
    duration: 0.2,
    ease: "power2.inOut",
};
const skillStagger = 0.15;

// Main title: bottom-to-top only, not tied to skills
const titleFromState = { y: 40, opacity: 0 };
const titleToState = {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out",
};

function runTitleAnimation() {
    const mainTitle = document.querySelector(mainTitleSelector);
    if (!mainTitle) return;

    gsap.killTweensOf(mainTitle);
    gsap.set(mainTitle, titleFromState);
    gsap.fromTo(mainTitle, titleFromState, titleToState);
}

// Animation for row titles + skill items only (no main title)
function runSkillsAnimation() {
    const section = document.querySelector(sectionSelector);
    if (!section) return;

    const containers = section.querySelectorAll(":scope .skills-container");
    const rowTitles = Array.from(containers).flatMap((c) => Array.from(c.querySelectorAll(".skills-title")));
    const allItems = Array.from(section.querySelectorAll(".skill-item"));

    gsap.killTweensOf([...rowTitles, ...allItems]);
    gsap.set([...rowTitles, ...allItems], fromState);

    const tl = gsap.timeline();

    containers.forEach((container) => {
        const rowTitle = container.querySelector(".skills-title");
        const items = container.querySelectorAll(".skill-item");

        if (rowTitle) {
            tl.fromTo(rowTitle, fromState, toState);
        }
        if (items.length) {
            tl.fromTo(items, fromState, { ...toState, stagger: skillStagger });
        }
    });
}

// Skills animate independently (no chaining) — run once only (unobserve after first trigger so no reset on scroll back)
const skillsSection = document.querySelector(sectionSelector);

if (skillsSection) {
    const skillsObs = observeViewport(
        [skillsSection],
        () => {
            runSkillsAnimation();
            skillsObs.unobserve(skillsSection);
        },
        { threshold: 0.2 }
    );
}