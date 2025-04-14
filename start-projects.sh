#!/bin/bash

# Define the ports you want to check and kill processes for
FASTAPI_PORT=8000
APP1_PORT=3000
APPSHELL_PORT=3001

# Kill processes running on the specified ports
echo "Killing processes on port $FASTAPI_PORT..."
lsof -t -i:$FASTAPI_PORT | xargs kill -9 || true

echo "Killing processes on port $APP1_PORT..."
lsof -t -i:$APP1_PORT | xargs kill -9 || true

echo "Killing processes on port $APPSHELL_PORT..."
lsof -t -i:$APPSHELL_PORT | xargs kill -9 || true

# Start the FastAPI backend using uvicorn
echo "Starting FastAPI backend..."
cd /home/tchoundris/Documents/React-MFends-Router-App/backend
uvicorn main:app --reload &  # Runs FastAPI using uvicorn in the background

# Wait for the backend to start before proceeding (optional, 5 seconds wait time)
sleep 5

# Start the frontend app1
echo "Starting app1..."
cd /home/tchoundris/Documents/React-MFends-Router-App/app1
npm run start &

# Start the frontend app-shell
echo "Starting app-shell..."
cd /home/tchoundris/Documents/React-MFends-Router-App/app-shell
npm run start &

# Wait for all background processes to finish
wait
