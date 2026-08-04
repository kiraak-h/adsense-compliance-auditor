# AdSense Compliance Auditor

An automated compliance auditing tool for AdSense implementations.

## Installation

### Claude Web Projects

1. Upload `adsense-global-audit-skill.md` to your Claude Web Project.
2. Add `adsense-updates.txt` to the project knowledge base.

### Local CLAUDE.md

Add the contents of `adsense-global-audit-skill.md` to your repository's `CLAUDE.md` or `.cursorrules` file.

## System Architecture

```text
+-----------------------+
|                       |
|   Google AdSense      |
|   Policy Updates      |
|                       |
+-----------+-----------+
            |
            v
+-----------------------+      +-----------------------+
|                       |      |                       |
|  adsense-updates.txt  +----->+ adsense-global-audit- |
|                       |      | skill.md              |
+-----------------------+      |                       |
                               +-----------+-----------+
                                           |
                                           v
                               +-----------------------+
                               |                       |
                               |  Your Website Code    |
                               |  (HTML, JS, CSS)      |
                               +-----------------------+
```

## 📖 How to Clear AdSense Warnings & Run Scans

### 1. Execute the IVT Monitor

If you receive an Invalid Traffic (IVT) or click-bombing warning, instantly run the included shell script against your server logs:

```bash
bash monitor-traffic-ivt.sh
```

This will parse the NGINX access logs and flag any malicious IPs exceeding the configured velocity thresholds.

### 2. Validate Layout Proximity (Click-jacking)

Accidental click warnings are often caused by poor layout spacing.

- Ensure all interactive elements (menus, buttons) maintain a safe margin (e.g., `150px`) from ad units.
- Implement the `premium_anti_cls_wrapper.html` code block to secure your placement zones.

### 3. Verify Consent and Policy Compliance

If AdSense restricts serving due to CMP or privacy policy violations:

- Walk through the `consent-banner-checklist.md` to ensure your CMP framework satisfies TCF v2.2 and GDPR.
- Update your legal pages using the `privacy-policy-template.md` to explicitly declare DART cookie tracking.
- Verify that `ads.txt` is successfully hosted at your domain root with your live publisher ID.
