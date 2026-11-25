# COMP 484 Homework 10 — Chrome DevTools Lab

This is a copy of Project 2 with an integrated Chrome DevTools practice lab. The original Project 2 folder remains unchanged.

## Run locally

Use a local web server so the intentional missing image produces a real HTTP 404 response:

```powershell
py -m http.server 8000
```

Then open `http://localhost:8000` in Chrome and press `F12`.

## What is implemented

- Console API examples: `console.info()`, `console.log()`, `console.warn()`, `console.error()`, `console.table()`, `console.group()` / `console.groupEnd()`, and styled `%c` output.
- Browser-generated diagnostics: a missing image request (404), an uncaught `TypeError`, and a deliberately long click handler that produces a performance violation.
- Filtering targets: distinct levels and the searchable prefixes `BENJI_FILTER`, `BENJI_INFO`, and `BENJI_WARN`, plus messages from `script.js` and a network 404.
- Sources workflow: `calculateTreatReward()` contains one intentional multiplication bug. The page expects 6 but initially displays 20.

## Intentional bug fix

First capture the reproduction and paused-state screenshots. Set a breakpoint on the `totalTreats` assignment inside `calculateTreatReward()`. Inspect `baseTreats` and `bonusMultiplier`, then change:

```js
var totalTreats = baseTreats * 10;
```

to:

```js
var totalTreats = baseTreats * bonusMultiplier;
```

Reload and run the calculation again. The result box will turn green and report 6.

## Screenshot checklist

See `SCREENSHOT-GUIDE.md` for the exact sequence and suggested PDF labels.
