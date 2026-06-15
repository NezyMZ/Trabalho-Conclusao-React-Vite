function FormAliens({modoEditar, cadastrarAlien, setFormAlien, fecharModal, formAlien}) {
    return (
        <div>
            <h2>Formulário de Aliens</h2>

            <form className = "form-avistamentos" onSubmit = {cadastrarAlien}>
                <div className = "form-header">
                    <h3>{modoEditar ? "Editar Alien" : "Cadastrar Alien"}</h3>

                    <button 
                        aria-label = "Fechar Modal"
                        className = "close-button"
                        onClick = {fecharModal}
                        type = "button">
                    X
                    </button>
                </div>

                <label>
                    Nome:
                    <input 
                        name = "nome"
                        minLength = "2"
                        onChange = {(event) => 
                            setFormAlien({...formAlien, nome: event.target.value})}
                        required
                        type = "text"
                        value = {formAlien.nome}/>
                </label>

                <label>
                    Espécie:
                    <input
                        name = "especie"
                        minLength = "2"
                        onChange = {(event) =>
                            setFormAlien({...formAlien, especie: event.target.value})}
                        required
                        type = "text"
                        value = {formAlien.especie}/>
                </label>

                <label>
                    Planeta:
                    <input
                        name = "planeta"
                        minLength = "2"
                        onChange = {(event) =>
                            setFormAlien({...formAlien, planeta: event.target.value})}
                        required
                        type = "text"
                        value = {formAlien.planeta}/>
                </label>

                <label>
                    Nível de Periculosidade:
                    <input
                        name = "periculosidade"
                        max = "10"
                        min = "1"
                        onChange = {(event) =>
                            setFormAlien({...formAlien, periculosidade: Number(event.target.value)})}
                        required
                        type = "number"
                        value = {formAlien.periculosidade}/>
                </label>

                <label>
                    Descrição:
                    <input
                        name = "descricao"
                        minLength = "3"
                        onChange = {(event) =>
                            setFormAlien({...formAlien, descricao: (event.target.value)})}
                    required
                    type = "text"
                    value = {formAlien.descricao}/>
                </label>

                <div className  = "form-buttons">
                    <button type = "submit">{modoEditar ? "Editar Alien" : "Cadastrar Alien"}</button>
                    <button onClick={fecharModal} type = "button">
                    Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormAliens;