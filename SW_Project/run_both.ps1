# Run both backend and frontend servers

# Start Backend
Write-Host "Starting Django Backend Server..." -ForegroundColor Green
$backendJob = Start-Job -ScriptBlock {
    cd "C:\Users\pc\Downloads\SW_Project\SW_Project\The_project_back"
    & "C:\Users\pc\Downloads\SW_Project\.venv\Scripts\Activate.ps1"
    python manage.py runserver 0.0.0.0:8000
}

# Start Frontend
Write-Host "Starting Frontend Development Server..." -ForegroundColor Green
$frontendJob = Start-Job -ScriptBlock {
    cd "C:\Users\pc\Downloads\SW_Project\SW_Project\The_project_front"
    $env:Path += ";C:\Program Files\nodejs"
    npm run dev
}

Write-Host "Both servers started!" -ForegroundColor Green
Write-Host "Backend: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Waiting for servers..." -ForegroundColor Yellow

# Wait for both jobs
Get-Job | Wait-Job

Write-Host "Servers stopped." -ForegroundColor Red
