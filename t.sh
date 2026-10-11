#!/bin/bash
cd /home/cecepazhar/Product/caui
npx vitest run > /tmp/test_out.txt 2>&1
echo "EXIT: $?" >> /tmp/test_out.txt