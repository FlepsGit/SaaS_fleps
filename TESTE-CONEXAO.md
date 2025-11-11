# 🔍 Guia de Teste de Conexão

## Problema: "Erro de conexão: Verifique se o servidor backend está rodando"

O backend está rodando, mas o frontend não consegue conectar. Siga estes passos para diagnosticar:

## ✅ Passo 1: Verificar se o Backend está rodando

### No PowerShell:
```powershell
netstat -ano | findstr :3001
```

**Deve aparecer:**
```
TCP    0.0.0.0:3001           0.0.0.0:0              LISTENING       22168
```

### No Navegador:
Acesse: http://localhost:3001/health

**Deve aparecer:**
```json
{"ok":true}
```

## ✅ Passo 2: Testar endpoint de teste

Acesse: http://localhost:3001/test

**Deve aparecer:**
```json
{
  "message": "Backend está funcionando!",
  "timestamp": "2024-...",
  "cors": "Configurado"
}
```

## ✅ Passo 3: Verificar Frontend

### Verificar se o Frontend está rodando:
```powershell
netstat -ano | findstr :5173
```

### Iniciar o Frontend (se não estiver rodando):
```powershell
cd "C:\Users\24011451.GLOBAL\Documents\Glen SaaS\Frontend"
npm run dev
```

## ✅ Passo 4: Verificar Console do Navegador

1. Abra o site no navegador
2. Pressione **F12** para abrir o DevTools
3. Vá na aba **Console**
4. Tente fazer o cadastro
5. Veja as mensagens de log:
   - `Tentando conectar em: http://localhost:3001/usuarios`
   - `Dados enviados: {...}`
   - `Resposta recebida: ...`

## ✅ Passo 5: Verificar Logs do Backend

Quando você tentar fazer o cadastro, o backend deve mostrar:

```
[2024-...] POST /usuarios
Origin: http://localhost:5173
Headers: {...}
Recebido POST /usuarios: {...}
```

## 🔧 Soluções Aplicadas

### 1. CORS Melhorado
- Agora aceita qualquer origem em desenvolvimento
- Não vai mais bloquear requisições do frontend

### 2. Logs Melhorados
- Backend mostra todas as requisições recebidas
- Frontend mostra detalhes da conexão no console

### 3. Tratamento de Erros Melhorado
- Mensagens de erro mais específicas
- Diferencia entre erro de conexão e erro CORS

## 🚀 Próximos Passos

1. **Reinicie o Backend:**
   ```powershell
   cd "C:\Users\24011451.GLOBAL\Documents\Glen SaaS\Backend"
   npm run dev
   ```

2. **Reinicie o Frontend:**
   ```powershell
   cd "C:\Users\24011451.GLOBAL\Documents\Glen SaaS\Frontend"
   npm run dev
   ```

3. **Teste novamente:**
   - Abra o site
   - Abra o console (F12)
   - Tente fazer o cadastro
   - Veja os logs no console e no backend

## 🐛 Se ainda não funcionar

### Verifique:

1. **Firewall do Windows:**
   - Pode estar bloqueando a porta 3001
   - Adicione uma exceção para Node.js

2. **Antivírus:**
   - Pode estar bloqueando conexões locais
   - Adicione exceção para localhost:3001

3. **URL do Frontend:**
   - Certifique-se de que está acessando via `http://localhost:5173`
   - Não use `file://` ou `127.0.0.1`

4. **Backend realmente rodando:**
   - Verifique o terminal do backend
   - Deve mostrar: `API listening on http://localhost:3001`

## 📝 Checklist

- [ ] Backend está rodando na porta 3001
- [ ] Frontend está rodando na porta 5173
- [ ] http://localhost:3001/health retorna `{"ok":true}`
- [ ] http://localhost:3001/test retorna JSON
- [ ] Console do navegador mostra logs
- [ ] Terminal do backend mostra logs de requisições
- [ ] CORS está configurado para aceitar qualquer origem

## 💡 Dica

Se o problema persistir, copie os logs do console do navegador e do terminal do backend para análise.

