import { Link, useNavigate } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import AppRouter from "./router";

function App() {
  const { logout, estaAutenticado, nomeUsuario } = useAuth();
  const navigate = useNavigate();

  async function sair() {
    await logout();
    navigate("/login");
  }
  return (
    <main>
      <nav>
        <Link to="/">Home</Link>
        
        {/* Colocamos todos os links principais juntos aqui no centro */}
        <div className="nav-center" style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <p style={{ margin: 0 }}>Aliens</p> {/* Aba do seu colega */}
          <Link to="/avistamentos" style={{ textDecoration: "none", color: "inherit" }}>Avistamentos</Link>
          
          {/* O SEU LINK NO LUGAR CORRETO: */}
          <Link to="/Planetas" style={{ textDecoration: "none", color: "inherit" }}>Planetas</Link>
        </div>

        {estaAutenticado ? (
          <div className="nav-right">
            <p>
              Olá, <strong className="usuario">{nomeUsuario}</strong>! Você está
              logado!
            </p>
            <button type="button" onClick={sair}>
              Sair
            </button>
          </div>
        ) : (
          <div className="nav-right">
            {/* Tiramos o Planetas daqui de baixo */}
            <Link to="/login">Login</Link>
            <Link to="/cadastro">Cadastro</Link>
          </div>
        )}
      </nav>
      <AppRouter />
    </main>
  );
}

export default App;
