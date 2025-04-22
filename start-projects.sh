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

# Activate the virtual environment for FastAPI
echo "Activating virtual environment for FastAPI..."
source ./backend/venv/bin/activate

# Function to deactivate virtual environment on script exit
cleanup() {
    echo "Deactivating virtual environment..."
    deactivate
}
trap cleanup EXIT

# Start the FastAPI backend using uvicorn
echo "Starting FastAPI backend..."
cd ./backend
uvicorn main:app --reload &  # Runs FastAPI using uvicorn in the background
FASTAPI_PID=$!

cd ..

# Start the frontend app1
echo "Starting app1..."
cd ./app1
npm run start &

cd ..

# Start the frontend app-shell
echo "Starting app-shell..."
cd ./app-shell
npm run start &

# Wait for the FastAPI backend process to finish
wait $FASTAPI_PID
