#!/bin/bash


FASTAPI_PORT=8000
APP1_PORT=3000
APPSHELL_PORT=3001


echo "Killing processes on port $FASTAPI_PORT..."
lsof -t -i:$FASTAPI_PORT | xargs kill -9 || true

echo "Killing processes on port $APP1_PORT..."
lsof -t -i:$APP1_PORT | xargs kill -9 || true

echo "Killing processes on port $APPSHELL_PORT..."
lsof -t -i:$APPSHELL_PORT | xargs kill -9 || true


echo "Activating virtual environment for FastAPI..."
source ./backend/venv/bin/activate


cleanup() {
    echo "Deactivating virtual environment..."
    deactivate
}
trap cleanup EXIT


echo "Starting FastAPI backend..."
cd ./backend
uvicorn main:app --reload &  
FASTAPI_PID=$!

cd ..


echo "Starting app1..."
cd ./app1
npm run start &

cd ..


echo "Starting app-shell..."
cd ./app-shell
npm run start &


wait $FASTAPI_PID
