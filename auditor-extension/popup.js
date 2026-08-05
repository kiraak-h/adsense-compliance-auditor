document.addEventListener('DOMContentLoaded', () => {
  const btnScan = document.getElementById('btn-scan');
  const btnVerify = document.getElementById('btn-verify');
  const output = document.getElementById('output');

  function log(msg, color = '#38bdf8') {
    const span = document.createElement('span');
    span.style.color = color;
    span.textContent = msg + '\n';
    output.appendChild(span);
    output.scrollTop = output.scrollHeight;
  }

  function clearLog() {
    output.innerHTML = '';
  }

  btnScan.addEventListener('click', async () => {
    clearLog();
    log('Initializing DOM padding analysis...', '#94a3b8');
    
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || tab.url.startsWith('chrome://')) {
        log('Error: Cannot scan internal chrome pages.', '#ef4444');
        return;
      }

      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });

      if (results && results[0] && results[0].result) {
        const res = results[0].result;
        if (res.error) {
          log('Error: ' + res.error, '#ef4444');
        } else {
          log(`Scan complete. Analyzed ${res.totalElements} nodes.`);
          if (res.risks > 0) {
            log(`CRITICAL: Found ${res.risks} layout elements with <15px padding/margin. Clickjacking risk detected!`, '#ef4444');
          } else {
            log('SUCCESS: All elements passed proximity checks (>15px).', '#10b981');
          }
        }
      }
    } catch (e) {
      log('Execution failed: ' + e.message, '#ef4444');
    }
  });

  btnVerify.addEventListener('click', async () => {
    clearLog();
    log('Verifying domain ads.txt...', '#94a3b8');

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || tab.url.startsWith('chrome://')) {
        log('Error: Invalid tab.', '#ef4444');
        return;
      }

      const urlObj = new URL(tab.url);
      const rootUrl = urlObj.protocol + '//' + urlObj.hostname + '/ads.txt';
      log(`Fetching ${rootUrl}...`);

      const response = await fetch(rootUrl);
      if (!response.ok) {
        log(`CRITICAL: Server returned ${response.status}`, '#ef4444');
        return;
      }

      const text = await response.text();
      const hasGoogle = text.toLowerCase().includes('google.com');
      const hasDirect = text.toLowerCase().includes('direct');

      log(`✅ Found ads.txt (${text.length} bytes)`, '#10b981');
      if (hasGoogle && hasDirect) {
        log('✅ Valid Google Direct inventory detected.', '#10b981');
      } else {
        log('⚠️ Warning: Missing Google or Direct records.', '#f59e0b');
      }
    } catch (e) {
      log('Network Error: ' + e.message, '#ef4444');
    }
  });
});
