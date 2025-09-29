#!/bin/bash

# PDF JS Injector - Quick Install Script for Linux/Mac
# Author: Ahmi - Security Researcher

set -e

echo "=================================="
echo "PDF JS Injector - Quick Installer"
echo "=================================="
echo ""

# Check if Docker is installed
if command -v docker &> /dev/null; then
    echo "✅ Docker is installed"
    USE_DOCKER=true
elif command -v podman &> /dev/null; then
    echo "✅ Podman is installed"
    USE_DOCKER=false
    DOCKER_CMD="podman"
else
    echo "❌ Neither Docker nor Podman is installed"
    echo ""
    echo "Please install one of the following:"
    echo "  Docker: https://docs.docker.com/get-docker/"
    echo "  Podman: https://podman.io/getting-started/installation"
    exit 1
fi

if [ "$USE_DOCKER" = true ]; then
    DOCKER_CMD="docker"
fi

echo ""
echo "📦 Building PDF JS Injector container..."
$DOCKER_CMD build -t pdf-js-injector .

echo ""
echo "🚀 Starting PDF JS Injector..."
$DOCKER_CMD run -d -p 8080:80 --name pdf-injector --restart unless-stopped pdf-js-injector

echo ""
echo "✅ Installation complete!"
echo ""
echo "🌐 Access the tool at: http://localhost:8080"
echo ""
echo "Management commands:"
echo "  Stop:    $DOCKER_CMD stop pdf-injector"
echo "  Start:   $DOCKER_CMD start pdf-injector"
echo "  Logs:    $DOCKER_CMD logs pdf-injector"
echo "  Remove:  $DOCKER_CMD stop pdf-injector && $DOCKER_CMD rm pdf-injector"
echo ""
echo "=================================="
