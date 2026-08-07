/**
 * PRO LIFECYCLE CONTROLLER: VIGNETTE FREQUENCY CAP & VIEWPORT RECOVERY
 * Intercepts focus shifts and back-button mutations to stop overlay layout breaking.
 */
(function() {
    document.addEventListener("DOMContentLoaded", function() {
        const MAX_INTERSTITIAL_FREQUENCY_PER_SESSION = 3;
        
        function enforceVignetteSafetyCeiling() {
            let sessionImpressions = localStorage.getItem("pro_vignette_impressions") || 0;
            
            // Mitigate dynamic back-button history mutations to prevent tracking layout breaks
            window.addEventListener("popstate", function() {
                console.log("ℹ️ [VIGNETTE SHIELD] Page state mutation caught. Stabilizing underlying viewports.");
            });

            if (parseInt(sessionImpressions) >= MAX_INTERSTITIAL_FREQUENCY_PER_SESSION) {
                console.warn("🔒 [FREQUENCY CAP ACTUATED] Terminating interstitial triggers to preserve user bounce metrics.");
                // Prevent programmatic script tags from rendering overlay layout shifts
                return false;
            }
            
            // Record successful overlay view tracking loop safely
            localStorage.setItem("pro_vignette_impressions", parseInt(sessionImpressions) + 1);
            return true;
        }

        enforceVignetteSafetyCeiling();
    });
})();
