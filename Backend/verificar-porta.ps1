# Script para verificar se o backend está rodando
# Execute este script na pasta Backend ou na raiz do projeto

Write-Host "🔍 Verificando se o backend está rodando..." -ForegroundColor Cyan
Write-Host ""

# Verificar porta 3001
Write-Host "1️⃣ Verificando porta 3001..." -ForegroundColor Yellow
$port3001 = netstat -ano | findstr :3001

if ($port3001) {
    Write-Host "   ✅ Porta 3001 está em uso!" -ForegroundColor Green
    Write-Host "   $port3001" -ForegroundColor Gray
} else {
    Write-Host "   ❌ Porta 3001 NÃO está em uso" -ForegroundColor Red
    Write-Host "   O backend não está rodando!" -ForegroundColor Red
}

Write-Host ""

# Verificar processo Node.js
Write-Host "2️⃣ Verificando processos Node.js..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue

if ($nodeProcesses) {
    Write-Host "   ✅ Processos Node.js encontrados:" -ForegroundColor Green
    $nodeProcesses | ForEach-Object {
        Write-Host "      - PID: $($_.Id) - Path: $($_.Path)" -ForegroundColor Gray
    }
} else {
    Write-Host "   ❌ Nenhum processo Node.js está rodando" -ForegroundColor Red
}

Write-Host ""

# Testar conexão HTTP
Write-Host "3️⃣ Testando conexão HTTP..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -TimeoutSec 2 -ErrorAction Stop
    Write-Host "   ✅ Backend está respondendo!" -ForegroundColor Green
    Write-Host "   Resposta: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Não foi possível conectar ao backend" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""

# Verificar arquivo .env
Write-Host "4️⃣ Verificando arquivo .env..." -ForegroundColor Yellow
$envPath = Join-Path $PSScriptRoot ".env"

if (Test-Path $envPath) {
    Write-Host "   ✅ Arquivo .env existe" -ForegroundColor Green
    $envContent = Get-Content $envPath
    $hasUrl = $envContent | Select-String "SUPABASE_URL"
    $hasKey = $envContent | Select-String "SUPABASE_SERVICE_ROLE_KEY"
    
    if ($hasUrl -and $hasKey) {
        Write-Host "   ✅ Variáveis SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY encontradas" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Arquivo .env existe mas pode estar incompleto" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ❌ Arquivo .env NÃO existe" -ForegroundColor Red
    Write-Host "   Você precisa criar o arquivo .env na pasta Backend!" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📝 Resumo:" -ForegroundColor Cyan
Write-Host ""

if ($port3001 -and $response) {
    Write-Host "   ✅ Backend está rodando e funcionando!" -ForegroundColor Green
    Write-Host "   🌐 URL: http://localhost:3001" -ForegroundColor Cyan
} else {
    Write-Host "   ❌ Backend NÃO está rodando" -ForegroundColor Red
    Write-Host ""
    Write-Host "   Para iniciar o backend:" -ForegroundColor Yellow
    Write-Host "   1. cd Backend" -ForegroundColor White
    Write-Host "   2. npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "   Certifique-se de que o arquivo .env existe e está configurado!" -ForegroundColor Yellow
}

Write-Host ""

