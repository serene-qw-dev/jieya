@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (echo 未检测到 Node.js，请先安装 Node.js 24 LTS：https://nodejs.org/ & pause & exit /b 1)
if not exist node_modules (echo 首次运行：正在安装依赖... & call npm install)
if errorlevel 1 (echo 依赖安装失败，请检查网络后重试。 & pause & exit /b 1)
call npm start
if errorlevel 1 (echo 程序退出时出现错误，请检查上方信息。 & pause)
