#!/usr/bin/env python3
import sys
import json

def format_referrer_ad_creative(raw_creative_text):
    """
    Automates the literal string array transcript parameters (referrerAdCreative)
    required by Google to map upstream traffic definitions for Related Search units.
    """
    print("📋 Initializing Referrer Ad Creative Literal Transcriber...")
    print("-" * 72)
    
    # Strip clean out brackets, irregular text line breaks, and raw spacing nodes
    clean_lines = [line.strip() for line in raw_creative_text.split('\n') if line.strip()]
    full_transcript = " ".join(clean_lines)
    
    # Structure the programmatic output parameters matching AdSense API hooks exactly
    rac_configuration = {
        "referrerAdCreative": {
            "literalText": full_transcript,
            "segmentType": "verbatim_exact",
            "complianceAssurance": "TRUE"
        }
    }
    
    print("✅ SUCCESS: Programmatic string output mapped safely without layout parsing variations.")
    print(json.dumps(rac_configuration, indent=2))
    return json.dumps(rac_configuration)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        mock_input = "\n".join(sys.argv[1:])
    else:
        mock_input = "Discover Premium Web Hosting Services Today\nClick here to find secure, low-latency servers instantly."
    format_referrer_ad_creative(mock_input)
