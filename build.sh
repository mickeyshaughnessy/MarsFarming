#!/bin/bash

# New section for Android build
# Check if buildozer is installed
if ! command -v buildozer &> /dev/null; then
    echo "Buildozer is not installed. Please install it and try again."
    exit 1
fi

# Change to the repo directory
cd "$REPO_PATH"

# Initialize Buildozer if no configuration present
if [ ! -f "buildozer.spec" ]; then
    echo "Preparing to create Martian blueprints for Android... I mean, Buildozer config."
    buildozer init
fi

# Update the Buildozer spec file with necessary configurations
# Here you can add additional changes to the buildozer.spec file, e.g., requirements, permissions, etc.
echo "Updating Martian blueprints for Android... I mean, Buildozer config."
sed -i "s/^requirements =.*/requirements = python3,kivy,pygame,pygame_gui/g" buildozer.spec

# Build the Android APK
echo "Creating the Martian farming tool for Android... I mean, the APK."
buildozer android debug

echo "Done! Your Martian farming tool is ready for Android. Remember, in space, no one can hear you reap."

