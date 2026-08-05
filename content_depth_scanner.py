#!/usr/bin/env python3
import os
import glob
import re

def analyze_workspace_content(directory="."):
    print("🔍 Launching AI Content Depth & Thin Material Analysis...")
    print("-" * 72)
    
    # Locate indexable text elements in the directory
    files = glob.glob(os.path.join(directory, "**/*.md"), recursive=True) + \
            glob.glob(os.path.join(directory, "**/*.html"), recursive=True)
            
    total_pages = len(files)
    thin_content_count = 0
    
    for file_path in files:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            text = f.read()
            # Clean out code blocks and HTML elements to count real content words
            clean_text = re.sub(r'<[^>]+>', '', text)
            words = clean_text.split()
            word_count = len(words)
            
            if word_count < 600:
                print(f"⚠️ [THIN CONTENT FLAG]: {file_path} contains only {word_count} words (Minimum recommended: 600).")
                thin_content_count += 1
                
    print("-" * 72)
    print(f"📊 SUMMARY COMPLIANCE REPORT:")
    print(f"   - Total Archive Indexable Elements: {total_pages} / 15 minimum required.")
    print(f"   - Under-Indexed / Thin Content Nodes: {thin_content_count}")
    
    if total_pages < 15:
        print("\n❌ STATUS: REJECTED risk. Total page volume is insufficient to bypass automated filters.")
        return False
    elif thin_content_count > 0:
        print("\n⚠️ STATUS: WARNING risk. Clean up thin articles to minimize 'Low-Value Content' strikes.")
        return False
    else:
        print("\n🎉 STATUS: EXCELLENT. Content archive matches programmatic quality thresholds.")
        return True

if __name__ == "__main__":
    analyze_workspace_content()
