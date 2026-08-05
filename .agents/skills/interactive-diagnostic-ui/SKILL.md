---
name: interactive-diagnostic-ui
description: How to build native mock-terminal UIs for live frontend diagnostics and compliance auditing (using JS/Fetch and corsproxy.io)
---

# Interactive Diagnostic UI Pattern

Whenever tasked with porting backend/CLI scripts (like Python validators) into a native frontend web application, follow this established pattern to provide a realistic, CLI-style output directly in the browser.

## The Terminal Box Component

1. **HTML Structure**:
   ```html
   <div class="scan-container">
       <div class="scan-bar">
           <input type="text" id="scan_input" placeholder="Enter target...">
           <button class="btn-scan" onclick="runDiagnostic()">Run Scan</button>
       </div>
       <div class="terminal-box" id="terminal_output"></div>
   </div>
   ```

2. **CSS Styling (The "Terminal" Look)**:
   ```css
   .terminal-box {
       background: #000;
       color: #fff;
       font-family: 'Courier New', Courier, monospace;
       padding: 1rem;
       border-radius: 6px;
       min-height: 150px;
       max-height: 300px;
       overflow-y: auto;
       display: none;
       font-size: 0.9rem;
       line-height: 1.4;
   }
   .terminal-box.active { display: block; }

   /* Risk Classification Colors */
   .term-red { color: #ef4444; }    /* Critical Risks / Failures */
   .term-yellow { color: #f59e0b; } /* Warnings / Thin Content */
   .term-green { color: #10b981; }  /* Verified Compliance / Success */
   .term-blue { color: #3b82f6; }   /* Info / Status Execution */
   ```

## Asynchronous Fetch & CORS Proxy Integration

When scraping external sites (e.g., `ads.txt` or raw HTML) directly from the client side, strict CORS policies will block native `fetch()` calls. 

**Standard Solution**: Route requests through `corsproxy.io`.
```javascript
const proxyBase = "https://corsproxy.io/?key=75ac2cfe&url=";
const targetUrl = encodeURIComponent(`https://${domain}/target-file`);

const response = await fetch(proxyBase + targetUrl);
if (response.ok) {
    const text = await response.text();
    // Parse logic here...
}
```

## Traceable Ledger
*Created to standardize the translation of `validate_ads.py` and `content_depth_scanner.py` CLI tools into native JavaScript components within `index.html`.*
