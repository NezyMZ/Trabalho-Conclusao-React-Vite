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
                {estaAutenticado && (
                    <>
                        <p>Olá, {nomeUsuario}!</p>
                        <p>Você está logado!</p>
                    </>
                )}
                {estaAutenticado ? (
                    <button type="button" onClick={sair}>Sair</button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/cadastro">Cadastro</Link>
                    </>
                )}
            </nav>
            <AppRouter />
        </main>
    );
}

export default App;