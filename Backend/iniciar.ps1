# Script para iniciar o backend
# Execute este script na pasta Backend

Write-Host "🚀 Iniciando o servidor backend..." -ForegroundColor Green
Write-Host ""

# Verificar se o arquivo .env existe
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  AVISO: Arquivo .env não encontrado!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Crie um arquivo .env na pasta Backend com:" -ForegroundColor Yellow
    Write-Host "  SUPABASE_URL=https://seu-projeto.supabase.co" -ForegroundColor Cyan
    Write-Host "  SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui" -ForegroundColor Cyan
    Write-Host "  PORT=3001" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "O servidor vai iniciar, mas não funcionará até criar o arquivo .env" -ForegroundColor Yellow
    Write-Host ""
    Start-Sleep -Seconds 2
}

# Verificar se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Iniciar o servidor
Write-Host "▶️  Iniciando servidor na porta 3001..." -ForegroundColor Green
Write-Host "   (Pressione Ctrl+C para parar)" -ForegroundColor Gray
Write-Host ""

npm run dev

