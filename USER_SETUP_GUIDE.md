# 🚀 Multi-User Setup & Deployment Guide

This guide outlines exactly how external developers and publishers can set up and run the **AdSense Compliance Auditor Engine** inside their own workflows.

---

### 🌐 Setup Option 1: Inside the Web Browser (Claude Pro / Team Projects)
*Best for users who want a permanent, dedicated workspace for continuous tracking of their websites or mobile apps.*

1. Log into your account at [claude.ai](https://claude.ai) and click on **Projects** in the left-hand navigation sidebar.
2. Click **Create Project** and name it `AdSense Optimization Workspace`.
3. In the right-hand panel of your new project view, click **Set Custom Instructions**.
4. Navigate to this repository, copy the entire raw codebase from [`adsense-global-audit-skill.md`](./adsense-global-audit-skill.md), paste it into the custom instructions text field, and click **Save**.
5. *(Optional)*: Download the [`adsense-updates.txt`](./adsense-updates.txt) tracking file from this repo and upload it into your Claude Project's **Knowledge** directory to easily pass future Google policy update logs into your session.

---

### 💬 Setup Option 2: Directly in a Live Chat Box (Free & Pro Accounts)
*Best for users who want to run a fast, single-session compliance audit on a code string or traffic sheet without creating a full project archive.*

1. Open any standard, fresh chat window layout at [claude.ai](https://claude.ai).
2. Copy the full markdown text block from the [`adsense-global-audit-skill.md`](./adsense-global-audit-skill.md) file inside this repository.
3. Paste the entire block into the empty Claude chat box, add this explicit initialization instruction to the very top line, and press enter:
   ```text
   Initialize this master compliance skill into your session memory. Acknowledge when ready.
   ```
4. Once Claude responds confirming the engine logic has successfully initialized, drop in your website URLs, raw HTML layout templates, or AdMob data logs to receive an automated compliance audit.

---

### 💻 Setup Option 3: Local Coding Workspace (Claude Desktop / App / CLI)
*Best for software engineers who want Claude to automatically enforce ad spacing padding, layout boundaries, and content metrics directly inside their IDE platform as they code.*

1. Open your terminal and navigate to the absolute root directory of your website or mobile application source code workspace.
2. Initialize a brand new text file named exactly `CLAUDE.md`.
3. Paste the complete command suite from [`adsense-global-audit-skill.md`](./adsense-global-audit-skill.md) directly into that file and save it.
4. When launching Claude Desktop, running native IDE AI plugins (such as Cursor or VS Code extensions), or executing terminal agents within that folder, the runtime will read your `CLAUDE.md` ruleset automatically and enforce compliance parameters during code generation loops.
