import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConfigPartida() {
  const navigate = useNavigate();

  // 🔒 1. PROTEÇÃO DE ACESSO: Verifica o login assim que a tela carrega
  useEffect(() => {
    /* 🧪 VARIÁVEL DE TESTE: 
       Mude para 'false' para simular usuário deslogado (será expulso para o /auth).
       Mude para 'true' para simular usuário logado (conseguirá configurar a partida). */
    const usuarioLogado = true; 

    if (!usuarioLogado) {
      navigate('/auth', { replace: true });
    }
  }, [navigate]);

  // Estados dos inputs do formulário
  const [idPartida, setIdPartida] = useState('');
  const [turma, setTurma] = useState('');
  const [totalRodadas, setTotalRodadas] = useState(10);
  const [anosRodada, setAnosRodada] = useState(3);
  const [qtdGrupos, setQtdGrupos] = useState(5);

  // 🚀 2. FUNÇÃO DISPARADA PELO SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aqui capturamos os dados que o professor preencheu
    const dadosConfiguracao = { idPartida, turma, totalRodadas, anosRodada, qtdGrupos };
    console.log("Dados configurados com sucesso:", dadosConfiguracao);

    // TODO FRENTE: Salvar no localStorage ou enviar para o seu FastAPI futuramente
    // localStorage.setItem('config_partida', JSON.stringify(dadosConfiguracao));

    // Navega para a tela de cadastro de grupos (Garanta que essa rota existe no App.jsx)
    navigate('/cadastrar-grupos'); 
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">⚙️ Configuração da Atividade</h2>
        <p className="text-sm text-gray-500">Defina os parâmetros macroeconômicos e o tempo de jogo.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase">ID da Partida (Único)</label>
            <input type="text" required placeholder="Ex: 3anoA_2026" 
              className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={idPartida} onChange={e => setIdPartida(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase">Identificador da Turma</label>
            <input type="text" required placeholder="Ex: 3º Ano A - Mat. Financeira" 
              className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={turma} onChange={e => setTurma(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase">Total de Rodadas (n)</label>
            <input type="number" required min="4" max="20"
              className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={totalRodadas} onChange={e => setTotalRodadas(parseInt(e.target.value) || 0)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase">Anos por Rodada (t)</label>
            <input type="number" required min="1" max="10"
              className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={anosRodada} onChange={e => setAnosRodada(parseInt(e.target.value) || 0)} />
            <span className="text-[10px] text-gray-400 block mt-1">({anosRodada * 12} meses/rodada)</span>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase">Quantidade de Grupos</label>
            <input type="number" required min="1" max="15"
              className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={qtdGrupos} onChange={e => setQtdGrupos(parseInt(e.target.value) || 0)} />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-sm transition-all shadow-md mt-4">
          Avançar para Cadastro de Grupos →
        </button>
      </form>
    </div>
  );
}