import {useEffect, useState} from "react";
import FormAliens from "../components/FormAliens"
import {useAuth} from "../contexts/AuthContext";
import api from "../services/api";

const url = "/aliens";

function Aliens() {
    const {nomeUsuario} = useAuth();
    const [modoEditar, setModoEditar] = useState(false);
    const [aliens, setAliens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [formAlien, setFormAlien] = useState({
        nome: "",
        especie: "",
        planeta: "",
        periculosidade: 1,
        descricao: "",
    });

    function limparFormulario() {
        setFormAlien({
            nome: "",
            especie: "",
            planeta: "",
            periculosidade: 1,
            descricao: "",
        });
    }

    function fecharModal() {
        setOpenModal(false);
        setModoEditar(false);
        limparFormulario();
    }

    function openModalCadastro() {
        setMensagem("");
        setModoEditar(false);
        limparFormulario();
        setOpenModal(true);
    }

    async function buscarAlien() {
        try {
            setLoading(true);
            const resposta = await api.get(url);
            setAliens(resposta.data);
        } catch (error) {
            console.error("Registro de alien não encontrado: ", error);    
        } finally {
            setLoading(false);
        }
    }

    function openModalEditar(alien) {
        setMensagem("");
        setModoEditar(true);
        setFormAlien({
            id: alien.id,
            nome: alien.nome ?? "",
            especie: alien.especie ?? "",
            planeta: alien.planeta ?? "",
            periculosidade: alien.periculosidade ?? 1,
            descricao: alien.descricao ?? "",
        });
        setOpenModal(true);
    }

    async function cadastrarAlien(event) {
        event.preventDefault();
        setMensagem("");

        try {
            const resposta = await api.post(url, formAlien);
            setAliens((listaAtual) => [...listaAtual, resposta.data]);
            setMensagem("Alien cadastrado e registrado com sucesso!")

            limparFormulario();
            setOpenModal(false);
        } catch (error) {
            console.error("Erro ao cadastrar o registro do alien: ", error);
            setMensagem("Erro ao cadastrar o registro do alien.");
        }
    }

    async function editarAlien(event) {
        event.preventDefault();
        setMensagem("");

        try {
            const resposta = await api.put(`${url}/${formAlien.id}`, formAlien);
            const alienEditado = resposta.data ?? formAlien;

            setAliens((listaAtual) =>
                listaAtual.map((alien) =>
                    alien.id === formAlien.id ? {...alien, ...alienEditado} : alien));

            setMensagem("Registro de alien editado com sucesso!")
            limparFormulario();
            setModoEditar(false);
            setOpenModal(false);
        } catch (error) {
            console.error("Erro ao editar o registro do alien: ", error);
            setMensagem("Erro ao editar o registro do alien.");
        }
    }

    async function excluirAlien(id) {
        try {
            setMensagem("");
            await api.delete(`${url}/${id}`);
            setAliens((listaAtual) => listaAtual.filter((alien) => alien.id !== id));
            setMensagem("Cadastro ou registro de alien excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir o registro do alien: ", error);
            setMensagem("Erro ao excluir o registro do alien.");
        }
    }

    useEffect(() => {
        buscarAlien()}, []);
    
    return (
        <section className="avistamentos">
            <h1>Aliens</h1>
            {nomeUsuario && <p className = "usuario-online">Olá, {nomeUsuario}</p>}

            <button
                className="btn-cdr"
                onClick = {openModalCadastro}
                type = "button">
                    Cadastrar Alien
            </button>

            {openModal && (
                <div className = "modal">
                    <div className="modal-content">
                        <FormAliens
                            modoEditar = {modoEditar}
                            cadastrarAlien = {modoEditar ? editarAlien : cadastrarAlien}
                            fecharModal  = {fecharModal}
                            formAlien  = {formAlien}
                            setFormAlien = {setFormAlien}/>
                    </div>
                </div>
            )}

            {mensagem && <p className = "mensagem">{mensagem}</p>}
            {loading ? (
                <p>Carregando registro de alien...</p>
            ) : (
                <div className = "avistamentos-lista">
                    {aliens.map((alien) => (
                        <article className = "avistamento-item" key = {alien.id}>
                            <h3>
                                {alien?.nome === "string" ? "Nome não disponível" : alien?.nome}
                            </h3>
                            <p>
                                <strong>Espécie:</strong> {alien?.especie}
                            </p>
                            <p>
                                <strong>Planeta:</strong> {alien?.planeta}
                            </p>
                            <p>
                                <strong>Periculosidade:</strong> {alien?.periculosidade}
                            </p>
                            <p>
                                <strong>Descrição:</strong> {alien?.descricao}
                            </p>
                            <div className = "card-actions">
                                <button onClick = {()  => 
                                    excluirAlien(alien.id)} className = "btn-excluir">Excluir Alien
                                </button>

                                <button onClick = {() => 
                                    openModalEditar(alien)} className = "btn-editar">Editar Alien
                                </button>   
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Aliens;