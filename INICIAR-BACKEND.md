# Como Iniciar o Backend

## Passo 1: Criar arquivo .env

1. Vá para a pasta `Backend`
2. Crie um arquivo chamado `.env` (sem extensão)
3. Adicione o seguinte conteúdo (substitua pelos seus valores reais):

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
PORT=3001
```

### Como obter as credenciais do Supabase:

1. Acesse https://app.supabase.com
2. Faça login na sua conta
3. Selecione seu projeto
4. Vá em **Settings** (Configurações) no menu lateral
5. Clique em **API**
6. Copie:
   - **Project URL** → coloque no `SUPABASE_URL`
   - **service_role key** (secret) → coloque no `SUPABASE_SERVICE_ROLE_KEY`
   - ⚠️ **IMPORTANTE**: Use a `service_role` key, NÃO a `anon` key!

## Passo 2: Iniciar o Backend

Abra um terminal (PowerShell ou CMD) e execute:

```powershell
cd "C:\Users\24011451.GLOBAL\Documents\Glen SaaS\Backend"
npm run dev
```

Você deve ver:
```
API listening on http://localhost:3001
CORS enabled for: http://localhost:5173
✓ Variáveis de ambiente do Supabase configuradas
```

Se aparecer um aviso sobre variáveis não configuradas, verifique o arquivo `.env`.

## Passo 3: Manter o terminal aberto

⚠️ **IMPORTANTE**: Mantenha o terminal do backend aberto enquanto estiver usando o sistema. Se fechar o terminal, o backend para de funcionar.

## Passo 4: Iniciar o Frontend (em outro terminal)

Abra um **segundo terminal** e execute:

```powershell
cd "C:\Users\24011451.GLOBAL\Documents\Glen SaaS\Frontend"
npm run dev
```

## Passo 5: Testar

1. Acesse o frontend no navegador (geralmente http://localhost:5173)
2. Tente fazer um cadastro
3. Verifique os logs no terminal do backend para ver se funcionou

## Problemas Comuns

### "Cannot find module"
- Execute `npm install` na pasta Backend

### "Port 3001 already in use"
- Alguém já está usando a porta 3001
- Feche outros servidores ou mude a porta no arquivo `.env`

### "SUPABASE_URL não está configurada"
- Verifique se o arquivo `.env` existe na pasta `Backend`
- Verifique se o arquivo tem as variáveis corretas
- Certifique-se de que não há espaços extras nas variáveis

### Servidor não inicia
- Verifique se há erros no console
- Execute `npm install` novamente
- Verifique se o Node.js está instalado: `node --version`

