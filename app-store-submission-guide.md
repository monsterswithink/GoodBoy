# macOS Keyboard for iOS - App Store Submission Guide

This guide provides step-by-step instructions for preparing your macOS Keyboard for submission to TestFlight and the App Store.

## Prerequisites

- Xcode 14 or later
- Apple Developer Program membership
- iOS 14.0+ target

## Step 1: Build the Next.js Project

1. Build the Next.js project:
   \`\`\`bash
   npm run build
   npm run export
   \`\`\`

2. This will generate a static export in the `out` directory.

## Step 2: Set Up the Capacitor Project

1. Initialize Capacitor if not already done:
   \`\`\`bash
   npx cap init "macOS Keyboard" com.yourcompany.mackeyboard
   \`\`\`

2. Add iOS platform:
   \`\`\`bash
   npx cap add ios
   \`\`\`

3. Copy the build to iOS:
   \`\`\`bash
   npx cap copy ios
   \`\`\`

## Step 3: Configure the Keyboard Extension in Xcode

1. Open the iOS project in Xcode:
   \`\`\`bash
   npx cap open ios
   \`\`\`

2. Add a new target to your project:
   - In Xcode, go to File > New > Target
   - Select "Custom Keyboard Extension" and click Next
   - Name it "MacKeyboardExtension" and click Finish

3. Replace the generated `KeyboardViewController.swift` with our custom implementation.

4. Configure the Info.plist for the keyboard extension:
   - Set `NSExtensionAttributes` > `IsASCIICapable` to `YES`
   - Set `NSExtensionAttributes` > `PrimaryLanguage` to `en-US`
   - Set `NSExtensionAttributes` > `RequestsOpenAccess` to `YES` (for clipboard access)

5. Copy the built web assets:
   - Create a "public" folder in the keyboard extension target
   - Copy the contents of the `out` directory to this folder
   - Make sure to include these files in the keyboard extension target

## Step 4: Configure App Capabilities

1. Select your main app target and go to the "Signing & Capabilities" tab.
2. Add the following capabilities:
   - App Groups (for sharing data between the app and keyboard extension)

3. Select your keyboard extension target and add the same App Group.

## Step 5: Implement Communication Between App and Keyboard

1. Create a shared container using App Groups to allow the main app and keyboard extension to communicate.

2. In the main app, provide instructions for enabling the keyboard:
   - Go to Settings > General > Keyboard > Keyboards > Add New Keyboard
   - Select "macOS Keyboard"
   - Enable "Allow Full Access" for full functionality

## Step 6: Prepare for App Store Submission

1. Create app icons for both the main app and keyboard extension.

2. Write App Store metadata:
   - App name: "macOS Keyboard for iOS"
   - Description: Highlight the key features (macOS keyboard layout, shortcuts, Unicode support)
   - Keywords: keyboard, mac, macos, shortcuts, unicode
   - Privacy policy URL

3. Take screenshots for different device sizes:
   - iPhone (6.5" display)
   - iPhone (5.5" display)
   - iPad Pro (12.9" display)
   - iPad Pro (11" display)

4. Create a preview video demonstrating the keyboard in action.

## Step 7: Submit to TestFlight

1. In Xcode, select Product > Archive to create an archive of your app.

2. Once the archive is created, click "Distribute App" and select "TestFlight & App Store".

3. Follow the prompts to upload your app to App Store Connect.

4. In App Store Connect:
   - Add test information for TestFlight testers
   - Add external testers if needed
   - Submit for TestFlight review (this is separate from App Store review)

## Step 8: Test on TestFlight

1. Once approved for TestFlight, install the app on test devices.

2. Verify that:
   - The keyboard can be added in Settings
   - All keyboard features work correctly
   - Unicode characters display properly
   - Shortcuts function as expected
   - The Globe button switches keyboards

3. Fix any issues and resubmit if necessary.

## Step 9: Submit to the App Store

1. In App Store Connect, prepare your app for submission:
   - Complete all required metadata
   - Upload all screenshots and preview video
   - Set pricing and availability
   - Complete the App Review Information section

2. Submit for App Store Review.

3. Address any issues raised by the App Review team.

## Common Issues and Solutions

### Keyboard Not Appearing in Settings

- Make sure the keyboard extension target is properly configured
- Verify that the Info.plist settings are correct
- Check that the keyboard extension is included in the build

### Clipboard Access Not Working

- Ensure "Allow Full Access" is enabled for the keyboard
- Verify that `RequestsOpenAccess` is set to `YES` in Info.plist

### Unicode Characters Not Displaying Correctly

- Make sure the correct font is being used
- Verify that the Unicode characters are properly encoded

### App Rejection Issues

Common reasons for keyboard app rejections:
- Missing privacy policy
- Insufficient functionality compared to the system keyboard
- Performance issues
- Improper use of clipboard data

## Additional Resources

- [Apple's Custom Keyboard Documentation](https://developer.apple.com/documentation/uikit/keyboards_and_input/creating_a_custom_keyboard)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [TestFlight Beta Testing](https://developer.apple.com/testflight/)
