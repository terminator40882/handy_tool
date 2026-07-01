// Device database: physical PPI drives ruler accuracy.
// logical = portrait CSS viewport [w, h] at default zoom, dpr = devicePixelRatio.
// models[] = identifiers that appear in the Android user agent / UA-CH "model".

export const DEVICES = [
  // ---- Apple (matched by logical resolution + DPR; UA hides the model) ----
  { id: "iphone-se1",        brand: "Apple", name: "iPhone SE (1st gen)",        models: [], logical: [320, 568],  dpr: 2, ppi: 326 },
  { id: "iphone-8",          brand: "Apple", name: "iPhone 6/6s/7/8, SE 2/3",    models: [], logical: [375, 667],  dpr: 2, ppi: 326 },
  { id: "iphone-8-plus",     brand: "Apple", name: "iPhone 6+/6s+/7+/8 Plus",    models: [], logical: [414, 736],  dpr: 3, ppi: 401 },
  { id: "iphone-x",          brand: "Apple", name: "iPhone X/XS/11 Pro",         models: [], logical: [375, 812],  dpr: 3, ppi: 458 },
  { id: "iphone-11",         brand: "Apple", name: "iPhone XR/11",               models: [], logical: [414, 896],  dpr: 2, ppi: 326 },
  { id: "iphone-11-pro-max", brand: "Apple", name: "iPhone XS Max/11 Pro Max",   models: [], logical: [414, 896],  dpr: 3, ppi: 458 },
  { id: "iphone-13-mini",    brand: "Apple", name: "iPhone 12/13 mini",          models: [], logical: [375, 812],  dpr: 3, ppi: 476 },
  { id: "iphone-14",         brand: "Apple", name: "iPhone 12/12 Pro/13/14",     models: [], logical: [390, 844],  dpr: 3, ppi: 460 },
  { id: "iphone-14-plus",    brand: "Apple", name: "iPhone 12/13 Pro Max/14+",   models: [], logical: [428, 926],  dpr: 3, ppi: 458 },
  { id: "iphone-16",         brand: "Apple", name: "iPhone 14 Pro/15/15 Pro/16", models: [], logical: [393, 852],  dpr: 3, ppi: 460 },
  { id: "iphone-16-plus",    brand: "Apple", name: "iPhone 14 Pro Max/15+/16+",  models: [], logical: [430, 932],  dpr: 3, ppi: 460 },
  { id: "iphone-16-pro",     brand: "Apple", name: "iPhone 16 Pro",              models: [], logical: [402, 874],  dpr: 3, ppi: 460 },
  { id: "iphone-16-pro-max", brand: "Apple", name: "iPhone 16 Pro Max",          models: [], logical: [440, 956],  dpr: 3, ppi: 460 },

  // ---- Samsung Galaxy S ----
  { id: "galaxy-s8",        brand: "Samsung", name: "Galaxy S8",        models: ["SM-G950"], logical: [360, 740], dpr: 4,     ppi: 568 },
  { id: "galaxy-s8-plus",   brand: "Samsung", name: "Galaxy S8+",       models: ["SM-G955"], logical: [360, 740], dpr: 4,     ppi: 529 },
  { id: "galaxy-s9",        brand: "Samsung", name: "Galaxy S9",        models: ["SM-G960"], logical: [360, 740], dpr: 4,     ppi: 568 },
  { id: "galaxy-s9-plus",   brand: "Samsung", name: "Galaxy S9+",       models: ["SM-G965"], logical: [360, 740], dpr: 4,     ppi: 529 },
  { id: "galaxy-s10e",      brand: "Samsung", name: "Galaxy S10e",      models: ["SM-G970"], logical: [360, 760], dpr: 3,     ppi: 438 },
  { id: "galaxy-s10",       brand: "Samsung", name: "Galaxy S10",       models: ["SM-G973"], logical: [360, 760], dpr: 4,     ppi: 550 },
  { id: "galaxy-s10-plus",  brand: "Samsung", name: "Galaxy S10+",      models: ["SM-G975"], logical: [412, 869], dpr: 3.5,   ppi: 522 },
  { id: "galaxy-s20",       brand: "Samsung", name: "Galaxy S20",       models: ["SM-G980", "SM-G981"], logical: [360, 800], dpr: 3, ppi: 563 },
  { id: "galaxy-s20-plus",  brand: "Samsung", name: "Galaxy S20+",      models: ["SM-G985", "SM-G986"], logical: [384, 854], dpr: 2.81, ppi: 525 },
  { id: "galaxy-s20-ultra", brand: "Samsung", name: "Galaxy S20 Ultra", models: ["SM-G988"], logical: [412, 915], dpr: 3.5,   ppi: 511 },
  { id: "galaxy-s21",       brand: "Samsung", name: "Galaxy S21",       models: ["SM-G991"], logical: [360, 800], dpr: 3,     ppi: 421 },
  { id: "galaxy-s21-plus",  brand: "Samsung", name: "Galaxy S21+",      models: ["SM-G996"], logical: [384, 854], dpr: 2.81,  ppi: 394 },
  { id: "galaxy-s21-ultra", brand: "Samsung", name: "Galaxy S21 Ultra", models: ["SM-G998"], logical: [412, 915], dpr: 3.5,   ppi: 515 },
  { id: "galaxy-s22",       brand: "Samsung", name: "Galaxy S22",       models: ["SM-S901"], logical: [360, 780], dpr: 3,     ppi: 425 },
  { id: "galaxy-s22-plus",  brand: "Samsung", name: "Galaxy S22+",      models: ["SM-S906"], logical: [384, 832], dpr: 2.81,  ppi: 393 },
  { id: "galaxy-s22-ultra", brand: "Samsung", name: "Galaxy S22 Ultra", models: ["SM-S908"], logical: [412, 915], dpr: 3.5,   ppi: 500 },
  { id: "galaxy-s23",       brand: "Samsung", name: "Galaxy S23",       models: ["SM-S911"], logical: [360, 780], dpr: 3,     ppi: 425 },
  { id: "galaxy-s23-plus",  brand: "Samsung", name: "Galaxy S23+",      models: ["SM-S916"], logical: [384, 832], dpr: 2.81,  ppi: 393 },
  { id: "galaxy-s23-ultra", brand: "Samsung", name: "Galaxy S23 Ultra", models: ["SM-S918"], logical: [412, 915], dpr: 3.5,   ppi: 500 },
  { id: "galaxy-s24",       brand: "Samsung", name: "Galaxy S24",       models: ["SM-S921"], logical: [360, 780], dpr: 3,     ppi: 416 },
  { id: "galaxy-s24-plus",  brand: "Samsung", name: "Galaxy S24+",      models: ["SM-S926"], logical: [384, 832], dpr: 2.81,  ppi: 513 },
  { id: "galaxy-s24-ultra", brand: "Samsung", name: "Galaxy S24 Ultra", models: ["SM-S928"], logical: [412, 915], dpr: 3.5,   ppi: 505 },
  { id: "galaxy-s25",       brand: "Samsung", name: "Galaxy S25",       models: ["SM-S931"], logical: [360, 780], dpr: 3,     ppi: 416 },
  { id: "galaxy-s25-ultra", brand: "Samsung", name: "Galaxy S25 Ultra", models: ["SM-S938"], logical: [412, 915], dpr: 3.5,   ppi: 498 },

  // ---- Samsung Note / Z / A ----
  { id: "galaxy-note10",       brand: "Samsung", name: "Galaxy Note 10",       models: ["SM-N970"], logical: [412, 869], dpr: 2.63, ppi: 401 },
  { id: "galaxy-note10-plus",  brand: "Samsung", name: "Galaxy Note 10+",      models: ["SM-N975"], logical: [412, 869], dpr: 3.5,  ppi: 498 },
  { id: "galaxy-note20",       brand: "Samsung", name: "Galaxy Note 20",       models: ["SM-N980", "SM-N981"], logical: [412, 915], dpr: 2.63, ppi: 393 },
  { id: "galaxy-note20-ultra", brand: "Samsung", name: "Galaxy Note 20 Ultra", models: ["SM-N985", "SM-N986"], logical: [412, 908], dpr: 3.5,  ppi: 496 },
  { id: "galaxy-z-flip4",      brand: "Samsung", name: "Galaxy Z Flip4",       models: ["SM-F721"], logical: [412, 1004], dpr: 2.63, ppi: 426 },
  { id: "galaxy-z-flip5",      brand: "Samsung", name: "Galaxy Z Flip5",       models: ["SM-F731"], logical: [412, 1004], dpr: 2.63, ppi: 425 },
  { id: "galaxy-z-flip6",      brand: "Samsung", name: "Galaxy Z Flip6",       models: ["SM-F741"], logical: [412, 1004], dpr: 2.63, ppi: 425 },
  { id: "galaxy-a34",          brand: "Samsung", name: "Galaxy A34",           models: ["SM-A346"], logical: [412, 915], dpr: 2.63, ppi: 390 },
  { id: "galaxy-a52",          brand: "Samsung", name: "Galaxy A52/A52s",      models: ["SM-A525", "SM-A528"], logical: [412, 915], dpr: 2.63, ppi: 407 },
  { id: "galaxy-a53",          brand: "Samsung", name: "Galaxy A53",           models: ["SM-A536"], logical: [412, 915], dpr: 2.63, ppi: 405 },
  { id: "galaxy-a54",          brand: "Samsung", name: "Galaxy A54",           models: ["SM-A546"], logical: [412, 915], dpr: 2.63, ppi: 403 },
  { id: "galaxy-a55",          brand: "Samsung", name: "Galaxy A55",           models: ["SM-A556"], logical: [412, 915], dpr: 2.63, ppi: 390 },

  // ---- Google Pixel ----
  { id: "pixel-4a",       brand: "Google", name: "Pixel 4a",       models: ["Pixel 4a"],       logical: [393, 851], dpr: 2.75, ppi: 443 },
  { id: "pixel-5",        brand: "Google", name: "Pixel 5",        models: ["Pixel 5"],        logical: [393, 851], dpr: 2.75, ppi: 432 },
  { id: "pixel-6",        brand: "Google", name: "Pixel 6",        models: ["Pixel 6"],        logical: [412, 915], dpr: 2.63, ppi: 411 },
  { id: "pixel-6-pro",    brand: "Google", name: "Pixel 6 Pro",    models: ["Pixel 6 Pro"],    logical: [412, 892], dpr: 3.5,  ppi: 512 },
  { id: "pixel-6a",       brand: "Google", name: "Pixel 6a",       models: ["Pixel 6a"],       logical: [412, 915], dpr: 2.63, ppi: 429 },
  { id: "pixel-7",        brand: "Google", name: "Pixel 7",        models: ["Pixel 7"],        logical: [412, 915], dpr: 2.63, ppi: 416 },
  { id: "pixel-7-pro",    brand: "Google", name: "Pixel 7 Pro",    models: ["Pixel 7 Pro"],    logical: [412, 892], dpr: 3.5,  ppi: 512 },
  { id: "pixel-7a",       brand: "Google", name: "Pixel 7a",       models: ["Pixel 7a"],       logical: [412, 915], dpr: 2.63, ppi: 429 },
  { id: "pixel-8",        brand: "Google", name: "Pixel 8",        models: ["Pixel 8"],        logical: [412, 915], dpr: 2.63, ppi: 428 },
  { id: "pixel-8-pro",    brand: "Google", name: "Pixel 8 Pro",    models: ["Pixel 8 Pro"],    logical: [412, 916], dpr: 2.63, ppi: 489 },
  { id: "pixel-8a",       brand: "Google", name: "Pixel 8a",       models: ["Pixel 8a"],       logical: [412, 915], dpr: 2.63, ppi: 430 },
  { id: "pixel-9",        brand: "Google", name: "Pixel 9",        models: ["Pixel 9"],        logical: [412, 923], dpr: 2.63, ppi: 422 },
  { id: "pixel-9-pro",    brand: "Google", name: "Pixel 9 Pro",    models: ["Pixel 9 Pro"],    logical: [412, 923], dpr: 3,    ppi: 495 },
  { id: "pixel-9-pro-xl", brand: "Google", name: "Pixel 9 Pro XL", models: ["Pixel 9 Pro XL"], logical: [412, 924], dpr: 3.5,  ppi: 486 },

  // ---- OnePlus ----
  { id: "oneplus-8t",     brand: "OnePlus", name: "OnePlus 8T",     models: ["KB2000", "KB2003", "KB2005"], logical: [412, 919], dpr: 2.63, ppi: 402 },
  { id: "oneplus-9",      brand: "OnePlus", name: "OnePlus 9",      models: ["LE2110", "LE2113", "LE2115"], logical: [412, 919], dpr: 2.63, ppi: 402 },
  { id: "oneplus-9-pro",  brand: "OnePlus", name: "OnePlus 9 Pro",  models: ["LE2120", "LE2123", "LE2125"], logical: [412, 919], dpr: 3.5,  ppi: 525 },
  { id: "oneplus-10-pro", brand: "OnePlus", name: "OnePlus 10 Pro", models: ["NE2210", "NE2213", "NE2215"], logical: [412, 919], dpr: 3.5,  ppi: 525 },
  { id: "oneplus-11",     brand: "OnePlus", name: "OnePlus 11",     models: ["CPH2447", "CPH2449", "PHB110"], logical: [412, 919], dpr: 3.5, ppi: 525 },
  { id: "oneplus-12",     brand: "OnePlus", name: "OnePlus 12",     models: ["CPH2573", "CPH2581", "PJD110"], logical: [412, 919], dpr: 3.5, ppi: 510 },
  { id: "oneplus-nord2",  brand: "OnePlus", name: "OnePlus Nord 2", models: ["DN2101", "DN2103"], logical: [412, 915], dpr: 2.63, ppi: 409 },

  // ---- Xiaomi / Redmi / POCO ----
  { id: "redmi-note-10-pro", brand: "Xiaomi", name: "Redmi Note 10 Pro", models: ["M2101K6G", "M2101K6B"], logical: [393, 873], dpr: 2.75, ppi: 395 },
  { id: "redmi-note-11",     brand: "Xiaomi", name: "Redmi Note 11",     models: ["2201117TG", "2201117TY"], logical: [393, 873], dpr: 2.75, ppi: 409 },
  { id: "redmi-note-12",     brand: "Xiaomi", name: "Redmi Note 12",     models: ["23021RAAEG", "23021RAA2Y"], logical: [393, 873], dpr: 2.75, ppi: 395 },
  { id: "redmi-note-13",     brand: "Xiaomi", name: "Redmi Note 13",     models: ["23124RA7EO", "2312DRA50G"], logical: [393, 873], dpr: 2.75, ppi: 395 },
  { id: "xiaomi-mi-11",      brand: "Xiaomi", name: "Xiaomi Mi 11",      models: ["M2011K2G", "M2011K2C"], logical: [412, 919], dpr: 3.5, ppi: 515 },
  { id: "xiaomi-12",         brand: "Xiaomi", name: "Xiaomi 12",         models: ["2201123G", "2201123C"], logical: [390, 844], dpr: 3,   ppi: 419 },
  { id: "xiaomi-13",         brand: "Xiaomi", name: "Xiaomi 13",         models: ["2211133G", "2211133C"], logical: [393, 851], dpr: 2.75, ppi: 414 },
  { id: "xiaomi-14",         brand: "Xiaomi", name: "Xiaomi 14",         models: ["23127PN0CG", "23127PN0CC"], logical: [393, 852], dpr: 3, ppi: 460 },
  { id: "poco-x3",           brand: "Xiaomi", name: "POCO X3 (NFC/Pro)", models: ["M2007J20CG", "M2102J20SG"], logical: [393, 873], dpr: 2.75, ppi: 395 },
  { id: "poco-f3",           brand: "Xiaomi", name: "POCO F3",           models: ["M2012K11AG"], logical: [393, 873], dpr: 2.75, ppi: 395 },
  { id: "poco-f5",           brand: "Xiaomi", name: "POCO F5",           models: ["23049PCD8G"], logical: [393, 873], dpr: 2.75, ppi: 395 },

  // ---- Others ----
  { id: "huawei-p20",       brand: "Huawei",   name: "P20",             models: ["EML-L09", "EML-L29"], logical: [360, 748], dpr: 3, ppi: 408 },
  { id: "huawei-p30",       brand: "Huawei",   name: "P30",             models: ["ELE-L09", "ELE-L29"], logical: [360, 780], dpr: 3, ppi: 422 },
  { id: "huawei-p30-pro",   brand: "Huawei",   name: "P30 Pro",         models: ["VOG-L09", "VOG-L29"], logical: [360, 780], dpr: 3, ppi: 398 },
  { id: "huawei-mate20pro", brand: "Huawei",   name: "Mate 20 Pro",     models: ["LYA-L09", "LYA-L29"], logical: [360, 780], dpr: 4, ppi: 538 },
  { id: "oppo-find-x5-pro", brand: "Oppo",     name: "Find X5 Pro",     models: ["CPH2305"], logical: [412, 919], dpr: 3.5,  ppi: 526 },
  { id: "oppo-reno8",       brand: "Oppo",     name: "Reno8",           models: ["CPH2359"], logical: [393, 873], dpr: 2.75, ppi: 411 },
  { id: "moto-g84",         brand: "Motorola", name: "Moto G84",        models: ["moto g84 5G", "XT2347"], logical: [393, 873], dpr: 2.75, ppi: 402 },
  { id: "moto-edge-40",     brand: "Motorola", name: "Edge 40",         models: ["motorola edge 40", "XT2303"], logical: [360, 800], dpr: 3, ppi: 429 },
  { id: "nothing-phone-1",  brand: "Nothing",  name: "Phone (1)",       models: ["A063"], logical: [412, 915], dpr: 2.63, ppi: 402 },
  { id: "nothing-phone-2",  brand: "Nothing",  name: "Phone (2)",       models: ["A065"], logical: [412, 915], dpr: 2.63, ppi: 394 },
  { id: "nothing-phone-2a", brand: "Nothing",  name: "Phone (2a)",      models: ["A142"], logical: [412, 915], dpr: 2.63, ppi: 394 },
  { id: "fairphone-4",      brand: "Fairphone", name: "Fairphone 4",    models: ["FP4"], logical: [360, 800], dpr: 3, ppi: 410 },
  { id: "fairphone-5",      brand: "Fairphone", name: "Fairphone 5",    models: ["FP5"], logical: [393, 851], dpr: 2.75, ppi: 459 },
  { id: "sony-xperia-5iv",  brand: "Sony",     name: "Xperia 5 IV",     models: ["XQ-CQ54", "XQ-CQ62"], logical: [360, 840], dpr: 3, ppi: 449 },
  { id: "sony-xperia-1iv",  brand: "Sony",     name: "Xperia 1 IV",     models: ["XQ-CT54", "XQ-CT62"], logical: [360, 840], dpr: 4.35, ppi: 643 },
];

