# ⚡ Solução Rápida - Erro de Conexão

## ❌ Erro que você está vendo:
```
Erro de conexão: Verifique se o servidor backend está rodando em http://localhost:3001
```

## ✅ Solução em 3 passos:

### 1️⃣ Criar arquivo `.env`

Na pasta `Backend`, crie um arquivo chamado `.env` com:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
PORT=3001
```

**Onde conseguir as credenciais:**
- Acesse https://app.supabase.com
- Settings > API
- Copie a URL e a **service_role key** (não a anon key!)

### 2️⃣ Iniciar o Backend

Abra o PowerShell e execute:

```powershell
cd "C:\Users\24011451.GLOBAL\Documents\Glen SaaS\Backend"
npm run dev
```

**Você deve ver:**
```
API listening on http://localhost:3001
✓ Variáveis de ambiente do Supabase configuradas
```

### 3️⃣ Manter o terminal aberto

⚠️ **IMPORTANTE**: Não feche o terminal! O backend precisa estar rodando.

### 4️⃣ Testar

Agora tente fazer o cadastro novamente. Deve funcionar!

---

## 🆘 Ainda não funciona?

1. **Verifique se o backend está rodando:**
   - Abra http://localhost:3001/health no navegador
   - Deve aparecer: `{"ok":true}`

2. **Verifique os logs do backend:**
   - Quando você tentar cadastrar, deve aparecer logs no terminal

3. **Verifique o arquivo .env:**
   - Certifique-se de que está na pasta `Backend`
   - Certifique-se de que não há espaços extras
   - Certifique-se de que as credenciais estão corretas

4. **Veja mais detalhes:**
   - Leia o arquivo `INICIAR-BACKEND.md` para instruções detalhadas
   - Leia o arquivo `TROUBLESHOOTING.md` para solução de problemas

