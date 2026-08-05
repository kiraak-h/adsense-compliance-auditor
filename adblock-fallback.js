/**
 * adblock-fallback.js
 * Dynamically detects active ad-blockers and swaps blank ad containers with alternative assets.
 */
document.addEventListener("DOMContentLoaded", function() {
    // Attempt to inject a bait element that ad-blockers typically hide
    const bait = document.createElement('div');
    bait.className = 'adsbox';
    bait.style.position = 'absolute';
    bait.style.top = '-999px';
    bait.style.left = '-999px';
    bait.style.height = '1px';
    bait.style.width = '1px';
    document.body.appendChild(bait);
    
    setTimeout(() => {
        // If the bait element is hidden, an ad-blocker is likely active
        if (bait.offsetHeight === 0 || window.getComputedStyle(bait).display === 'none') {
            console.warn("🛡️ Ad-blocker detected. Activating fallback content for ad containers.");
            
            // Find all elements serving as ad containers
            const adContainers = document.querySelectorAll('.adsense-placement-guard, .adsbox, [id^="div-gpt-ad"]');
            
            adContainers.forEach(container => {
                // Render fallback content to preserve layout and engage users
                container.innerHTML = `
                    <div style="padding: 20px; text-align: center; background: #f0f0f0; border-radius: 8px; color: #555;">
                        <h4 style="margin: 0 0 10px 0;">Enjoying our content?</h4>
                        <p style="margin: 0; font-size: 14px;">Please consider disabling your ad-blocker or supporting us directly to keep this site free!</p>
                    </div>
                `;
            });
        }
        // Cleanup bait
        document.body.removeChild(bait);
    }, 500);
});
