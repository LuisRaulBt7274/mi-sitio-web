# Portafolio - Start Script
# Runs both backend and frontend servers

$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\luis3\nexus-project"

Write-Host "[*] Iniciando servidores..." -ForegroundColor Cyan
Write-Host ""

# Start Backend server
Write-Host "[+] Backend: http://localhost:3001" -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$ProjectRoot\backend'; npm run dev" -WindowStyle Normal

# Wait a moment for backend to start
Start-Sleep -Seconds 2

# Start Frontend server
Write-Host "[+] Frontend: http://localhost:5173" -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$ProjectRoot\frontend'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "[OK] Servidores iniciados!" -ForegroundColor Green
Write-Host "   Backend:  http://localhost:3001"
Write-Host "   Frontend: http://localhost:5173"
Write-Host ""
Write-Host 'Presiona Ctrl+C para detener los servidores' -ForegroundColor Cyan
