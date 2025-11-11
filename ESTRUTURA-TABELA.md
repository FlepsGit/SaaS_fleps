# 📊 Estrutura da Tabela `usuario`

## Colunas da Tabela:

1. **id** (uuid, PRIMARY KEY)
   - Gerado automaticamente pelo banco
   - Não deve ser enviado no POST

2. **nome** (varchar)
   - Obrigatório
   - Enviado no POST

3. **cpf** (bpchar, UNIQUE)
   - Obrigatório
   - Único (não pode repetir)
   - Formato: apenas números (11 dígitos)
   - Enviado no POST (será limpo para remover formatação)

4. **email** (varchar, UNIQUE)
   - Obrigatório
   - Único (não pode repetir)
   - Enviado no POST (será normalizado: lowercase, trim)

5. **telefone** (text, nullable)
   - Opcional
   - Pode ser null
   - Enviado no POST apenas se fornecido

6. **endereco** (text, nullable)
   - Opcional
   - Pode ser null
   - Enviado no POST apenas se fornecido

7. **senha** (varchar)
   - Obrigatório
   - Enviado no POST

8. **created_at** (timestamptz)
   - Gerado automaticamente pelo banco (default)
   - NÃO deve ser enviado no POST

9. **active** (bool)
   - Opcional (default: true)
   - Enviado no POST (default true se não especificado)

10. **deleted_at** (timestamptz, nullable)
    - Para soft delete
    - NÃO deve ser enviado no POST

11. **deleted_by** (uuid, nullable)
    - Para soft delete
    - NÃO deve ser enviado no POST

## ⚠️ Constraints Importantes:

- **cpf** é UNIQUE - não pode haver dois usuários com o mesmo CPF
- **email** é UNIQUE - não pode haver dois usuários com o mesmo email

## 🔧 Ajustes Feitos no Código:

1. ✅ CPF é limpo (remove formatação) antes de inserir
2. ✅ Email é normalizado (lowercase, trim) antes de inserir
3. ✅ Campos opcionais só são enviados se fornecidos
4. ✅ Campos gerados pelo banco (id, created_at) não são enviados
5. ✅ Tratamento especial para erros de unicidade (CPF/email duplicados)
6. ✅ Validação melhorada do CPF (deve ter exatamente 11 dígitos)

## 🐛 Erros Comuns:

### "CPF já cadastrado"
- O CPF fornecido já existe no banco
- Solução: Use um CPF diferente ou verifique se o usuário já existe

### "Email já cadastrado"
- O email fornecido já existe no banco
- Solução: Use um email diferente ou verifique se o usuário já existe

### "CPF deve conter 11 dígitos"
- O CPF fornecido não tem 11 dígitos (após remover formatação)
- Solução: Verifique se o CPF está correto

## ✅ Teste:

Para testar se está funcionando:

1. Certifique-se de que o backend está rodando
2. Tente fazer um cadastro com dados válidos
3. Se der erro de CPF/email duplicado, use dados diferentes
4. Verifique os logs do backend para ver o que está acontecendo

