@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
echo =============================================
echo    解压研究所 - 生成 Windows 安装包
echo =============================================
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo [错误] 没有检测到 Node.js。
  echo 请先安装 Node.js 24 LTS，然后重新打开本文件。
  echo 下载地址：https://nodejs.org/
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo [错误] 没有检测到 npm，请检查 Node.js 是否安装完整。
  pause
  exit /b 1
)
echo [1/2] 安装项目依赖（首次运行需要联网）...
call npm install
if errorlevel 1 (
  echo.
  echo [错误] 依赖安装失败。请检查网络后重试。
  pause
  exit /b 1
)
echo.
echo [2/2] 正在生成 Windows 安装包...
call npm run dist:win
if errorlevel 1 (
  echo.
  echo [错误] 打包失败，请把本窗口中的报错发给我。
  pause
  exit /b 1
)
echo.
echo =============================================
echo 打包完成！请打开 dist 文件夹查看 exe 和 zip。
echo =============================================
explorer "%~dp0dist"
pause
