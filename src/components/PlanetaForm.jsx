import React, { useState, useEffect } from 'react';

export function PlanetaForm({ planetaParaEditar, aoSalvar, aoCancelar }) {
  
  const [formData, setFormData] = useState({
    nome: '',
    galaxia: '',
    clima: '',
    habitavel: false,
    descricao: ''
  });

  
  useEffect(() => {
    if (planetaParaEditar) {
      setFormData({
        nome: planetaParaEditar.nome || '',
        galaxia: planetaParaEditar.galaxia || '',
        clima: planetaParaEditar.clima || '',
        habitavel: !!planetaParaEditar.habitavel,
        descricao: planetaParaEditar.descricao || ''
      });
    }
  }, [planetaParaEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    aoSalvar(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-planeta" style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px', backgroundColor: '#1e1e1e', color: '#fff' }}>
      <h3>{planetaParaEditar ? 'Editar Planeta' : 'Cadastrar Novo Planeta'}</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Nome do Planeta *</label>
        <input 
          type="text" 
          name="nome" 
          value={formData.nome} 
          onChange={handleChange} 
          required 
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: '#fff' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Galáxia *</label>
        <input 
          type="text" 
          name="galaxia" 
          value={formData.galaxia} 
          onChange={handleChange} 
          required 
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: '#fff' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Clima Predominante *</label>
        <input 
          type="text" 
          name="clima" 
          value={formData.clima} 
          onChange={handleChange} 
          required 
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: '#fff' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            name="habitavel" 
            checked={formData.habitavel} 
            onChange={handleChange} 
            style={{ marginRight: '8px' }}
          />
          Este planeta é habitável?
        </label>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Descrição / Detalhes</label>
        <textarea 
          name="descricao" 
          value={formData.descricao} 
          onChange={handleChange} 
          rows="3" 
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: '#fff' }}
        ></textarea>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {planetaParaEditar ? 'Atualizar' : 'Salvar'}
        </button>
        <button type="button" onClick={aoCancelar} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Cancelar
        </button>
      </div>
    </form>
  );
}