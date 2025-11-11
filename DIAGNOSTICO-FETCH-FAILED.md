# 🔍 Diagnóstico: "TypeError: fetch failed"

## ✅ O que sabemos:
- Backend está rodando na porta 3001
- Endpoint `/health` funciona
- Endpoint `/test` funciona
- O erro ocorre ao tentar fazer POST em `/usuarios`

## 🔍 Possíveis causas:

### 1. Backend crashando ao processar a requisição
O backend pode estar crashando silenciosamente ao tentar processar o POST.

### 2. Supabase não configurado
Se o Supabase não estiver configurado, o backend pode estar travando.

### 3. Timeout da requisição
A requisição pode estar demorando muito e falhando.

## ✅ Soluções aplicadas:

### 1. Logs melhorados no backend
Agora o backend mostra logs detalhados de cada etapa:
- Quando recebe a requisição
- Quando valida os dados
- Quando tenta inserir no Supabase
- Quando há erros

### 2. Timeout no frontend
O frontend agora tem um timeout de 10 segundos para não ficar esperando indefinidamente.

### 3. Tratamento de erros melhorado
Captura erros não tratados no backend e mostra mensagens mais claras.

## 🚀 Próximos passos:

### 1. Reiniciar o Backend
**IMPORTANTE**: Você precisa reiniciar o backend para as mudanças terem efeito!

1. Pare o backend (Ctrl+C no terminal)
2. Inicie novamente:
   ```powershell
   cd "C:\Users\24011451.GLOBAL\Documents\Glen SaaS\Backend"
   npm run dev
   ```

### 2. Verificar arquivo .env
Certifique-se de que o arquivo `.env` existe e tem as credenciais do Supabase:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
PORT=3001
```

### 3. Testar novamente
1. Abra o site no navegador
2. Abra o console (F12)
3. Tente fazer o cadastro
4. **Veja os logs no terminal do backend** - deve mostrar:
   ```
   [14:30:15] POST /usuarios - Origin: http://localhost:5173
   📥 Recebido POST /usuarios
   📦 Body: {...}
   ✅ Supabase configurado, validando dados...
   ```

### 4. Verificar logs
Se aparecer erro, veja:
- **Terminal do backend**: Logs detalhados do que está acontecendo
- **Console do navegador**: Logs do frontend
- **Mensagem de erro**: Tipo específico do erro

## 🐛 Se ainda não funcionar:

### Verificar se o Supabase está configurado:
1. Abra o arquivo `Backend/.env`
2. Verifique se `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` estão definidos
3. Se não estiverem, o backend vai mostrar um aviso, mas não deve crashar

### Testar manualmente:
Você pode testar a API manualmente usando PowerShell:

```powershell
$body = @{
    nome = "Teste"
    cpf = "12345678901"
    email = "teste@teste.com"
    senha = "123456"
    active = $true
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3001/usuarios" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

Isso vai mostrar se o problema é com o backend ou com o frontend.

## 📝 Checklist:

- [ ] Backend reiniciado após as mudanças
- [ ] Arquivo `.env` existe e está configurado
- [ ] Terminal do backend mostra logs quando você tenta cadastrar
- [ ] Console do navegador (F12) está aberto
- [ ] Testou manualmente com PowerShell (opcional)

## 💡 Dica importante:

**O problema mais comum é que o backend não foi reiniciado após as mudanças!**

Certifique-se de:
1. Parar o backend (Ctrl+C)
2. Iniciar novamente (`npm run dev`)
3. Testar novamente

Os logs melhorados vão mostrar exatamente onde está o problema!

