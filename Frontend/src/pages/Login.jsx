import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    // Placeholder: autenticação será implementada no backend futuramente
    if (!email || !senha) return setMessage('Informe e-mail e senha');
    setMessage('Login ainda não implementado.');
  }

  return (
    <section className="card">
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="form">
        <label>
          E-mail
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          Senha
          <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
        </label>
        <button type="submit">Entrar</button>
      </form>
      {message && <p className="hint">{message}</p>}
    </section>
  );
}


