import express from 'express';
import usuariosRouter from './usuarios.routes.js';

const app = express();
const port = process.env.PORT || 3001;

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
});


