# AdMob Production App Bundle Deployment Checklist

## 1. Marketplace & Metadata Mapping
- [ ] **Active Store Listing**: Ensure the mobile app bundle is live, approved, and searchable on the Google Play Store or Apple App Store.
- [ ] **Developer Website Linking**: The store listing metadata must link directly to the root developer website containing your verified `app-ads.txt` file.

## 2. Project Compilation Configuration
- [ ] **App ID Provisioning**: Inject your unique AdMob App ID (`ca-app-pub-xxxxxxxxxxxxxxxx~xxxxxxxxxx`) into the application framework:
  - **Android (`AndroidManifest.xml`)**: Inside the `<meta-data>` tags under the `<application>` node.
  - **iOS (`Info.plist`)**: Under the `GADApplicationIdentifier` dictionary key.
- [ ] **SKAdNetwork Mapping**: (iOS Only) Ensure the latest `Info.plist` bundle contains Google’s official SKAdNetwork identifier strings to preserve tracking capabilities.

## 3. Execution Lifecycle Initialization
- [ ] **Early Initialization**: Trigger `MobileAds.initialize()` at the absolute launch entry point of the app environment (e.g., `MainActivity` onCreate or `AppDelegate` didFinishLaunchingWithOptions).
- [ ] **Ad Container Pre-fetching**: Isolate ad request configurations from interactive UI components. Ads must be cached in memory and checked for absolute readiness (`isReady()`) before rendering to protect the app's Show Rate.
