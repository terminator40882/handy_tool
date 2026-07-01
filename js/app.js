import { detectDevice, searchDevices, DEVICES } from "./devices.js";
import {
  getCalibration,
  onCalibrationChange,
  setDeviceCalibration,
  setManualPpi,
  setCardCalibration,
  resetCalibration,
} from "./calibration.js";
import { drawRuler, redrawRuler } from "./ruler.js";
import { startSensors, needsPermission } from "./sensors.js";
import { initCompass } from "./compass.js";
import { initLevel } from "./level.js";

const $ = (id) => document.getElementById(id);

const METHOD_LABEL = {
  "ua-ch": "AUTO",
  ua: "AUTO",
  screen: "AUTO",
  pick: "✓",
  manual: "PPI",
  card: "▮",
};

/* ---------- calibration + ruler ---------- */

function applyCalibration(cal) {
  drawRuler(cal?.cssPxPerMm ?? null);
  const deviceName = cal?.device
    ? `${cal.device.brand} ${cal.device.name}`
    : cal?.method === "manual"
      ? `${cal.ppi} ppi`
      : cal?.method === "card"
        ? `${cal.cssPxPerMm.toFixed(2)} px/mm`
        : "?";
  $("device-name").textContent = deviceName;
  $("cal-badge").hidden = !!cal;
  $("sheet-device-name").textContent = deviceName;
  $("sheet-device-detail").textContent = cal?.device
    ? `${cal.device.ppi} ppi`
    : "";
  const badge = $("sheet-method");
  badge.textContent = cal ? METHOD_LABEL[cal.method] ?? cal.method : "–";
  badge.classList.toggle("ok", !!cal);
}

async function initCalibration() {
  let cal = getCalibration();
  if (!cal) {
    const detected = await detectDevice();
    if (detected) {
      setDeviceCalibration(detected.device, detected.method);
      cal = getCalibration();
    }
  }
  applyCalibration(cal);
  onCalibrationChange(applyCalibration);
}

/* ---------- settings sheet ---------- */

const sheet = $("settings-sheet");
const backdrop = $("sheet-backdrop");

function openSheet() {
  renderDeviceList($("device-search").value);
  sheet.hidden = false;
  backdrop.hidden = false;
}

function closeSheet() {
  sheet.hidden = true;
  backdrop.hidden = true;
}

function renderDeviceList(query) {
  const list = $("device-list");
  const cal = getCalibration();
  list.replaceChildren(
    ...searchDevices(query).map((d) => {
      const li = document.createElement("li");
      if (cal?.deviceId === d.id) li.classList.add("selected");
      const name = document.createElement("span");
      name.textContent = `${d.brand} ${d.name}`;
      const ppi = document.createElement("span");
      ppi.className = "dim";
      ppi.textContent = `${d.ppi} ppi`;
      li.append(name, ppi);
      li.addEventListener("click", () => {
        setDeviceCalibration(d, "pick");
        renderDeviceList($("device-search").value);
      });
      return li;
    })
  );
}

function initSheet() {
  $("settings-btn").addEventListener("click", openSheet);
  $("device-btn").addEventListener("click", openSheet);
  backdrop.addEventListener("click", closeSheet);

  $("device-search").addEventListener("input", (e) => renderDeviceList(e.target.value));

  $("manual-apply").addEventListener("click", () => {
    const diag = parseFloat($("diag-input").value);
    const w = parseInt($("resw-input").value, 10);
    const h = parseInt($("resh-input").value, 10);
    if (setManualPpi(diag, w, h)) closeSheet();
  });

  $("reset-btn").addEventListener("click", () => {
    resetCalibration();
    initCalibration();
    renderDeviceList($("device-search").value);
  });

  $("card-cal-btn").addEventListener("click", () => {
    closeSheet();
    openCardCalibration();
  });
}

/* ---------- credit card calibration ---------- */

const CARD_W_MM = 85.6;
const CARD_RATIO = 53.98 / 85.6;

function openCardCalibration() {
  const overlay = $("card-overlay");
  const shape = $("card-shape");
  const handle = $("card-handle");
  const readout = $("card-mm");

  let widthPx = getCalibration()?.cssPxPerMm
    ? getCalibration().cssPxPerMm * CARD_W_MM
    : Math.min(window.innerWidth * 0.75, 330);

  const apply = () => {
    widthPx = Math.max(120, Math.min(window.innerWidth - 30, widthPx));
    shape.style.width = `${widthPx}px`;
    shape.style.height = `${widthPx * CARD_RATIO}px`;
    readout.textContent = `85.60 mm ≙ ${widthPx.toFixed(0)} px`;
  };
  apply();
  overlay.hidden = false;

  let startX = 0;
  let startW = 0;
  const onMove = (e) => {
    widthPx = startW + (e.clientX - startX) * 2; // card grows symmetrically around center
    apply();
  };
  const onDown = (e) => {
    startX = e.clientX;
    startW = widthPx;
    handle.setPointerCapture(e.pointerId);
    handle.addEventListener("pointermove", onMove);
  };
  const onUp = () => handle.removeEventListener("pointermove", onMove);
  handle.addEventListener("pointerdown", onDown);
  handle.addEventListener("pointerup", onUp);
  handle.addEventListener("pointercancel", onUp);

  const cleanup = () => {
    overlay.hidden = true;
    handle.removeEventListener("pointerdown", onDown);
    handle.removeEventListener("pointerup", onUp);
    handle.removeEventListener("pointermove", onMove);
    $("card-ok").removeEventListener("click", confirm);
    $("card-cancel").removeEventListener("click", cleanup);
  };
  const confirm = () => {
    setCardCalibration(widthPx / CARD_W_MM);
    cleanup();
  };
  $("card-ok").addEventListener("click", confirm);
  $("card-cancel").addEventListener("click", cleanup);
}

/* ---------- sensors ---------- */

async function initSensors() {
  if (needsPermission()) {
    const gate = $("sensor-gate");
    gate.hidden = false;
    $("sensor-enable").addEventListener("click", async () => {
      const res = await startSensors();
      if (res !== "denied") gate.hidden = true;
    });
  } else {
    await startSensors();
  }
  initCompass();
  initLevel();
}

/* ---------- boot ---------- */

window.addEventListener("resize", redrawRuler);
window.visualViewport?.addEventListener("resize", redrawRuler);
screen.orientation?.addEventListener("change", () => setTimeout(redrawRuler, 60));

initCalibration();
initSheet();
initSensors();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

console.info(`handy tool: ${DEVICES.length} devices in database`);
