import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

export default function SignupPage() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: '',
    senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function setField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      console.log('Tentando conectar em:', `${API_BASE}/usuarios`);
      console.log('Dados enviados:', { ...form, active: true });
      
      const res = await fetch(`${API_BASE}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, active: true })
      });
      
      console.log('Resposta recebida:', res.status, res.statusText);
      
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        console.error('Erro na resposta:', json);
        throw new Error(json?.error || `Erro ${res.status}: ${res.statusText}`);
      }
      
      const json = await res.json();
      console.log('Sucesso:', json);
      setMessage('Cadastro realizado com sucesso!');
      setForm({ nome: '', cpf: '', email: '', telefone: '', endereco: '', senha: '' });
    } catch (err) {
      console.error('Erro completo no cadastro:', err);
      console.error('Tipo do erro:', err.name);
      console.error('Mensagem do erro:', err.message);
      console.error('Stack:', err.stack);
      
      if (err.name === 'TypeError' && (err.message.includes('fetch') || err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
        setMessage(`Erro de conexão: Não foi possível conectar ao servidor em ${API_BASE}. Verifique se o backend está rodando.`);
      } else if (err.message.includes('CORS')) {
        setMessage('Erro de CORS: O servidor não está permitindo requisições deste origin.');
      } else {
        setMessage('Erro: ' + (err.message || 'Falha no cadastro'));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <h2>Cadastro - Constatino Hotel</h2>
      <form onSubmit={onSubmit} className="form">
        <label>
          Nome
          <input value={form.nome} onChange={e => setField('nome', e.target.value)} required />
        </label>
        <label>
          CPF
          <input value={form.cpf} onChange={e => setField('cpf', e.target.value)} required />
        </label>
        <label>
          E-mail
          <input type="email" value={form.email} onChange={e => setField('email', e.target.value)} required />
        </label>
        <label>
          Telefone
          <input value={form.telefone} onChange={e => setField('telefone', e.target.value)} />
        </label>
        <label>
          Endereço
          <input value={form.endereco} onChange={e => setField('endereco', e.target.value)} />
        </label>
        <label>
          Senha
          <input type="password" value={form.senha} onChange={e => setField('senha', e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Cadastrar'}</button>
      </form>
      {message && <p className="hint">{message}</p>}
    </section>
  );
}


