#!/bin/sh
cd three.js/utils/
vim includes/other.json
python build.py --include common --include extras --include other --output ../../Three.js
cd ..
