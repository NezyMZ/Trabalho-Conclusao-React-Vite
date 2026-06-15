function FormAvistamentos({
  cadastrarAvistamento,
  setFormAvistamento,
  fecharModal,
  formAvistammento,
}) {
  return (
    <div>
      <h2>Formulário de Avistamentos</h2>

      <form classname="form-avistamentos" onSubmit={cadastrarAvistamento}>
        <div className="form-header">
          <h3>Adicionar Avistamento</h3>
          <button type="button" classname="close-button" onClick={fecharModal}>
            X
          </button>
        </div>

        <label>
          Título:
          <input
            type="text"
            name="titulo"
            onChange={(e) =>
              setFormAvistamento({
                ...formAvistamento,
                titulo: e.target.value,
              })
            }
            value={formAvistamento.titulo}
            required
          />
        </label>

        <label>
          Local:
          <input
            type="text"
            name="local"
            onChange={(e) =>
              setFormAvistamento({
                ...formAvistamento,
                local: e.target.value,
              })
            }
            value={formAvistamento.local}
            required
          />
        </label>

        <label>
          Descrição:
          <input
            type="text"
            name="descricao"
            onChange={(e) =>
              setFormAvistamento({
                ...formAvistamento,
                descricao: e.target.value,
              })
            }
            value={formAvistamento.descricao}
            required
          />
        </label>

        <label>
          Data:
          <input
            type="date"
            name="data"
            onChange={(e) =>
              setFormAvistamento({
                ...formAvistamento,
                data: e.target.value,
              })
            }
            value={formAvistamento.data}
            required
          />
        </label>

        <label>
          Nível de medo:
          <input
            type="number"
            name="nivelMedo"
            onChange={(e) =>
              setFormAvistamento({
                ...formAvistamento,
                nivelMedo: Number(e.target.value),
              })
            }
            value={formAvistamento.nivelMedo}
            required
          />
        </label>

        <div className="form-buttons">
          <button type="submit">Salvar</button>
          <button type="button" onClick={fecharModal}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormAvistamentos;
