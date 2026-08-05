/**
 * VIGNETTE FREQUENCY CAP & INTERSTITIAL NAVIGATOR
 * Optimizes alternative triggers and prevents back-button block violations on layout-heavy formats.
 */
document.addEventListener("DOMContentLoaded", function () {
    console.log("🛡️ [AUDITOR] Vignette Frequency Cap & Navigation Guard Initialized.");

    // Define configuration for vignette pacing
    const CAP_CONFIG = {
        maxImpressionsPerHour: 3,
        localStorageKey: "ads_vignette_impressions",
        timeoutBufferMs: 2000
    };

    // 1. Evaluate Frequency Cap
    function canShowVignette() {
        try {
            const trackingData = JSON.parse(localStorage.getItem(CAP_CONFIG.localStorageKey) || '{"impressions": 0, "timestamp": 0}');
            const now = new Date().getTime();
            
            // Reset if an hour has passed
            if (now - trackingData.timestamp > 3600000) {
                trackingData.impressions = 0;
                trackingData.timestamp = now;
            }

            if (trackingData.impressions >= CAP_CONFIG.maxImpressionsPerHour) {
                console.warn(`⏳ Frequency cap reached (${CAP_CONFIG.maxImpressionsPerHour}/hr). Suppressing vignette triggers.`);
                return false;
            }

            // Increment impression count
            trackingData.impressions++;
            localStorage.setItem(CAP_CONFIG.localStorageKey, JSON.stringify(trackingData));
            return true;
        } catch (e) {
            console.error("Storage error:", e);
            return true; // Fail open
        }
    }

    // 2. Prevent Back-Button Trapping (Google Policy Violation)
    function attachNavigationGuard() {
        const anchorTags = document.querySelectorAll('a:not([target="_blank"])');
        
        anchorTags.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                // If it's a cross-origin link, we skip injecting interstitials 
                // to prevent history state hijacking
                if (this.hostname !== window.location.hostname) {
                    return;
                }
                
                // If frequency cap allows, let AdSense vignette load natively.
                // Otherwise, forcefully prevent google_vignette hash injection.
                if (!canShowVignette()) {
                    // Stripping any programmatic redirect hooks that ad networks might use
                    if (window.adsbygoogle) {
                        window.adsbygoogle.pauseAdRequests = 1;
                        setTimeout(() => { window.adsbygoogle.pauseAdRequests = 0; }, CAP_CONFIG.timeoutBufferMs);
                    }
                }
            });
        });
    }

    attachNavigationGuard();
});
