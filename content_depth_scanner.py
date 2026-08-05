#!/usr/bin/env python3
"""
content_depth_scanner.py
Recursively scans HTML/Markdown directories for thin text length (<600 words).
Monitors overall page count (<15 pages) to prevent "Low-Value Content" warnings.
Usage: python content_depth_scanner.py <directory_path>
"""
import sys
import os
import glob
import re

MIN_WORD_COUNT = 600
MIN_PAGE_COUNT = 15

def clean_html(raw_html):
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, ' ', raw_html)
    return cleantext

def analyze_directory(dir_path):
    print(f"🔍 Initiating Content Depth Scan on directory: {dir_path}")
    print("-" * 72)
    
    html_files = glob.glob(os.path.join(dir_path, '**', '*.html'), recursive=True)
    md_files = glob.glob(os.path.join(dir_path, '**', '*.md'), recursive=True)
    target_files = html_files + md_files
    
    page_count = len(target_files)
    print(f"📊 Total Content Pages Found: {page_count}")
    if page_count < MIN_PAGE_COUNT:
        print(f"⚠️ WARNING: Site architecture is thin ({page_count}/{MIN_PAGE_COUNT} pages). Risk of 'Low-Value Content' strike.")
    else:
        print(f"✅ SUCCESS: Page volume meets baseline requirements ({page_count}/{MIN_PAGE_COUNT}).")
        
    print("\n📝 Analyzing Text Depth Per Page:")
    thin_pages = 0
    for file_path in target_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            if file_path.endswith('.html'):
                content = clean_html(content)
                
            words = re.findall(r'\b\w+\b', content)
            word_count = len(words)
            
            if word_count < MIN_WORD_COUNT:
                print(f"   [THIN CONTENT] {os.path.basename(file_path)}: {word_count} words (Minimum: {MIN_WORD_COUNT})")
                thin_pages += 1
        except Exception as e:
            print(f"   [ERROR] Failed to read {os.path.basename(file_path)}: {e}")
            
    if thin_pages > 0:
        print(f"\n❌ CRITICAL: {thin_pages} pages detected with insufficient content depth.")
        sys.exit(1)
    else:
        print("\n🎉 VERIFICATION PASSED: All pages meet minimum word count thresholds.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python content_depth_scanner.py <directory_path>")
        sys.exit(1)
    
    analyze_directory(sys.argv[1])
