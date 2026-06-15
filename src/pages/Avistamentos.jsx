import { useEffect, useState } from "react";
import api from "../services/api";
import FormAvistamentos from "../components/FormAvistamentos";

function Avistamentos() {
  const [avistamentos, setAvistamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modoEditar, setModoEditar] = useState(null);
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
    setModoEditar(null);
    limparPayload();
  }
  
  function abrirModalEdicao(avistamento) {
    setModoEditar(avistamento);
    setPayload({
      titulo: avistamento.titulo,
      local: avistamento.local,
      descricao: avistamento.descricao,
      data: avistamento.data?.split("T")[0] ?? "",
      nivelMedo: avistamento.nivelMedo,
    });
    setOpenModal(true);
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

  async function editarAvistamento(e) {
    e.preventDefault();
    try {
      const resp = await api.put(`/avistamentos/${modoEditar.id}`, payload);
      setAvistamentos((lista) =>
        lista.map((avistamento) =>
          avistamento.id === modoEditar.id ? resp.data : avistamento
        )
      );
      fecharModal();
    } catch (error) {
      console.error("Erro ao editar avistamento:", error);
    }
  }
    async function excluirAvistamento(id) {
    if (!window.confirm("Tem certeza que deseja excluir este avistamento?")) return;
    try {
      await api.delete(`/avistamentos/${id}`);
      setAvistamentos((lista) => lista.filter((avistamento) => avistamento.id !== id));
    } catch (error) {
      console.error("Erro ao excluir avistamento:", error);
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
            <button className="btn-editar" onClick={() => abrirModalEdicao(avistamento)}>Editar</button>
            <button className="btn-excluir" onClick={() => excluirAvistamento(avistamento.id)}>Excluir</button>
          </div>
        ))}
      </div>
      {openModal && (
        <div className="modal">
          <div className="modal-content">
            <FormAvistamentos
              cadastrarAvistamento={modoEditar ? editarAvistamento : cadastroAvistamento}
              fecharModal={fecharModal}
              formAvistamento={payload}
              setFormAvistamento={setPayload}
              modoEditar={!!modoEditar}
            />
          </div>
        </div>
      )}
    </section>
  );
}
export default Avistamentos;
