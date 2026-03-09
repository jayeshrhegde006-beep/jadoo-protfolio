@echo off
title Portfolio Server
SET PATH=%PATH%;C:\Program Files\nodejs\
echo Opening browser...
start http://localhost:5173
echo.
echo Starting development server...
npm run dev
pause
