# AdSense Compliance Auditor

The AdSense Compliance Auditor is a powerful toolkit for publishers and digital marketers to ensure their layout, monetization, and regulatory strategies are fully compliant with Google policies and modern advertising standards.

## Features

### Auditor Web Application
- **Visual Padding Simulator**: Preview AdSense container clearance rules dynamically to prevent clickjacking risks.
- **RPM Calculator**: Estimate revenue lifts achieved through compliant spacing and layout optimizations.
- **Ads.txt Generator**: Quickly construct and download a custom `ads.txt` payload formatted perfectly for Google direct inventory.

### Premium Chrome Developer Extension
*Officially listed and categorized under Software Development in the commercial storefront directory.*

The AdSense & Monetization Compliance Auditor Pro extension runs client-side diagnostics right inside your browser:
- **Scan Active DOM Spacing**: Dynamically analyzes the active webpage's layout to identify dangerously low margin/padding boundaries around ad-containers (<15px).
- **Verify Domain Ads.txt**: Crawls the active domain's root to ensure an active, standard verification record is present.
- **Terminal UI**: A sleek, system-UI hacker console provides live output logs directly in the popup extension window.

## Installation & Deployment

The Web Application is built with React, Vite, Tailwind v4, and Three.js, and is automatically deployed via GitHub Actions.

To use the Developer Extension locally:
1. Download the `auditor-extension` folder.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer Mode**.
4. Click **Load Unpacked** and select the extension directory.
