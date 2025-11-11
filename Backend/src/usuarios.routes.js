import { Router } from 'express';
import { supabase } from './supabase.js';
import { z } from 'zod';

const router = Router();

const usuarioSchema = z.object({
  id: z.string().uuid().optional(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().min(11, 'CPF deve ter no mínimo 11 caracteres').max(14, 'CPF deve ter no máximo 14 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional().nullable(),
  endereco: z.string().optional().nullable(),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  active: z.boolean().optional()
});

function handleSupabase({ data, error, status = 200 }, res) {
  if (error) return res.status(400).json({ error: error.message });
  return res.status(status).json(data);
}

router.get('/', async (_req, res) => {
  if (!supabase) {
    return res.status(500).json({ 
      error: 'Servidor não configurado: SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devem estar definidas no arquivo .env' 
    });
  }
  const { data, error } = await supabase
    .from('usuario')
    .select('*')
    .is('deleted_at', null)
    .order('created_at', { ascending: false });
  handleSupabase({ data, error }, res);
});

router.get('/:id', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ 
      error: 'Servidor não configurado: SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devem estar definidas no arquivo .env' 
    });
  }
  const { id } = req.params;
  const { data, error } = await supabase
    .from('usuario')
    .select('*')
    .eq('id', id)
    .limit(1)
    .maybeSingle();
  handleSupabase({ data, error }, res);
});

router.post('/', async (req, res) => {
  try {
    console.log('📥 Recebido POST /usuarios');
    console.log('📦 Body:', JSON.stringify(req.body, null, 2));
    
    // Verificar se Supabase está configurado
    if (!supabase) {
      console.error('❌ Supabase não configurado!');
      return res.status(500).json({ 
        error: 'Servidor não configurado: SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devem estar definidas no arquivo .env' 
      });
    }
    
    console.log('✅ Supabase configurado, validando dados...');
    
    const parse = usuarioSchema.safeParse(req.body);
    if (!parse.success) {
      const errors = parse.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('; ');
      console.error('❌ Erro de validação:', errors);
      return res.status(400).json({ error: `Erro de validação: ${errors}` });
    }
    
    console.log('✅ Dados validados');
    
    const payload = { ...parse.data };
    // Remove id se existir (será gerado pelo Supabase)
    delete payload.id;
    
    console.log('💾 Inserindo no Supabase:', JSON.stringify(payload, null, 2));
    
    const { data, error } = await supabase
      .from('usuario')
      .insert(payload)
      .select('*')
      .single();
    
    if (error) {
      console.error('❌ Erro do Supabase:', JSON.stringify(error, null, 2));
      return res.status(400).json({ 
        error: error.message || 'Erro ao inserir no banco de dados',
        details: error.details || null,
        hint: error.hint || null
      });
    }
    
    console.log('🎉 Usuário criado com sucesso:', data?.id);
    return res.status(201).json(data);
  } catch (err) {
    console.error('💥 Erro inesperado no POST /usuarios:', err);
    console.error('Stack:', err.stack);
    res.status(500).json({ 
      error: err.message || 'Erro inesperado no servidor',
      type: err.name || 'UnknownError'
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const parse = usuarioSchema.partial().safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const { data, error } = await supabase
    .from('usuario')
    .update({ ...parse.data })
    .eq('id', id)
    .select('*')
    .single();
  handleSupabase({ data, error }, res);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from('usuario')
    .update({ deleted_at: nowIso })
    .eq('id', id)
    .select('*')
    .single();
  handleSupabase({ data, error }, res);
});

export default router;


