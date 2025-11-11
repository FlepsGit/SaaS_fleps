import express from 'express';
import cors from 'cors';
import usuariosRouter from './usuarios.routes.js';

const app = express();
const port = process.env.PORT || 3001;

// Configurar CORS - em desenvolvimento aceita qualquer origem
const corsOptions = {
  origin: function (origin, callback) {
    // Em desenvolvimento, aceitar qualquer origem
    if (!origin || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      // Em produção, verificar origem permitida
      const allowedOrigins = [
        process.env.FRONTEND_URL || 'http://localhost:5173',
        'http://localhost:5173',
        'http://127.0.0.1:5173'
      ];
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware de log para debug
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - Origin: ${req.headers.origin || 'N/A'}`);
  next();
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// Endpoint de teste para verificar conexão
app.get('/test', (_req, res) => {
  res.json({ 
    message: 'Backend está funcionando!',
    timestamp: new Date().toISOString(),
    cors: 'Configurado'
  });
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


