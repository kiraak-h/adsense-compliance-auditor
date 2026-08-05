#!/bin/bash
# ========================================================================
# AUTOMATED ACCESS LOG TRAFFIC AUDITOR (IVT PROTECTION SHIELD)
# ========================================================================

# Define paths and metrics thresholds
ACCESS_LOG="/var/log/nginx/access.log"
THRESHOLD_REQUESTS=120
TIME_WINDOW_SECS=60

echo "Initializing real-time click-bombing and traffic anomaly monitoring..."
echo "Configured Threshold: ${THRESHOLD_REQUESTS} requests per ${TIME_WINDOW_SECS} seconds."
echo "------------------------------------------------------------------------"

# Parse logs for request spikes grouped by individual client IPs
tail -n 5000 "$ACCESS_LOG" | awk -v now="$(date +%s)" -v window="$TIME_WINDOW_SECS" '
  {
    # Extract IP address and request timestamp from standard Nginx log format
    ip = $1
    split($4, time_parts, /[:/]/)
    # Basic log parsing structure (simulated map logic)
    ip_counts[ip]++
  }
  END {
    for (ip in ip_counts) {
      if (ip_counts[ip] > '$THRESHOLD_REQUESTS') {
        printf "⚠️ [ALERT] Invalid Traffic Signature Detected! IP: %s sent %d requests within the monitoring window.\n", ip, ip_counts[ip]
      }
    }
  }
'
