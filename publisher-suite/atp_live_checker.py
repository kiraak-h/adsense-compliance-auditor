import json
import requests
import sys

ATP_MANIFEST_URL = "https://storage.googleapis.com/adx-rtb-dictionaries/providers.json"

def check_vendors(vendor_ids):
    print("Fetching Live Ad Technology Providers (ATP) Manifest...")
    try:
        res = requests.get(ATP_MANIFEST_URL, timeout=10)
        res.raise_for_status()
        data = res.json()
    except Exception as e:
        print(f"Failed to fetch ATP list: {e}")
        sys.exit(1)
        
    authorized_providers = {str(p.get("provider_id")): p.get("provider_name") for p in data.get("providers", [])}
    
    print("\n--- Compliance Audit Results ---")
    all_compliant = True
    for vid in vendor_ids:
        if vid in authorized_providers:
            print(f"✅ Vendor {vid} ({authorized_providers[vid]}): AUTHORIZED")
        else:
            print(f"❌ Vendor {vid}: UNAUTHORIZED / NOT RECOGNIZED")
            all_compliant = False
            
    if all_compliant:
        print("\nStatus: ✅ PASS. All vendors are compliant with Google's EU User Consent Policy.")
    else:
        print("\nStatus: ⚠️ FAIL. Remove unauthorized vendors to prevent ad serving restrictions.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python atp_live_checker.py <vendor_id_1> <vendor_id_2> ...")
        sys.exit(1)
        
    check_vendors(sys.argv[1:])
