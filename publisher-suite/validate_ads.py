#!/usr/bin/env python3
import sys
import urllib.request
from urllib.error import URLError, HTTPError

def check_ads_txt(domain):
    # Ensure domain formatting is clean
    domain = domain.replace("http://", "").replace("https://", "").strip("/")
    url = f"https://{domain}/ads.txt"
    
    print(f"🔍 Initiating live crawl on target destination: {url}")
    print("-" * 72)
    
    try:
        # Construct request with a valid browser User-Agent string to bypass basic firewalls
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (AdSense-Auditor-CLI)'})
        with urllib.request.urlopen(req, timeout=10) as response:
            content = response.read().decode('utf-8')
            
            # Target compliance tokens
            has_google = "google.com" in content.lower()
            has_direct = "direct" in content.lower()
            
            print("✅ SUCCESS: Target ads.txt file discovered on server root.")
            print(f"📊 Compliance Audit Metrics:")
            print(f"   - Google Inventory Line Mapping: {'FOUND' if has_google else 'MISSING ⚠️'}")
            print(f"   - Account Relationship Token: {'FOUND' if has_direct else 'MISSING ⚠️'}")
            
            if not has_google:
                print("\n❌ CRITICAL: No active Google Publisher records detected inside the destination file.")
                sys.exit(1)
            else:
                print("\n🎉 VERIFICATION PASSED: The remote properties match structural compliance rules.")
                
    except HTTPError as e:
        print(f"❌ CRITICAL ERROR: Server responded with status code {e.code} (File might not exist).")
        sys.exit(1)
    except URLError as e:
        print(f"❌ CRITICAL ERROR: Unable to resolve target network domain destination. Reason: {e.reason}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python validate_ads.py <domain_name>")
        sys.exit(1)
    check_ads_txt(sys.argv[1])
