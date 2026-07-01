# Handy Tool

A fullscreen, installable Progressive Web App that turns your smartphone into a measuring instrument:

- **Ruler** along the right screen edge with true-to-scale cm/mm ticks. The phone model is auto-detected (Android model string / iPhone screen signature) and its real pixel density drives the scale. If detection fails you can pick your model from the built-in database, enter screen diagonal + resolution, or calibrate against a credit card (85.60 mm).
- **Compass** with a rotating dial and numeric magnetic heading.
- **Spirit level (Wasserwaage)**: a 2D bubble level with numeric pitch/roll while the phone lies flat; when tilted past 45° it switches to a bar level showing the angle of the edge touching the table, with an indicator for which edge that is.

The UI is language-free — icons and numbers only.

## Hosting

Served from GitHub Pages via `.github/workflows/pages.yml`. One-time setup after the first push: **Settings → Pages → Source: GitHub Actions**. The app then lives at `https://<user>.github.io/handy_tool/`.

Sensor APIs (compass/level) require HTTPS and, on iOS, a one-tap permission prompt on first launch. Install it from the browser menu ("Add to Home Screen") for the fullscreen experience; it works offline after the first visit.

## Development

Plain static site — no build step. Serve locally with any static server, e.g.:

```
python3 -m http.server 8123
```

Chrome DevTools → Sensors panel can emulate orientation for the level; the compass needs real hardware (`webkitCompassHeading` / `deviceorientationabsolute` are not emulated).
