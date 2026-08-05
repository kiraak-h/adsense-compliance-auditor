(() => {
  try {
    let risks = 0;
    // We check div and iframe elements to simulate ad container analysis
    const elements = document.querySelectorAll('div, iframe');
    
    elements.forEach(el => {
      // Simplistic check for standard ad class names or iframes
      if (el.className.includes('ad') || el.tagName === 'IFRAME') {
        const style = window.getComputedStyle(el);
        const pt = parseInt(style.paddingTop) || 0;
        const pb = parseInt(style.paddingBottom) || 0;
        const mt = parseInt(style.marginTop) || 0;
        const mb = parseInt(style.marginBottom) || 0;

        // If total top spacing or total bottom spacing is < 15px
        if ((pt + mt) < 15 || (pb + mb) < 15) {
          risks++;
        }
      }
    });

    return {
      totalElements: elements.length,
      risks: risks
    };
  } catch (err) {
    return { error: err.message };
  }
})();
