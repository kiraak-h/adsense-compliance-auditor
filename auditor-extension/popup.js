document.addEventListener("DOMContentLoaded", function () {
  const scanDomBtn = document.getElementById("scan-dom-btn");
  const verifyAdsBtn = document.getElementById("verify-ads-btn");
  const resultsPanel = document.getElementById("results-panel");

  // 1. DOM Element Spacing Scanner Trigger
  scanDomBtn.addEventListener("click", async () => {
    resultsPanel.innerHTML = "<p class='loading'>> Inspecting layout safety margins...</p>";
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: runDomAudit
    }, (results) => {
      if (results && results[0] && results[0].result) {
        renderResults(results[0].result);
      } else {
        resultsPanel.innerHTML = "<p class='error'>❌ Internal scripting error. Try refreshing the active webpage.</p>";
      }
    });
  });

  // 2. Automated Server Ads.txt Verification Trigger
  verifyAdsBtn.addEventListener("click", async () => {
    resultsPanel.innerHTML = "<p class='loading'>> Crawling domain root for verification documents...</p>";
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = new URL(tab.url);
    const adsTxtUrl = `${url.protocol}//${url.hostname}/ads.txt`;

    try {
      const response = await fetch(adsTxtUrl, { method: 'HEAD', timeout: 5000 });
      if (response.ok) {
        resultsPanel.innerHTML = `<p class='success'>✅ SUCCESS: Active ads.txt file verified live at root destination.<br><span class='dim'>Target: ${url.hostname}/ads.txt</span></p>`;
      } else {
        resultsPanel.innerHTML = `<p class='error'>❌ CRITICAL: Server returned status code ${response.status}. Property missing standard verification records.</p>`;
      }
    } catch (err) {
      resultsPanel.innerHTML = `<p class='error'>❌ NETWORK FAILURE: Domain destination timed out or block active.</p>`;
    }
  });

  // 3. Live CLS Tracer
  const launchClsBtn = document.getElementById("launch-cls-btn");
  launchClsBtn.addEventListener("click", async () => {
    resultsPanel.innerHTML = "<p class='loading'>> Injecting CLS PerformanceObserver...</p>";
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['cls-tracer.js']
    }, () => {
      resultsPanel.innerHTML = "<p class='success'>🚀 CLS Tracer injected! Watch the viewport HUD and shift borders.</p>";
    });
  });

  function renderResults(data) {
    if (data.violations.length === 0) {
      resultsPanel.innerHTML = "<p class='success'>🎉 COMPLIANCE PASSED: All monitored layout nodes match standard padding rules.</p>";
    } else {
      let logHtml = `<p class='warning'>⚠️ THE ENGINE DETECTED ${data.violations.length} COMPLIANCE FLAWS:</p><ul>`;
      data.violations.forEach(v => {
        logHtml += `<li><span class='highlight'>${v.element}</span> padding is deficient at <span class='risk'>${v.padding}</span></li>`;
      });
      logHtml += "</ul>";
      resultsPanel.innerHTML = logHtml;
    }
  }
});

// Content execution block run directly inside user tab context
function runDomAudit() {
  const elements = document.querySelectorAll("header, nav, aside, .ad-container");
  let violations = [];
  
  elements.forEach(el => {
    const style = window.getComputedStyle(el);
    const paddingBottom = parseInt(style.paddingBottom) || 0;
    const marginBottom = parseInt(style.marginBottom) || 0;
    const totalSpacing = paddingBottom + marginBottom;
    
    if (totalSpacing > 0 && totalSpacing < 15) {
      violations.push({
        element: el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ')[0] : ''),
        padding: totalSpacing + "px"
      });
    }
  });
  
  return { violations: violations };
}
