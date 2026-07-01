// Canvas ruler pinned to the right screen edge; zero at the top edge.
const FALLBACK_CSS_PX_PER_MM = 96 / 25.4; // CSS reference pixel; used only when uncalibrated

const canvas = document.getElementById("ruler");
const ctx = canvas.getContext("2d");
let currentCssPxPerMm = null;

export function drawRuler(cssPxPerMm) {
  currentCssPxPerMm = cssPxPerMm;
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth;
  const cssH = canvas.clientHeight;
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);

  const calibrated = cssPxPerMm != null;
  const pxPerMm = cssPxPerMm ?? FALLBACK_CSS_PX_PER_MM;

  const tickColor = calibrated ? "#e6edf3" : "#8b949e";
  const cmColor = calibrated ? "#f0a832" : "#8b949e";
  const mmLen = 10;
  const halfLen = 17;
  const cmLen = 26;

  ctx.lineWidth = 1;
  ctx.font = "600 13px -apple-system, 'Segoe UI', Roboto, sans-serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";

  const totalMm = Math.floor(cssH / pxPerMm);
  // snap each tick to the physical pixel grid so lines are crisp and true
  const snap = (y) => Math.round(y * dpr) / dpr + 0.5 / dpr;

  for (let mm = 0; mm <= totalMm; mm++) {
    const y = snap(mm * pxPerMm);
    const isCm = mm % 10 === 0;
    const isHalf = mm % 5 === 0;
    const len = isCm ? cmLen : isHalf ? halfLen : mmLen;

    ctx.strokeStyle = isCm ? cmColor : tickColor;
    ctx.globalAlpha = isCm ? 1 : isHalf ? 0.85 : 0.55;
    ctx.beginPath();
    ctx.moveTo(cssW, y);
    ctx.lineTo(cssW - len, y);
    ctx.stroke();

    if (isCm && mm > 0) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = cmColor;
      ctx.save();
      ctx.translate(cssW - cmLen - 4, y);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center";
      ctx.fillText(String(mm / 10), 0, 0);
      ctx.restore();
    }
  }

  // uncalibrated marker at the bottom of the ruler
  if (!calibrated) {
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#f0a832";
    ctx.textAlign = "center";
    ctx.font = "600 13px -apple-system, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("?", cssW - cmLen / 2 - 12, cssH - 14);
  }
}

export function redrawRuler() {
  drawRuler(currentCssPxPerMm);
}
