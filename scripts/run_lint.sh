#!/bin/bash
cd /home/cecepazhar/Product/caui
npx eslint . > /tmp/eslint_output.txt 2>&1
echo "EXIT_CODE=$?"