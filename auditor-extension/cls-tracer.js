/**
 * CLS Tracer - Live Cumulative Layout Shift Overlay
 * Injected via Auditor Pro Extension
 */
let clsValue = 0;
let clsEntries = [];

let sessionValue = 0;
let sessionEntries = [];

const observer = new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) {
      const firstSessionEntry = sessionEntries[0];
      if (sessionValue && entry.startTime - firstSessionEntry.startTime < 5000 && entry.startTime - sessionEntries[sessionEntries.length - 1].startTime < 1000) {
        sessionValue += entry.value;
        sessionEntries.push(entry);
      } else {
        sessionValue = entry.value;
        sessionEntries = [entry];
      }
      if (sessionValue > clsValue) {
        clsValue = sessionValue;
        clsEntries = sessionEntries;
        updateHud();
      }
    }
  }
});

observer.observe({ type: 'layout-shift', buffered: true });

function injectHud() {
  const hud = document.createElement('div');
  hud.id = 'cls-tracer-hud';
  hud.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(56, 189, 248, 0.4);
    backdrop-filter: blur(8px);
    color: #38bdf8;
    padding: 12px 16px;
    border-radius: 8px;
    font-family: monospace;
    font-size: 14px;
    z-index: 2147483647;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    pointer-events: none;
    transition: all 0.3s;
  `;
  hud.innerHTML = `<strong>CLS Tracer:</strong> <span id="cls-score" style="color:#4ade80">0.000</span>`;
  document.body.appendChild(hud);
}

function updateHud() {
  const scoreSpan = document.getElementById('cls-score');
  if (!scoreSpan) return;
  scoreSpan.textContent = clsValue.toFixed(4);
  if (clsValue > 0.1 && clsValue <= 0.25) {
    scoreSpan.style.color = '#fbbf24'; // Needs Improvement
  } else if (clsValue > 0.25) {
    scoreSpan.style.color = '#ef4444'; // Poor
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectHud);
} else {
  injectHud();
}
