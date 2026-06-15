import { useEffect, useState } from "react";
import api from "../services/api";
import FormAvistamentos from "../components/FormAvistamentos";

function Avistamentos() {
  const [avistamentos, setAvistamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [payload, setPayload] = useState({
    titulo: "",
    local: "",
    descricao: "",
    data: "",
    nivelMedo: 1,
  });

  async function buscarAvistamentos() {
    setLoading(true);
    try {
      const resp = await api.get("/avistamentos");
      setAvistamentos(resp.data);
    } catch (error) {
      console.error("Erro ao buscar avistamentos:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    buscarAvistamentos();
  }, []);

  function limparPayload() {
    setPayload({
      titulo: "",
      local: "",
      descricao: "",
      data: "",
      nivelMedo: 1,
    });
  }

  function fecharModal() {
    setOpenModal(false);
    limparPayload();
  }

  async function cadastroAvistamento(e) {
    e.preventDefault();
    try {
      const resp = await api.post("/avistamentos", payload);
      setAvistamentos((lista) => [...lista, resp.data]);
      limparPayload();
      setOpenModal(false);
    } catch (error) {
      console.error("Erro ao cadastrar avistamento:", error);
    }
  }
  return (
    <section className="avistamentos">
      <h2>Avistamentos</h2>
      <button type="button" onClick={() => setOpenModal(true)}>
        Adicionar Avistamento
      </button>
      {loading ? (
        <p>Carregando avistamentos...</p>
      ) : (
        <p>{avistamentos.length} avistamento(s) encontrado(s)</p>
      )}
      <div className="avistamentos-lista">
        {avistamentos.map((avistamento) => (
          <div key={avistamento.id} className="avistamento-item">
            <h3>{avistamento.titulo}</h3>
            <p>
              <strong>Local:</strong> {avistamento.local}
            </p>
            <p>
              <strong>Descrição:</strong> {avistamento.descricao}
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(avistamento.data).toLocaleDateString()}
            </p>
            <p>
              <strong>Nível de Medo:</strong> {avistamento.nivelMedo}
            </p>
          </div>
        ))}
      </div>
      {openModal && (
        <div className="modal">
          <div className="modal-content">
            <FormAvistamentos
              cadastroAvistamento={cadastroAvistamento}
              fecharModal={fecharModal}
              formAvistamento={payload}
              setFormAvistamento={setPayload}
            />
          </div>
        </div>
      )}
    </section>
  );
}
export default Avistamentos;
