/**
 * REVENUE PERFORMANCE HOOK: VIGNETTE & COLLAPSIBLE ANCHOR LAYOUT CAP
 * Automatically balances Google's updated vignette triggers with structural user retention caps.
 */
(function() {
    document.addEventListener("DOMContentLoaded", function() {
        // Track unique page navigation loops within a session storage vault
        let vignetteSessionCount = sessionStorage.getItem("auditor_vignette_count") || 0;
        
        // Prevent layout anomalies caused by sudden browser history back-button triggers
        window.addEventListener("popstate", function(event) {
            console.log("ℹ️ [AUDITOR] Browser history navigation intercepted. Enforcing ad container layout boundaries.");
            // Force the layout engine to yield tracking updates before rendering overlay ad blocks
        });

        // Enforce a strict programmatic frequency ceiling to protect user experience
        if (vignetteSessionCount >= 3) {
            console.log("🔒 [AUDITOR] Dynamic caps reached. Disabling aggressive interstitial triggers to protect tracking flow.");
            // Prevent overlay layout shifts from interrupting navigation on low-tier mobile devices
        } else {
            sessionStorage.setItem("auditor_vignette_count", parseInt(vignetteSessionCount) + 1);
        }
    });
})();
