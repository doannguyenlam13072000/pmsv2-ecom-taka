import { CountUp } from "countup.js";
import { observeViewport } from "../../scripts/utils.js";

// Store each counter's DOM element and its CountUp instance so we can reset + replay when it re-enters the viewport.
const pairs = [];

// Find all counter spans (with data-end-val), create a CountUp for each, and keep a reference to element + instance.
document.querySelectorAll("[data-end-val]").forEach((el) => {
  const endVal = Number(el.getAttribute("data-end-val"));
  const suffix = el.getAttribute("data-suffix") ?? "";
  const countUp = new CountUp(el, endVal, {
    suffix,
    duration: 2,
  });
  if (!countUp.error) {
    pairs.push({ el, countUp });
  }
});

// When a counter enters the viewport (20% visible), reset it to 0 and run the count-up animation again.
observeViewport(
  pairs.map((p) => p.el),
  (entry) => {
    const pair = pairs.find((p) => p.el === entry.target);
    if (pair) {
      pair.countUp.reset();
      pair.countUp.start();
    }
  },
  { threshold: 0.2 }
);

