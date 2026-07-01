// SVG compass rose: numbers every 30°, ticks every 2°, red north marker.
import { subscribe } from "./sensors.js";

const SVG_NS = "http://www.w3.org/2000/svg";
const rose = document.getElementById("compass-rose");
const headingValue = document.getElementById("heading-value");
const card = document.getElementById("compass-card");

function el(name, attrs) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

function buildRose() {
  const group = el("g", { id: "rose-group" });
  const R = 100;

  group.appendChild(el("circle", { cx: 0, cy: 0, r: R, fill: "none", stroke: "#21262d", "stroke-width": 1.5 }));

  for (let deg = 0; deg < 360; deg += 2) {
    const major = deg % 30 === 0;
    const mid = deg % 10 === 0;
    const len = major ? 13 : mid ? 9 : 5;
    const a = (deg - 90) * (Math.PI / 180);
    const x1 = Math.cos(a) * R;
    const y1 = Math.sin(a) * R;
    const x2 = Math.cos(a) * (R - len);
    const y2 = Math.sin(a) * (R - len);
    group.appendChild(
      el("line", {
        x1, y1, x2, y2,
        stroke: deg === 0 ? "#f85149" : major ? "#e6edf3" : "#8b949e",
        "stroke-width": major ? 2 : 1,
        "stroke-linecap": "round",
        opacity: major ? 1 : mid ? 0.8 : 0.45,
      })
    );
    if (major) {
      const tx = Math.cos(a) * (R - 24);
      const ty = Math.sin(a) * (R - 24);
      const label = el("text", {
        x: tx, y: ty,
        fill: deg === 0 ? "#f85149" : "#8b949e",
        "font-size": deg % 90 === 0 ? 13 : 10.5,
        "font-weight": deg % 90 === 0 ? 700 : 500,
        "text-anchor": "middle",
        "dominant-baseline": "central",
        transform: `rotate(${deg} ${tx} ${ty})`,
      });
      label.textContent = String(deg);
      group.appendChild(label);
    }
  }

  // north pointer
  group.appendChild(el("path", { d: "M 0 -99 L 5.5 -84 L -5.5 -84 Z", fill: "#f85149" }));
  rose.appendChild(group);
  return group;
}

const roseGroup = buildRose();
let unavailableTimer = setTimeout(() => card.classList.add("unavailable"), 2500);

export function initCompass() {
  subscribe((s) => {
    if (!s.headingAvailable || s.heading == null) return;
    if (unavailableTimer) {
      clearTimeout(unavailableTimer);
      unavailableTimer = null;
    }
    card.classList.remove("unavailable");
    // rotate the dial opposite to heading; continuous value avoids 359->0 snaps
    roseGroup.setAttribute("transform", `rotate(${-s.headingContinuous})`);
    headingValue.textContent = String(Math.round(s.heading) % 360);
  });
}
