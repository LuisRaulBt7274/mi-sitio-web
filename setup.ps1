# Portafolio - Setup Script
# Automates npm install for both backend and frontend

$ErrorActionPreference = "Stop"

Write-Host "[*] Configurando Portafolio de Luis Raul..." -ForegroundColor Cyan

$ProjectRoot = Join-Path $PSScriptRoot "projects\portfolio"

# Install Backend dependencies
Write-Host "[+] Instalando dependencias del Backend..." -ForegroundColor Yellow
Set-Location (Join-Path $ProjectRoot "backend")
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "[!] Error en npm install del Backend" -ForegroundColor Red
    exit 1
}

# Install Frontend dependencies
Write-Host "[+] Instalando dependencias del Frontend..." -ForegroundColor Yellow
Set-Location (Join-Path $ProjectRoot "frontend")
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "[!] Error en npm install del Frontend" -ForegroundColor Red
    exit 1
}

Set-Location $PSScriptRoot

Write-Host "[OK] Setup completado!" -ForegroundColor Green
Write-Host ""
Write-Host 'Ejecuta .\start.ps1 para iniciar ambos servidores' -ForegroundColor Cyan
