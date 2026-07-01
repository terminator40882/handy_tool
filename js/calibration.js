// Calibration state: how many CSS px make one millimetre on this screen.
import { getDeviceById } from "./devices.js";

const KEY = "handytool.calibration.v1";
const listeners = new Set();

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* corrupted/blocked storage -> start fresh */
  }
  return null;
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* private mode: keep in-memory only */
  }
  listeners.forEach((fn) => fn(getCalibration()));
}

export function onCalibrationChange(fn) {
  listeners.add(fn);
}

export function getCalibration() {
  if (!state) return null;
  const dpr = window.devicePixelRatio || 1;
  let cssPxPerMm = null;
  if (state.ppi) {
    cssPxPerMm = state.ppi / (25.4 * dpr);
  } else if (state.cssPxPerMm) {
    // card calibration measured CSS px directly; rescale if zoom/DPR changed since
    cssPxPerMm = state.cssPxPerMm * ((state.dprAtCalibration || dpr) / dpr);
  }
  const device = state.deviceId ? getDeviceById(state.deviceId) : null;
  return { ...state, device, cssPxPerMm };
}

export function setDeviceCalibration(device, method) {
  state = {
    method, // "ua-ch" | "ua" | "screen" | "pick"
    deviceId: device.id,
    ppi: device.ppi,
    dprAtCalibration: window.devicePixelRatio || 1,
  };
  save();
}

export function setManualPpi(diagonalInches, resW, resH) {
  const ppi = Math.hypot(resW, resH) / diagonalInches;
  if (!isFinite(ppi) || ppi < 100 || ppi > 900) return false;
  state = {
    method: "manual",
    ppi: Math.round(ppi * 10) / 10,
    dprAtCalibration: window.devicePixelRatio || 1,
  };
  save();
  return true;
}

export function setCardCalibration(cssPxPerMm) {
  state = {
    method: "card",
    cssPxPerMm,
    dprAtCalibration: window.devicePixelRatio || 1,
  };
  save();
}

export function resetCalibration() {
  state = null;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  listeners.forEach((fn) => fn(null));
}
