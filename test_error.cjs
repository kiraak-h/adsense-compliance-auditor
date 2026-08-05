const puppeteer = require('puppeteer-core');
const { spawn } = require('child_process');

(async () => {
  const viteProcess = spawn('npx', ['vite', '--port', '5173', '--host'], { stdio: 'ignore', shell: true });
  
  // Wait for Vite to start
  await new Promise(r => setTimeout(r, 3000));
  
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });
  
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.goto('http://localhost:5173/adsense-compliance-auditor/', { waitUntil: 'networkidle0' });
  
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
  viteProcess.kill();
  process.exit(0);
})();
