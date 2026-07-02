// Spirit level: 2D bubble vial when lying flat, bar level when standing on an edge.
import { subscribe } from "./sensors.js";

const card = document.getElementById("level-card");
const bubble = document.getElementById("bubble");
const vial = document.querySelector(".vial");
const pitchValue = document.getElementById("pitch-value");
const rollValue = document.getElementById("roll-value");
const horizonLine = document.getElementById("horizon-line");
const edgeValue = document.getElementById("edge-value");
const edgeSegs = [
  document.getElementById("edge-b"),
  document.getElementById("edge-r"),
  document.getElementById("edge-t"),
  document.getElementById("edge-l"),
];

const MAX_ANGLE = 20; // bubble reaches the vial rim at this tilt
const LEVEL_EPS = 0.5; // "level" indication threshold, deg
let wasOk = false;

// vial/bubble sizes only change on layout (resize/orientation), not per sensor
// event -- reading clientWidth in the hot path forces a synchronous reflow.
let range = 0;
function measure() {
  range = vial.clientWidth / 2 - bubble.clientWidth / 2 - 2;
}
measure();
window.addEventListener("resize", measure);
screen.orientation?.addEventListener("change", () => setTimeout(measure, 60));

function fmt(v) {
  const r = Math.round(v * 10) / 10;
  return (Object.is(r, -0) ? 0 : r).toFixed(1);
}

export function initLevel() {
  subscribe((s) => {
    card.dataset.mode = s.mode;

    let ok;
    if (s.mode === "flat") {
      // the ball rolls downhill on both axes:
      // roll > 0 = right edge down -> ball right; pitch > 0 = top edge up -> ball down
      const bx = Math.max(-1, Math.min(1, s.roll / MAX_ANGLE)) * range;
      const by = Math.max(-1, Math.min(1, s.pitch / MAX_ANGLE)) * range;
      bubble.style.transform = `translate(${bx.toFixed(1)}px, ${by.toFixed(1)}px)`;
      pitchValue.textContent = fmt(s.pitch);
      rollValue.textContent = fmt(s.roll);
      ok = Math.abs(s.pitch) <= LEVEL_EPS && Math.abs(s.roll) <= LEVEL_EPS;
    } else {
      horizonLine.style.transform = `rotate(${(-s.edgeAngle).toFixed(2)}deg)`;
      edgeValue.textContent = fmt(Math.abs(s.edgeAngle));
      edgeSegs.forEach((seg, i) => seg.classList.toggle("active", i === s.edge));
      ok = Math.abs(s.edgeAngle) <= LEVEL_EPS;
    }

    card.classList.toggle("level-ok", ok);
    if (ok && !wasOk && navigator.vibrate) navigator.vibrate(10);
    wasOk = ok;
  });
}
