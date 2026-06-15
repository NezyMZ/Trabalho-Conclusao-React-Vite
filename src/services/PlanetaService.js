import axios from 'axios'; 

const URL_PLANETAS = 'https://api.serratec.mwmsoftware.com/planetas';

export const planetaService = {

  listarTodos: async () => {
    const response = await axios.get(URL_PLANETAS); 
    return response.data;
  },

  cadastrar: async (planeta) => {
    const response = await axios.post(URL_PLANETAS, planeta);
    return response.data;
  },

  atualizar: async (id, planeta) => {
    const response = await axios.put(`${URL_PLANETAS}/${id}`, planeta);
    return response.data;
  },

  deletar: async (id) => {
    const response = await axios.delete(`${URL_PLANETAS}/${id}`);
    return response.data;
  }
};