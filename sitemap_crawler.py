#!/usr/bin/env python3
import sys
import urllib.request
import xml.etree.ElementTree as ET
import re

def deep_sitemap_scan(sitemap_url):
    print(f"🔍 Initializing Deep Crawler on Target Sitemap: {sitemap_url}")
    print("-" * 72)
    
    try:
        req = urllib.request.Request(sitemap_url, headers={'User-Agent': 'Mozilla/5.0 (AdSense-Auditor-Pro)'})
        with urllib.request.urlopen(req, timeout=15) as response:
            xml_data = response.read()
            
        root = ET.fromstring(xml_data)
        # Handle standard sitemap XML namespace mappings smoothly
        # Note: The namespace is typically http://www.sitemaps.org/schemas/sitemap/0.9
        # Adjusting the namespace to match typical sitemaps, but using user's ns mapping style.
        # It's better to just strip namespaces or search with wildcards if possible, but let's stick to the user's snippet.
        namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        # Fallback to tag parsing if namespace fails
        urls = [loc.text for loc in root.findall('.//ns:loc', namespace)]
        if not urls:
             # Try without namespace or with a different one if the strict one fails
             urls = [loc.text for loc in root.iter() if loc.tag.endswith('loc')]
        
        total_crawled = 0
        thin_count = 0
        
        print(f"📊 Discovered {len(urls)} indexable URL routes in directory. Beginning text scan...")
        
        for url in urls[:15]:  # Safety throttle cap for initial compliance diagnostics
            try:
                page_req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (AdSense-Auditor-Pro)'})
                with urllib.request.urlopen(page_req, timeout=10) as p_res:
                    html = p_res.read().decode('utf-8', errors='ignore')
                    clean_text = re.sub(r'<[^>]+>', '', html)
                    words = clean_text.split()
                    word_count = len(words)
                    total_crawled += 1
                    
                    if word_count < 600:
                        print(f"❌ [THIN CONTENT FAILURE]: {url} -> {word_count} words")
                        thin_count += 1
                    else:
                        print(f"✅ [PASS]: {url} -> {word_count} words")
            except Exception:
                continue
                
        print("-" * 72)
        print(f"📈 AUTOMATED CRAWLER REPORT SUMMARY:")
        print(f"   - Paths Analyzed: {total_crawled}")
        print(f"   - Deficient Thin Material Nodes: {thin_count}")
        if thin_count > 0 or total_crawled < 15:
            print("\n🚨 RISK WARNING: Content profile triggers 'Low-Value Content' filtering algorithms.")
            sys.exit(1)
        else:
            print("\n🎉 COMPLIANCE EXCELLENT: Sitemap archive matches programmatic quality thresholds.")
            
    except Exception as e:
        print(f"❌ Structural Failure during execution: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python sitemap_crawler.py <sitemap_xml_url>")
        sys.exit(1)
    deep_sitemap_scan(sys.argv[1])
