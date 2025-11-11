# Guia de Solução de Problemas - Cadastro

## Erro: "failed to fetch"

Este erro geralmente ocorre quando o frontend não consegue se comunicar com o backend. Siga estes passos:

### 1. Verificar se o Backend está rodando

Abra um terminal e execute:

```powershell
cd Backend
npm run dev
```

Você deve ver a mensagem:
```
API listening on http://localhost:3001
```

Se não aparecer, verifique se há erros no console.

### 2. Verificar arquivo .env

O arquivo `Backend/.env` deve existir e conter:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
PORT=3001
```

**Como obter as credenciais do Supabase:**
1. Acesse https://app.supabase.com
2. Selecione seu projeto
3. Vá em Settings > API
4. Copie a URL e a Service Role Key (não a anon key!)

### 3. Verificar se o Frontend está rodando

Em outro terminal, execute:

```powershell
cd Frontend
npm run dev
```

O frontend deve rodar na porta 5173 (padrão do Vite).

### 4. Verificar a tabela no Supabase

A tabela `usuario` deve existir no Supabase com as seguintes colunas:

- `id` (uuid, primary key, default: gen_random_uuid())
- `nome` (text, not null)
- `cpf` (text, not null)
- `email` (text, not null, unique)
- `telefone` (text, nullable)
- `endereco` (text, nullable)
- `senha` (text, not null)
- `active` (boolean, default: true)
- `created_at` (timestamp, default: now())
- `updated_at` (timestamp, nullable)
- `deleted_at` (timestamp, nullable)

### 5. Verificar logs do Backend

Quando tentar fazer o cadastro, verifique os logs do backend. Você deve ver:
- `Recebido POST /usuarios: {...}`
- `Inserindo no Supabase: {...}`
- `✓ Usuário criado com sucesso: ...` (se funcionar)
- Ou mensagens de erro específicas

### 6. Testar conexão manualmente

Você pode testar a API manualmente usando curl ou Postman:

```powershell
curl -X POST http://localhost:3001/usuarios `
  -H "Content-Type: application/json" `
  -d '{\"nome\":\"Teste\",\"cpf\":\"12345678901\",\"email\":\"teste@teste.com\",\"senha\":\"123456\"}'
```

### 7. Verificar CORS

O CORS já está configurado no backend para aceitar requisições de `http://localhost:5173`.

Se o frontend estiver em outra porta, ajuste a variável `FRONTEND_URL` no `.env` do backend.

## Erros Comuns

### "Servidor não configurado"
- **Solução**: Crie o arquivo `Backend/.env` com as variáveis do Supabase

### "Erro de validação"
- **Solução**: Verifique se todos os campos obrigatórios estão preenchidos
- CPF deve ter entre 11 e 14 caracteres
- Email deve ser válido
- Senha deve ter no mínimo 6 caracteres

### "Erro ao inserir no banco de dados"
- **Solução**: Verifique se a tabela existe no Supabase
- Verifique se as colunas estão corretas
- Verifique se há constraints (como email único) sendo violadas

### "failed to fetch" (no navegador)
- **Solução**: Verifique se o backend está rodando
- Verifique se a URL da API está correta no frontend
- Verifique o console do navegador (F12) para mais detalhes

## Próximos Passos

1. Certifique-se de que o backend está rodando
2. Certifique-se de que o arquivo `.env` existe e está configurado
3. Tente fazer o cadastro novamente
4. Verifique os logs do backend para ver o erro específico
5. Verifique o console do navegador (F12) para ver mensagens de erro

