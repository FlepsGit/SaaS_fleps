# 🔍 Como Verificar se o Backend Está Rodando

## Método 1: Verificar Porta 3001 no PowerShell

Abra o PowerShell e execute:

```powershell
netstat -ano | findstr :3001
```

**Se aparecer algo como:**
```
TCP    0.0.0.0:3001           0.0.0.0:0              LISTENING       12345
```
✅ **Backend está rodando!** (12345 é o ID do processo)

**Se não aparecer nada:**
❌ **Backend NÃO está rodando** - Você precisa iniciá-lo

---

## Método 2: Testar no Navegador

Abra seu navegador e acesse:

```
http://localhost:3001/health
```

**Se aparecer:**
```json
{"ok":true}
```
✅ **Backend está rodando!**

**Se aparecer erro de conexão:**
❌ **Backend NÃO está rodando** - Você precisa iniciá-lo

---

## Método 3: Verificar Processos Node.js

No PowerShell, execute:

```powershell
Get-Process -Name node -ErrorAction SilentlyContinue
```

**Se aparecer processos:**
✅ Pode estar rodando (mas precisa verificar a porta)

**Se não aparecer nada:**
❌ **Nenhum processo Node.js está rodando**

---

## Método 4: Verificar Logs do Terminal

Se você iniciou o backend em um terminal, procure por estas mensagens:

```
API listening on http://localhost:3001
CORS enabled for: http://localhost:5173
```

✅ **Se aparecer essas mensagens:** Backend está rodando!

---

## 🔧 Como Iniciar o Backend

Se o backend NÃO estiver rodando:

### Passo 1: Abra um Terminal (PowerShell)

### Passo 2: Navegue até a pasta Backend

```powershell
cd "C:\Users\24011451.GLOBAL\Documents\Glen SaaS\Backend"
```

### Passo 3: Verifique se o arquivo .env existe

```powershell
Test-Path .env
```

**Se retornar `False`:** Você precisa criar o arquivo `.env` primeiro!

### Passo 4: Inicie o Backend

```powershell
npm run dev
```

### Passo 5: Verifique se iniciou

Você deve ver:
```
API listening on http://localhost:3001
CORS enabled for: http://localhost:5173
✓ Variáveis de ambiente do Supabase configuradas
```

---

## 🌐 Verificar URL do Frontend

O frontend está configurado para usar:

- **Padrão:** `http://localhost:3001`
- **Variável de ambiente:** `VITE_API_BASE` (se configurada)

### Verificar qual URL o frontend está usando:

1. Abra o navegador
2. Pressione **F12** para abrir o DevTools
3. Vá na aba **Console**
4. Quando tentar fazer o cadastro, verá a URL completa no erro

Ou verifique o arquivo:
- `Frontend/src/pages/Signup.jsx` (linha 3)

---

## 🔍 Verificar Todas as Portas em Uso

Para ver todas as portas em uso:

```powershell
netstat -ano | findstr LISTENING
```

Procure por `:3001` para ver se o backend está rodando.

---

## ⚠️ Problemas Comuns

### "Porta 3001 já está em uso"

Se a porta 3001 estiver ocupada por outro processo:

1. Descubra qual processo está usando:
```powershell
netstat -ano | findstr :3001
```

2. Veja o PID (último número) e finalize o processo:
```powershell
taskkill /PID <número_do_pid> /F
```

### "Backend inicia mas para logo em seguida"

- Verifique se o arquivo `.env` existe e está correto
- Verifique os logs do terminal para ver o erro
- Certifique-se de que as credenciais do Supabase estão corretas

### "Não consigo acessar localhost:3001"

- Verifique se o firewall não está bloqueando
- Tente usar `127.0.0.1:3001` em vez de `localhost:3001`
- Verifique se o backend realmente iniciou (veja os logs)

---

## 📝 Resumo Rápido

1. **Verificar se está rodando:** `netstat -ano | findstr :3001`
2. **Testar no navegador:** http://localhost:3001/health
3. **Iniciar o backend:** `cd Backend` → `npm run dev`
4. **Manter terminal aberto:** Backend precisa estar rodando para funcionar

