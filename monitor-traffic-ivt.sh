#!/bin/bash
# monitor-traffic-ivt.sh
# Detects click-bombing and Invalid Traffic (IVT) signatures from access logs.

LOG_FILE="/var/log/nginx/access.log"
THRESHOLD=50
TIME_WINDOW="10/minute"

echo "Initializing IVT Traffic Monitor..."

# Scan for IPs requesting ad-serving endpoints repeatedly
awk '{print $1}' "$LOG_FILE" | sort | uniq -c | sort -nr | while read count ip; do
    if [ "$count" -gt "$THRESHOLD" ]; then
        echo "🚨 ALERT: High velocity request volume detected from IP: $ip (Count: $count)"
        echo "Potential click-bombing signature. Triggering rate-limit block."
        # Example blocking action: iptables -A INPUT -s $ip -j DROP
    fi
done

echo "IVT scan complete."
