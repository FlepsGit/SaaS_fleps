import express from 'express';
import cors from 'cors';
import usuariosRouter from './usuarios.routes.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/usuarios', usuariosRouter);

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Erro inesperado' });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
  console.log(`CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  
  // Verificar variáveis de ambiente
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('⚠️  AVISO: SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não estão configuradas!');
    console.error('⚠️  Crie um arquivo .env na pasta Backend com essas variáveis.');
  } else {
    console.log('✓ Variáveis de ambiente do Supabase configuradas');
  }
});


