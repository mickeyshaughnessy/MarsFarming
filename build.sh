#!/bin/bash

# Because who doesn't love a good Mars farming joke?
echo "Preparing to farm on Mars... hope you brought your space overalls."

# Check for Python 3.8 or higher
if ! python3 --version | awk -F. '{if ($2<8) exit 1}'; then
    echo "Python 3.8 or higher is required. Please upgrade and try again."
    exit 1
fi

# Check for git
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install it and try again."
    exit 1
fi

# Clone the repository
echo "Pulling down the Martian blueprints... I mean, code."
git clone https://github.com/mickeyshaughnessy/MarsFarming.git mars-farm-sim

# Install necessary Python libraries
echo "Installing interplanetary farming tools... I mean, Python libraries."
python3 -m pip install pygame pygame_gui

echo "Done! Welcome to your new Martian farm. Remember, in space, no one can hear you reap."