export function getDeviceById(id) {
  return DEVICES.find((d) => d.id === id) || null;
}

export function searchDevices(query) {
  const q = query.trim().toLowerCase();
  if (!q) return DEVICES;
  return DEVICES.filter((d) =>
    `${d.brand} ${d.name} ${d.models.join(" ")}`.toLowerCase().includes(q)
  );
}

function isIOS() {
  return (
    /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function matchByModelString(model) {
  if (!model) return null;
  const m = model.trim().toLowerCase();
  if (!m) return null;
  for (const d of DEVICES) {
    for (const code of d.models) {
      const c = code.toLowerCase();
      // SM-S918B should match the "SM-S918" entry; "Pixel 7 Pro" must not match "Pixel 7"
      if (m === c || (c.includes("-") && m.startsWith(c))) return d;
    }
  }
  // second pass: prefix codes without dash (exactness handled above)
  for (const d of DEVICES) {
    for (const code of d.models) {
      const c = code.toLowerCase();
      if (m.startsWith(c) && !DEVICES.some((o) => o !== d && o.models.some((x) => m.startsWith(x.toLowerCase()) && x.length > code.length))) {
        return d;
      }
    }
  }
  return null;
}

function androidModelFromUA() {
  const ua = navigator.userAgent;
  const m = ua.match(/Android [\d.]+;\s*([^;)]+?)(?:\s+Build\/|\))/);
  return m ? m[1].trim() : null;
}

function matchIOSByScreen() {
  const w = Math.min(screen.width, screen.height);
  const h = Math.max(screen.width, screen.height);
  const dpr = window.devicePixelRatio || 1;
  const hits = DEVICES.filter(
    (d) => d.brand === "Apple" && d.logical[0] === w && d.logical[1] === h && Math.abs(d.dpr - dpr) < 0.01
  );
  if (!hits.length) return null;
  // entries already merge same-PPI models, so a single hit is authoritative
  return hits[0];
}

// Returns { device, method } or null. method: "ua-ch" | "ua" | "screen"
export async function detectDevice() {
  if (isIOS()) {
    const device = matchIOSByScreen();
    return device ? { device, method: "screen" } : null;
  }
  if (navigator.userAgentData?.getHighEntropyValues) {
    try {
      const { model } = await navigator.userAgentData.getHighEntropyValues(["model"]);
      const device = matchByModelString(model);
      if (device) return { device, method: "ua-ch" };
    } catch {
      /* fall through to UA parsing */
    }
  }
  const device = matchByModelString(androidModelFromUA());
  return device ? { device, method: "ua" } : null;
}
