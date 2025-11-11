// dotenv/config carrega .env se existir (desenvolvimento local)
// Em produção (Render), as variáveis são injetadas diretamente pelo ambiente
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ ERRO: SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devem estar definidos nas variáveis de ambiente');
  console.error('❌ Crie um arquivo .env na pasta Backend com:');
  console.error('   SUPABASE_URL=sua_url_aqui');
  console.error('   SUPABASE_SERVICE_ROLE_KEY=sua_key_aqui');
  console.error('❌ O servidor não conseguirá conectar ao Supabase sem essas variáveis.');
}

// Cria cliente mesmo sem as variáveis para evitar crash, mas operações falharão
export const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false }
    })
  : null;


