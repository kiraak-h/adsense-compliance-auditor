import urllib.parse
import sys

def transcribe_rac(query_terms):
    """
    Parses a list of text variables into a Google Related Search for Content (RSFC)
    compliant referrerAdCreative URL-encoded parameter.
    """
    if not query_terms:
        print("Error: No search terms provided.")
        sys.exit(1)
        
    print("--- RAC Transcriber (Related Search for Content) ---")
    print("Raw Terms Provided:", query_terms)
    
    # 1. Strip special characters, enforce lowercase
    sanitized = []
    for term in query_terms:
        clean = "".join(c for c in term if c.isalnum() or c.isspace()).strip().lower()
        if clean:
            sanitized.append(clean)
            
    if not sanitized:
        print("Error: Terms invalid after sanitization.")
        sys.exit(1)
        
    # 2. Construct the literal payload
    # Format: term1, term2, term3
    payload_string = ", ".join(sanitized)
    
    # 3. URL Encode
    encoded_payload = urllib.parse.quote(payload_string)
    
    print(f"Sanitized Literal String: {payload_string}")
    print(f"Encoded 'referrerAdCreative' Parameter: &referrerAdCreative={encoded_payload}")
    print("Status: ✅ Ready for Google Ads API payload injection.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python rac_transcriber.py \"term one\" \"term two\"")
    else:
        transcribe_rac(sys.argv[1:])
