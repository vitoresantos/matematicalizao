import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Função para enviar os dados de um grupo específico na rodada atual
export const salvarRodadaGrupo = async (rodadaAtual, dadosLancamento) => {
  try {
    const response = await axios.post(`${API_URL}/rodadas/salvar-grupo?rodada_atual=${rodadaAtual}`, dadosLancamento);
    return response.data; // Retorna o histórico calculado atualizado pelo motor matemático
  } catch (error) {
    console.error("Erro ao salvar dados do grupo:", error.response?.data?.detail || error.message);
    throw error;
  }
};