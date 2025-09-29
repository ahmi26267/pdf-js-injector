@echo off
REM PDF JS Injector - Quick Install Script for Windows
REM Author: Ahmi - Security Researcher

echo ==================================
echo PDF JS Injector - Quick Installer
echo ==================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Docker is installed
    set DOCKER_CMD=docker
    goto :build
)

REM Check if Podman is installed
podman --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Podman is installed
    set DOCKER_CMD=podman
    goto :build
)

echo Neither Docker nor Podman is installed
echo.
echo Please install one of the following:
echo   Docker: https://docs.docker.com/desktop/install/windows-install/
echo   Podman: https://podman-desktop.io/
pause
exit /b 1

:build
echo.
echo Building PDF JS Injector container...
%DOCKER_CMD% build -t pdf-js-injector .

echo.
echo Starting PDF JS Injector...
%DOCKER_CMD% run -d -p 8080:80 --name pdf-injector --restart unless-stopped pdf-js-injector

echo.
echo Installation complete!
echo.
echo Access the tool at: http://localhost:8080
echo.
echo Management commands:
echo   Stop:    %DOCKER_CMD% stop pdf-injector
echo   Start:   %DOCKER_CMD% start pdf-injector
echo   Logs:    %DOCKER_CMD% logs pdf-injector
echo   Remove:  %DOCKER_CMD% stop pdf-injector ^&^& %DOCKER_CMD% rm pdf-injector
echo.
echo ==================================
pause
