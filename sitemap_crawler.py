import sys
import requests
from xml.etree import ElementTree as ET
from bs4 import BeautifulSoup

def fetch_sitemap(url):
    print(f"Fetching sitemap: {url}")
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.content
    except Exception as e:
        print(f"Error fetching sitemap: {e}")
        sys.exit(1)

def parse_sitemap(content):
    urls = []
    try:
        root = ET.fromstring(content)
        for child in root:
            if child.tag.endswith('url'):
                for loc in child:
                    if loc.tag.endswith('loc'):
                        urls.append(loc.text)
    except Exception as e:
        print(f"Error parsing XML: {e}")
    return urls

def analyze_page(url):
    try:
        res = requests.get(url, timeout=10)
        res.raise_for_status()
        soup = BeautifulSoup(res.content, 'html.parser')
        
        # Strip script and style elements
        for script in soup(["script", "style", "nav", "footer", "header"]):
            script.extract()
            
        text = soup.get_text(separator=' ')
        words = [w for w in text.split() if w.strip()]
        return len(words)
    except:
        return 0

def main():
    if len(sys.argv) < 2:
        print("Usage: python sitemap_crawler.py <sitemap_url>")
        sys.exit(1)
        
    sitemap_url = sys.argv[1]
    content = fetch_sitemap(sitemap_url)
    urls = parse_sitemap(content)
    
    print(f"Found {len(urls)} URLs. Initiating content depth scan...")
    low_value_count = 0
    
    for url in urls[:50]: # Limit to 50 for demo purposes
        word_count = analyze_page(url)
        status = "✅ PASS"
        if word_count < 600:
            status = "⚠️ LOW VALUE CONTENT RISK"
            low_value_count += 1
            
        print(f"[{word_count} words] {status} -> {url}")
        
    print("\n--- Audit Summary ---")
    print(f"Total Scanned: {min(len(urls), 50)}")
    print(f"Low-Value Flags: {low_value_count}")
    if low_value_count > 0:
        print("Recommendation: Increase text depth or 'noindex' flagged pages to protect domain CPMs.")

if __name__ == "__main__":
    main()
