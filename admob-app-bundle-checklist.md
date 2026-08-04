# AdMob App Bundle Checklist

## Store Listing Mappings
- [ ] Link the AdMob app to the official Google Play Store / App Store listing.
- [ ] Configure `app-ads.txt` to include your AdMob publisher ID.

## SKU Configs
- [ ] Validate ad unit IDs for Banners, Interstitials, and Rewarded Video.
- [ ] Ensure testing SKUs are used during development (avoid live ads on emulators).

## SDK Initialization Sequences
- [ ] Call `MobileAds.initialize()` synchronously on application launch.
- [ ] Pre-load ad creatives in the background to minimize latency.
- [ ] Await the CMP consent gathering callback before requesting any live ads.
