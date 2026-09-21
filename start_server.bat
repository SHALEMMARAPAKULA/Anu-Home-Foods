@echo off
title ANU HOME FOODS Launcher
echo ========================================================
echo   🌶️ ANU HOME FOODS - Starting Backend ^& Frontend
echo ========================================================
echo.

cd /d "%~dp0"

REM 1. Check Backend Dependencies
if not exist "backend\node_modules" (
    echo [!] Missing backend dependencies. Running npm install...
    cd backend
    call npm install
    if errorlevel 1 (
        echo.
        echo [X] ERROR: Failed to install backend dependencies!
        echo Please fix the error above before continuing.
        pause
        exit /b 1
    )
    cd /d "%~dp0"
)

REM 2. Check Frontend Dependencies
if not exist "frontend\node_modules" (
    echo [!] Missing frontend dependencies. Running npm install...
    cd frontend
    call npm install
    if errorlevel 1 (
        echo.
        echo [X] ERROR: Failed to install frontend dependencies!
        echo Please fix the error above before continuing.
        pause
        exit /b 1
    )
    cd /d "%~dp0"
)

echo [✓] All dependencies are ready.
echo.
echo Launching Backend Server (http://localhost:5000)...
start "ANU HOME FOODS - Backend API" cmd /k "cd /d "%~dp0backend" && npm run dev"

echo Launching Frontend App (http://localhost:3000)...
start "ANU HOME FOODS - Frontend App" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Waiting 3 seconds for server startup, then opening browser...
ping 127.0.0.1 -n 4 >nul

REM Automatically open default browser to frontend
start http://localhost:3000

echo.
echo ========================================================
echo   🚀 ANU HOME FOODS is now running!
echo   - Frontend Web App: http://localhost:3000
echo   - Backend REST API: http://localhost:5000
echo ========================================================
echo.
pause