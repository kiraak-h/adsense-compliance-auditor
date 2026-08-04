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

This guide explains how to use the specific files inside this repository to clear Google AdSense dashboard warnings and audit your new code templates cleanly.

---

### 🛠️ Part 1: Clearing Out AdSense Dashboard Warnings

#### 1. Resolving the "Earnings at risk" ads.txt Alert

* **The Issue**: Google displays an alert stating you need to fix issues with your `ads.txt` file to prevent severe revenue loss.
* **The Fix**:
  1. Open your copy of the `ads.txt` file from this repository.
  2. Copy the initialization line: `google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0`.
  3. Swap the `pub-0000000000000000` placeholder out for your true, private **AdSense Publisher ID** (found inside your AdSense Account console panel).
  4. Upload this file directly to your website server's absolute root directory so it registers live at: `https://yourwebsite.com`. Google's crawlers will scan it and clear the alert within 24 to 48 hours.

#### 2. Resolving "Cumulative Layout Shift (CLS)" Code Flags

* **The Issue**: Dynamic ad placements inject themselves into your site frames unpredictably, pushing content downward and causing policy strikes for accidental click risks.
* **The Fix**:
  1. Copy the complete structural layout code inside `premium_anti_cls_wrapper.html`.
  2. Paste this wrapper directly into your target website HTML files where ads are intended to populate.
  3. Swap out the template publisher ID (`ca-pub-0000000000000000`) with your actual ID. The code reserves a static vertical spacing boundary window beforehand, stabilizing page rendering.

---

### 🤖 Part 2: Running Pre-Application Scans in Claude

Before launching a new web domain or deploying ad scripts onto a fresh page, you can use your custom Claude Skill to scan your project metadata for active program violations.

#### Step 1: Initialize the Audit Engine

Open a brand-new chat interface with Claude. Copy and paste the entire markdown code block from your `adsense-global-audit-skill.md` file into the prompt area, adding this instruction tag at the top:

```text
Initialize this Master Skill Engine into your session memory. Acknowledge when ready.
```

*Claude will process the parameters and reply confirming it is waiting for your property profile inputs.*

#### Step 2: Ingest Your Website or Application Profiles

Drop your raw layout dimensions, metadata descriptions, or layout logs directly into the prompt thread. For example:

```text
Analyze my new web layout using the loaded engine modules:
- Total Indexable Articles: 7 posts (averaging 380 words per node)
- Navigation Layout: Standard dropdown menu resting 4px above an active display ad script container.
- Legal Pages: "Contact Us" is active; "Privacy Policy" document is unbuilt.
```

#### Step 3: Parse the Generated Compliance Report

The loaded engine will parse your metrics instantly and return a structured report highlighting your exact technical flaws before you apply your live AdSense ID:

* **Low-Value Content Risk**: It will flag that your 7 thin articles fail Google's baseline 15+ rich post threshold.
* **Proximity Violation**: It will highlight the 4px navigation margin as a massive accidental click liability.
* **Missing Governance**: It will issue a critical warning to insert a Cookie-compliant Privacy Policy block immediately.
