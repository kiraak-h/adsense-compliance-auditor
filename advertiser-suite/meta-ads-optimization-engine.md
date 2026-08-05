# 🛡️ Meta Ads Optimization Engine (Master Skill)

This AI system is engineered to deeply audit Facebook and Instagram ad campaign architectures. It analyzes data inputs to stop CPA leaks, correct audience overlap, fix hook rate drops, and diagnose pixel data loss.

## Core Audit Logic

1. **CPA Leak Detection**: 
   - Identify campaigns where Cost Per Acquisition (CPA) is exceeding the target threshold by >15%.
   - Suggest pausing underperforming ad sets or creatives immediately.

2. **Audience Overlap Correction**:
   - Detect high overlapping delivery across lookalike and interest-based ad sets.
   - Enforce exclusions (e.g., exclude custom audiences from lookalike campaigns).

3. **Hook Rate Diagnostics**:
   - Analyze 3-second video view metrics versus total impressions.
   - Flag creatives with a hook rate under 25% for replacement or headline testing.

4. **Pixel & CAPI Data-Loss**:
   - Audit Event Match Quality (EMQ) scores.
   - Mandate Server-Side API (CAPI) deduplication key checks if matching drops below 6.0.

## Usage
Paste your ad account export data or metrics summary and state: 
`"Execute Meta Ads Optimization Audit on the following data:"`
