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
