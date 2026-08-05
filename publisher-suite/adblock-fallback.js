/**
 * PREMIUM AD-BLOCKER DETECTION & FALLBACK RECOVERY FRAMEWORK
 * Avoids blank layout voids and preserves visual integrity when script blockers are active.
 */
document.addEventListener("DOMContentLoaded", function () {
    // 1. Establish an unambiguous validation delay tracking window
    setTimeout(function () {
        // Target your anti-CLS container element
        const adGuard = document.querySelector(".adsense-placement-guard");
        
        if (adGuard) {
            // 2. Evaluate if the standard Google script array has been blocked/interrupted
            const adBlockDetected = typeof window.adsbygoogle === "undefined" || 
                                    (window.adsbygoogle.loaded === undefined && adGuard.offsetHeight === 0);
            
            if (adBlockDetected) {
                console.warn("⚠️ [AUDITOR] Ad-blocker network block detected. Injecting fallback assets...");
                
                // 3. Clear out empty programmatic tags safely
                adGuard.innerHTML = "";
                
                // 4. Construct a functional backup asset frame (e.g., local newsletter or internal service link)
                const fallbackLink = document.createElement("a");
                fallbackLink.href = "/newsletter-signup"; 
                fallbackLink.style.display = "block";
                fallbackLink.style.width = "100%";
                fallbackLink.style.height = "100%";
                fallbackLink.style.textDecoration = "none";
                
                const fallbackBanner = document.createElement("div");
                fallbackBanner.style.backgroundColor = "#1e293b";
                fallbackBanner.style.color = "#ffffff";
                fallbackBanner.style.padding = "20px";
                fallbackBanner.style.fontSize = "14px";
                fallbackBanner.style.fontWeight = "bold";
                fallbackBanner.style.fontFamily = "sans-serif";
                fallbackBanner.innerHTML = "🚀 Enjoying our content? Subscribe to our newsletter to receive direct development insights weekly!";
                
                fallbackLink.appendChild(fallbackBanner);
                adGuard.appendChild(fallbackLink);
            }
        }
    }, 1500); // 1.5-second buffer to let standard programmatic scripts settle down before verifying
});
