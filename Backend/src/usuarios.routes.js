import { Router } from 'express';
import { supabase } from './supabase.js';
import { z } from 'zod';

const router = Router();

const usuarioSchema = z.object({
  id: z.string().uuid().optional(),
  nome: z.string().min(1),
  cpf: z.string().min(11).max(14),
  email: z.string().email(),
  telefone: z.string().optional().nullable(),
  endereco: z.string().optional().nullable(),
  senha: z.string().min(6),
  active: z.boolean().optional()
});

function handleSupabase({ data, error, status = 200 }, res) {
  if (error) return res.status(400).json({ error: error.message });
  return res.status(status).json(data);
}

router.get('/', async (_req, res) => {
  const { data, error } = await supabase
    .from('usuario')
    .select('*')
    .is('deleted_at', null)
    .order('created_at', { ascending: false });
  handleSupabase({ data, error }, res);
});

router.get('/:id', async (req, res) => {
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
  const parse = usuarioSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const payload = { ...parse.data };
  const { data, error } = await supabase
    .from('usuario')
    .insert(payload)
    .select('*')
    .single();
  handleSupabase({ data, error, status: 201 }, res);
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


