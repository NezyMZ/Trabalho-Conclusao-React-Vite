import React, { useState, useEffect } from 'react';
import { planetaService } from '../services/planetaService';
import { PlanetaForm } from '../components/PlanetaForm';
import './Planetas.css'; 

export function Planetas() {
  const [planetas, setPlanetas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  
  const [exibirForm, setExibirForm] = useState(false);
  const [planetaEmEdicao, setPlanetaEmEdicao] = useState(null);

  const carregarPlanetas = async () => {
    setCarregando(true);
    setErro('');
    try {
      const dados = await planetaService.listarTodos();
      setPlanetas(Array.isArray(dados) ? dados : []);
    } catch (err) {
      setErro('Erro ao carregar a lista de planetas. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPlanetas();
  }, []);

  const dispararFeedbackSucesso = (mensagem) => {
    setSucesso(mensagem);
    setTimeout(() => setSucesso(''), 3000);
  };

  const handleSalvarPlaneta = async (dadosFormulario) => {
    setErro('');
    try {
    
      const dadosEnvio = {
        nome: dadosFormulario.nome,
        galaxia: dadosFormulario.galaxia,
        clima: dadosFormulario.clima,
        habitavel: Boolean(dadosFormulario.habitavel),
        descricao: dadosFormulario.descricao || ''
      };

      if (planetaEmEdicao) {
        await planetaService.atualizar(planetaEmEdicao.id, dadosEnvio);
        dispararFeedbackSucesso('Planeta atualizado com sucesso!');
      } else {
        await planetaService.cadastrar(dadosEnvio);
        dispararFeedbackSucesso('Planeta cadastrado com sucesso!');
      }
      fecharFormulario();
      carregarPlanetas(); 
    } catch (err) {
      console.error("Erro retornado pela API:", err.response?.data || err);
      setErro('Ocorreu um erro ao salvar o planeta. Verifique os dados.');
    }
  };

  const handleDeletarPlaneta = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este planeta?')) {
      setErro('');
      try {
        await planetaService.deletar(id);
        dispararFeedbackSucesso('Planeta excluído com sucesso!');
        carregarPlanetas();
      } catch (err) {
        setErro('Erro ao excluir o planeta.');
      }
    }
  };

  const handleEditarClique = (planeta) => {
    setPlanetaEmEdicao(planeta);
    setExibirForm(true);
  };

  const fecharFormulario = () => {
    setExibirForm(false);
    setPlanetaEmEdicao(null);
  };

  return (
    <div className="planetas-container">
      <h2>Gerenciamento de Planetas</h2>

      {carregando && <div className="alert alert-info">Carregando dados dos planetas...</div>}
      {erro && <div className="alert alert-danger">{erro}</div>}
      {sucesso && <div className="alert alert-success">{sucesso}</div>}

      <div className="acoes-topo">
        {!exibirForm && (
          <button className="btn-novo" onClick={() => setExibirForm(true)}>
            + Cadastrar Novo Planeta
          </button>
        )}
      </div>

      {exibirForm && (
        <PlanetaForm 
          planetaParaEditar={planetaEmEdicao} 
          aoSalvar={handleSalvarPlaneta} 
          aoCancelar={fecharFormulario} 
        />
      )}

      {!carregando && planetas.length === 0 ? (
        <p>Nenhum planeta registrado até o momento.</p>
      ) : (
        <div className="tabela-responsiva">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Galáxia</th>
                <th>Clima</th>
                <th>Habitável</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {planetas.map((planeta) => (
                <tr key={planeta.id}>
                  <td>{planeta.nome}</td>
                  <td>{planeta.galaxia}</td>
                  <td>{planeta.clima}</td>
                  <td>{planeta.habitavel ? 'Sim 🟢' : 'Não 🔴'}</td>
                  <td>{planeta.descricao}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEditarClique(planeta)}>Editar</button>
                    <button className="btn-delete" onClick={() => handleDeletarPlaneta(planeta.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}