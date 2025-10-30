import { Link, Outlet, useLocation } from 'react-router-dom';

export default function App() {
  const location = useLocation();
  return (
    <div className="container">
      <header className="header">
        <h1>Constatino Hotel</h1>
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Login</Link>
          <Link to="/cadastro" className={location.pathname === '/cadastro' ? 'active' : ''}>Cadastro</Link>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">© {new Date().getFullYear()} Constatino</footer>
    </div>
  );
}


