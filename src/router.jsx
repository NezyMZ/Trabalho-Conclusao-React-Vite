import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Avistamentos from "./pages/Avistamentos";

function RotaProtegida({ children }) {
  const { estaAutenticado } = useAuth();

  if (!estaAutenticado) return <Navigate to="/" replace />;

  return children;
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
        path="/home"
        element={
          <RotaProtegida>
            <Home />
          </RotaProtegida>
        }
      />
      <Route
        path="/avistamentos"
        element={
          <RotaProtegida>
            <Avistamentos />
          </RotaProtegida>
        }
      />
    </Routes>
  );
}

export default AppRouter;
