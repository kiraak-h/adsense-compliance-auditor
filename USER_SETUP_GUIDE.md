# Comprehensive User Setup Guide

Welcome to the AdSense Compliance Auditor engine. Follow one of the three initialization options below depending on your operational environment.

## Option 1: Claude Web Projects (Recommended for Teams)
For team workspaces and persistent memory across multiple chats.

1. Create a new "Project" in the Claude Web Interface.
2. Navigate to the project's **Knowledge** tab.
3. Upload `adsense-global-audit-skill.md` as a primary document.
4. Upload `adsense-updates.txt` to provide the engine with the latest policy context.
5. Define your Custom Instructions to default to the audit engine framework when analyzing web code.

## Option 2: Direct Chat Box Initialization (Recommended for Quick Scans)
For instant, one-off compliance checks without a dedicated project workspace.

1. Open a new chat session with Claude.
2. Copy the entire contents of `adsense-global-audit-skill.md`.
3. Paste it directly into the prompt box, prepended with:
   `Initialize this Master Skill Engine into your session memory. Acknowledge when ready.`
4. Wait for Claude to acknowledge the load before passing your HTML layouts or configuration metrics.

## Option 3: Local CLAUDE.md Workspaces (Recommended for Developers)
For local development environments using Cursor, GitHub Copilot, or Antigravity IDE.

1. Clone this repository into your local workspace.
2. Copy the ruleset inside `adsense-global-audit-skill.md`.
3. Paste the contents directly into your repository's root `CLAUDE.md`, `.cursorrules`, or `.agents/skills` framework.
4. Your local AI assistant will automatically inherit the compliance engine rules for all code generation and review tasks.
