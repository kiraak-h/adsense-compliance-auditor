# User Consent & Regulatory Compliance Checklist

## 1. Google Certified CMP Requirements
- [ ] **Certified Provider**: The website/app must utilize a framework certified by Google (e.g., Google Funding Choices, Cookiebot, OneTrust).
- [ ] **IAB TCF v2.2 Integration**: Verify that the Consent Management Platform correctly transmits the standardized Transparency and Consent Framework strings to the `adsbygoogle.js` script.

## 2. EEA & UK Regulations (GDPR)
- [ ] **Symmetric Choices**: The "Reject All" button must match the visual weight, color contrast, and font size of the "Accept All" button to prevent dark pattern strikes.
- [ ] **Granular Options**: Users must have the ability to toggle specific data-processing purposes (e.g., personalized ads, basic measurements) inside a "Manage Options" panel.
- [ ] **Persistent Revocation**: A visible link or sticky widget (e.g., "Privacy Settings") must remain accessible on every page to allow users to withdraw consent at any time.

## 3. US State Regulations (CCPA/CPRA)
- [ ] **Footer Opt-Out Link**: The website footer must feature a conspicuous link reading exactly: *"Do Not Sell or Share My Personal Information"*.
- [ ] **Global Privacy Control (GPC)**: The infrastructure must automatically recognize and honor automated GPC browser signals without requiring manual user input.
