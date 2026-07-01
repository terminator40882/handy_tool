// Single subscription point for deviceorientation. Fans out a smoothed state:
// { heading, headingContinuous, headingAvailable, pitch, roll, tilt, mode, edge, edgeAngle, active }
const DEG = Math.PI / 180;
const listeners = new Set();

const state = {
  active: false,
  headingAvailable: false,
  heading: null, // 0..360, smoothed
  headingContinuous: 0, // unwrapped, for rotating the rose without 359->0 snaps
  pitch: 0, // front-back tilt, deg (+ = top edge up)
  roll: 0, // left-right tilt, deg (+ = right edge down)
  tilt: 0, // deviation from lying flat, deg
  mode: "flat", // "flat" | "edge"
  edge: 0, // 0 bottom, 1 right, 2 top, 3 left (which edge touches the table)
  edgeAngle: 0, // signed deviation of that edge from level, deg
};

// filtered gravity vector (device frame)
let g = { x: 0, y: 0, z: -1 };
let gInit = false;
const G_ALPHA = 0.18; // vector low-pass
const H_ALPHA = 0.15; // heading smoothing
const EDGE_ENTER = 47; // hysteresis around the 45° mode switch
const EDGE_EXIT = 43;

function screenAngle() {
  return screen.orientation?.angle ?? window.orientation ?? 0;
}

function emit() {
  listeners.forEach((fn) => fn(state));
}

export function subscribe(fn) {
  listeners.add(fn);
  fn(state);
}

function updateHeading(raw) {
  state.headingAvailable = true;
  const target = ((raw % 360) + 360) % 360;
  if (state.heading == null) {
    state.heading = target;
    state.headingContinuous = target;
    return;
  }
  // shortest-arc EMA over the 0/360 wrap
  const delta = ((target - state.heading + 540) % 360) - 180;
  state.heading = (state.heading + H_ALPHA * delta + 360) % 360;
  state.headingContinuous += H_ALPHA * delta;
}

function updateLevel(beta, gamma) {
  if (beta == null || gamma == null) return;
  const b = beta * DEG;
  const c = gamma * DEG;
  // unit gravity in device coordinates from the W3C Z-X'-Y'' angles
  const gx = Math.cos(b) * Math.sin(c);
  const gy = -Math.sin(b);
  const gz = -Math.cos(b) * Math.cos(c);

  if (!gInit) {
    g = { x: gx, y: gy, z: gz };
    gInit = true;
  } else {
    g.x += G_ALPHA * (gx - g.x);
    g.y += G_ALPHA * (gy - g.y);
    g.z += G_ALPHA * (gz - g.z);
  }
  const norm = Math.hypot(g.x, g.y, g.z) || 1;
  const nx = g.x / norm;
  const ny = g.y / norm;
  const nz = g.z / norm;

  state.tilt = Math.acos(Math.min(1, Math.abs(nz))) / DEG;
  state.pitch = Math.asin(Math.max(-1, Math.min(1, -ny))) / DEG;
  state.roll = Math.asin(Math.max(-1, Math.min(1, nx))) / DEG;

  // mode switch with hysteresis
  if (state.mode === "flat" && state.tilt > EDGE_ENTER) state.mode = "edge";
  else if (state.mode === "edge" && state.tilt < EDGE_EXIT) state.mode = "flat";

  if (state.mode === "edge") {
    // gravity projected into the screen plane: 0° = upright portrait
    const phi = Math.atan2(nx, -ny) / DEG;
    const quadrant = Math.round(phi / 90);
    state.edge = ((quadrant % 4) + 4) % 4; // 0 bottom, 1 right, 2 top, 3 left
    state.edgeAngle = phi - quadrant * 90; // signed, within ±45°
  }
}

function onOrientation(e) {
  // compass heading: prefer iOS's tilt-compensated value, else absolute alpha
  if (typeof e.webkitCompassHeading === "number" && !isNaN(e.webkitCompassHeading)) {
    updateHeading(e.webkitCompassHeading + screenAngle());
  } else if (e.absolute === true && e.alpha != null && e.type === "deviceorientation" && !hasAbsoluteEvent) {
    updateHeading(360 - e.alpha + screenAngle());
  }
  updateLevel(e.beta, e.gamma);
  state.active = true;
  emit();
}

function onOrientationAbsolute(e) {
  if (e.alpha != null) updateHeading(360 - e.alpha + screenAngle());
  // level data comes from the plain deviceorientation stream
}

let hasAbsoluteEvent = false;

function attach() {
  hasAbsoluteEvent = "ondeviceorientationabsolute" in window;
  window.addEventListener("deviceorientation", onOrientation);
  if (hasAbsoluteEvent) {
    window.addEventListener("deviceorientationabsolute", onOrientationAbsolute);
  }
}

// iOS 13+ requires an explicit permission request from a user gesture.
export function needsPermission() {
  return (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  );
}

// Returns "granted" | "denied" | "unsupported"
export async function startSensors() {
  if (typeof DeviceOrientationEvent === "undefined") return "unsupported";
  if (needsPermission()) {
    try {
      const res = await DeviceOrientationEvent.requestPermission();
      if (res !== "granted") return "denied";
    } catch {
      return "denied";
    }
  }
  attach();
  return "granted";
}
