# 🚨 Solução: Erro de Conexão com Backend

## ⚠️ Problema
Você está vendo: `Erro de conexão: Verifique se o servidor backend está rodando em http://localhost:3001`

Mas o backend ESTÁ rodando! O problema pode ser:

1. **CORS bloqueando** (resolvido)
2. **Frontend não está rodando**
3. **URL incorreta**
4. **Firewall/Antivírus bloqueando**

## ✅ Solução Rápida

### 1. Reiniciar o Backend

**Pare o backend atual** (Ctrl+C no terminal) e inicie novamente:

```powershell
cd "C:\Users\24011451.GLOBAL\Documents\Glen SaaS\Backend"
npm run dev
```

**Você deve ver:**
```
API listening on http://localhost:3001
CORS enabled for: http://localhost:5173
✓ Variáveis de ambiente do Supabase configuradas
```

### 2. Verificar se o Frontend está rodando

Em **outro terminal**, execute:

```powershell
cd "C:\Users\24011451.GLOBAL\Documents\Glen SaaS\Frontend"
npm run dev
```

**Você deve ver:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 3. Testar a conexão

Abra no navegador:
- Backend: http://localhost:3001/health (deve mostrar `{"ok":true}`)
- Frontend: http://localhost:5173 (deve abrir o site)

### 4. Testar o cadastro

1. Abra o site em http://localhost:5173
2. Pressione **F12** para abrir o console
3. Tente fazer o cadastro
4. Veja os logs no console do navegador
5. Veja os logs no terminal do backend

## 🔍 Diagnóstico

### Verificar se o backend está recebendo requisições:

Quando você tentar fazer o cadastro, o terminal do backend deve mostrar:

```
[2024-...] POST /usuarios
Origin: http://localhost:5173
Recebido POST /usuarios: {...}
```

**Se não aparecer nada:** O frontend não está conseguindo enviar a requisição.

### Verificar no console do navegador:

Quando você tentar fazer o cadastro, o console deve mostrar:

```
Tentando conectar em: http://localhost:3001/usuarios
Dados enviados: {...}
```

**Se aparecer erro de CORS:** O problema é de configuração (já resolvido).

**Se aparecer "Failed to fetch":** Pode ser firewall ou o backend não está respondendo.

## 🔧 Correções Aplicadas

1. ✅ **CORS melhorado** - Agora aceita qualquer origem em desenvolvimento
2. ✅ **Logs adicionados** - Backend e frontend mostram logs detalhados
3. ✅ **Tratamento de erros melhorado** - Mensagens mais específicas
4. ✅ **Endpoint de teste** - `/test` para verificar conexão

## 📋 Checklist

Execute este checklist:

- [ ] Backend está rodando (`npm run dev` no terminal Backend)
- [ ] Frontend está rodando (`npm run dev` no terminal Frontend)
- [ ] http://localhost:3001/health retorna `{"ok":true}`
- [ ] http://localhost:3001/test retorna JSON
- [ ] http://localhost:5173 abre o site
- [ ] Console do navegador (F12) está aberto
- [ ] Terminal do backend mostra logs quando você tenta cadastrar

## 🆘 Se ainda não funcionar

### 1. Verificar Firewall

O Windows Firewall pode estar bloqueando a porta 3001:

1. Abra o Windows Defender Firewall
2. Vá em "Configurações Avançadas"
3. Adicione uma regra de entrada para a porta 3001
4. Ou desative temporariamente o firewall para testar

### 2. Verificar Antivírus

Alguns antivírus bloqueiam conexões locais:

1. Adicione exceção para Node.js
2. Adicione exceção para localhost:3001
3. Ou desative temporariamente para testar

### 3. Verificar URL

Certifique-se de que está acessando:
- ✅ `http://localhost:5173` (correto)
- ❌ `file:///...` (incorreto)
- ❌ `127.0.0.1:5173` (pode funcionar, mas use localhost)

### 4. Limpar Cache do Navegador

1. Pressione Ctrl+Shift+Delete
2. Limpe o cache
3. Recarregue a página (Ctrl+F5)

### 5. Testar em outro navegador

Tente em Chrome, Firefox ou Edge para ver se o problema é específico do navegador.

## 💡 Próximos Passos

1. **Reinicie o backend** com as novas configurações
2. **Reinicie o frontend**
3. **Teste novamente** com o console aberto
4. **Veja os logs** para identificar o problema específico

## 📞 Informações para Debug

Se o problema persistir, anote:

1. **Logs do backend** (terminal onde roda `npm run dev`)
2. **Logs do console do navegador** (F12 > Console)
3. **URL que está tentando acessar**
4. **Mensagem de erro completa**

Essas informações ajudam a identificar o problema específico.

