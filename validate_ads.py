#!/usr/bin/env python3
"""
validate_ads.py
A CLI tool to crawl a domain and verify if ads.txt is active and properly structured.
Usage: python validate_ads.py <domain>
"""
import sys
import requests

def validate_ads_txt(domain):
    if not domain.startswith('http'):
        domain = 'https://' + domain
    url = f"{domain.rstrip('/')}/ads.txt"
    print(f"Crawling {url}...")
    
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            content = response.text
            if "google.com" in content and "pub-" in content:
                print("✅ SUCCESS: ads.txt is active and contains Google AdSense publisher structure.")
                return True
            else:
                print("⚠️ WARNING: ads.txt is reachable but missing valid Google AdSense signatures.")
                return False
        else:
            print(f"❌ ERROR: ads.txt not found (HTTP {response.status_code}).")
            return False
    except requests.RequestException as e:
        print(f"❌ ERROR: Failed to connect to {url}. Details: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python validate_ads.py <domain>")
        sys.exit(1)
    
    target_domain = sys.argv[1]
    validate_ads_txt(target_domain)
