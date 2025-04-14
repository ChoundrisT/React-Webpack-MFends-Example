#!/bin/bash

echo "Starting app1..."
cd /home/tchoundris/Documents/React-MFends-Router-App/app1
npm run start &

echo "Starting app-shell..."
cd /home/tchoundris/Documents/React-MFends-Router-App/app-shell
npm run start &


wait
