import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const [carregando, setCarregando] = useState(false);

    async function enviarSubmit(event) {
        event.preventDefault();
        try {
            setCarregando(true);
            await login({ email, senha });
            navigate("/home");
        } catch {
            setErro("Email ou senha inválidos.");
        }finally{
            setCarregando(false);
        }
    }

    return (
        <section className="login-page">
            <form onSubmit={enviarSubmit}>
                <h1>Login</h1>
                <label>
                    Email
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
                </label>
                <label>
                    Senha
                    <input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} placeholder="Senha" />
                </label>
                {erro && <p>{erro}</p>}

                <button disabled={carregando} type="submit">
                    {carregando ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </section>
    );
}

export default Login;