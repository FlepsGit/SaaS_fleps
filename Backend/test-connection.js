// Script de teste para verificar conexão com Supabase
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

console.log('🔍 Testando conexão com Supabase...\n');

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ ERRO: Variáveis de ambiente não configuradas!');
  console.error('❌ Crie um arquivo .env na pasta Backend com:');
  console.error('   SUPABASE_URL=sua_url_aqui');
  console.error('   SUPABASE_SERVICE_ROLE_KEY=sua_key_aqui');
  process.exit(1);
}

console.log('✓ SUPABASE_URL:', SUPABASE_URL ? 'Configurado' : 'Não configurado');
console.log('✓ SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_SERVICE_ROLE_KEY ? 'Configurado' : 'Não configurado');
console.log('');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

// Testar conexão
async function testConnection() {
  try {
    console.log('🔗 Testando conexão com a tabela "usuario"...');
    
    const { data, error } = await supabase
      .from('usuario')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Erro ao conectar:', error.message);
      console.error('   Detalhes:', error.details);
      console.error('   Hint:', error.hint);
      
      if (error.message.includes('does not exist')) {
        console.error('\n💡 A tabela "usuario" não existe no Supabase.');
        console.error('   Crie a tabela no Supabase com as colunas necessárias.');
      }
      
      process.exit(1);
    }
    
    console.log('✅ Conexão com Supabase estabelecida com sucesso!');
    console.log('✅ A tabela "usuario" existe e está acessível.');
    
  } catch (err) {
    console.error('❌ Erro inesperado:', err.message);
    process.exit(1);
  }
}

testConnection();

