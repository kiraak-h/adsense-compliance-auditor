/**
 * AdSense Vignette Shield
 * 
 * Intercepts SPA history mutations to enforce frequency capping
 * on vignette (full-screen) ad impressions, preventing policy violations.
 */

(function() {
  const VIGNETTE_CAP_MINUTES = 10; // AdSense policy generally frowns on spamming full-screen ads.
  const STORAGE_KEY = 'adsense_last_vignette_time';
  
  function checkAndEnforceFrequency() {
    const lastTime = sessionStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    
    if (lastTime && (now - parseInt(lastTime, 10)) < (VIGNETTE_CAP_MINUTES * 60 * 1000)) {
      // Suppress ad call / block trigger
      window.adsbygoogle_vignette_suppressed = true;
      console.log(`[Vignette Shield] 🛡️ Blocked full-screen ad trigger. Frequency cap active.`);
      return false;
    }
    
    // Allow and update time
    sessionStorage.setItem(STORAGE_KEY, now.toString());
    window.adsbygoogle_vignette_suppressed = false;
    console.log(`[Vignette Shield] ✅ Allowed full-screen ad trigger. Updating timestamp.`);
    return true;
  }

  // Intercept PushState (SPA Navigation)
  const originalPushState = history.pushState;
  history.pushState = function() {
    checkAndEnforceFrequency();
    return originalPushState.apply(this, arguments);
  };
  
  // Intercept ReplaceState
  const originalReplaceState = history.replaceState;
  history.replaceState = function() {
    checkAndEnforceFrequency();
    return originalReplaceState.apply(this, arguments);
  };
  
  // Intercept PopState (Back/Forward navigation)
  window.addEventListener('popstate', () => {
    checkAndEnforceFrequency();
  });
  
  console.log("[Vignette Shield] Initialized to protect SPA navigation flows.");
})();
