import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [nomeUsuario, setNomeUsuario] = useState(localStorage.getItem("nome") || "");

    async function login({ email, senha }) {
        const resposta = await api.post("/login", { email, senha });
        const tokenAcesso = resposta.data.tokenAcesso;
        const nome = resposta.data.usuario.nome;

        localStorage.setItem("token", tokenAcesso);
        localStorage.setItem("nome", nome);
        setToken(tokenAcesso);
        setNomeUsuario(nome);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("nome");
        setToken("");
        setNomeUsuario("");
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, nomeUsuario, estaAutenticado: Boolean(token) }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}