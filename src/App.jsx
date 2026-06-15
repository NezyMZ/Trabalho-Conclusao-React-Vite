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
        <div className="nav-center">
          <p>Aliens</p> {/* Adicionar butões para próximas abas */}
          <Link to="/avistamentos">Avistamentos</Link>
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
