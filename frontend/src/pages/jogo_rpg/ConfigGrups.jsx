import React, { useState } from 'react';

export default function ConfigGrupos({ configPartida, aoSalvar }) {
  // Inicializa a lista de grupos com base na quantidade configurada anteriormente
  const [grupos, setGrupos] = useState(
    Array.from({ length: configPartida.qtdGrupos }, (_, i) => ({
      numero_grupo: i + 1,
      nomes_alunos: '',
      nome_personagem: '',
      profissao_id: 1
    }))
  );

  const handleInputChange = (index, campo, valor) => {
    const novosGrupos = [...grupos];
    novosGrupos[index][campo] = valor;
    setGrupos(novosGrupos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    aoSalvar(grupos);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      
      {/* ⬅️ Botão de Desistência / Sair da Configuração */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm"
      >
        ← Cancelar e Voltar
      </button>
      
      <div className="mb-6 border-b pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">👥 Cadastro dos Grupos</h2>
          <p className="text-sm text-gray-500">Insira a composição inicial de cada mesa de RPG.</p>
        </div>
        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full font-bold">
          Turma: {configPartida.turma}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {grupos.map((grupo, idx) => (
            <div key={idx} className="border border-gray-100 bg-gray-50/50 p-4 rounded-xl space-y-3">
              <h3 className="font-bold text-sm text-blue-600 border-b pb-1">Grupo {grupo.numero_grupo}</h3>
              
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase">Integrantes (Alunos)</label>
                <input type="text" required placeholder="Ex: Ana, Bruno, Carlos"
                  className="mt-1 w-full p-2 border rounded-md bg-white text-xs outline-none focus:border-blue-500"
                  value={grupo.nomes_alunos} onChange={e => handleInputChange(idx, 'nomes_alunos', e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase">Nome do Personagem</label>
                  <input type="text" required placeholder="Ex: Magnata Corp"
                    className="mt-1 w-full p-2 border rounded-md bg-white text-xs outline-none focus:border-blue-500"
                    value={grupo.nome_personagem} onChange={e => handleInputChange(idx, 'nome_personagem', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase">Profissão (Nº Sorteado)</label>
                  <select 
                    className="mt-1 w-full p-2 border rounded-md bg-white text-xs outline-none focus:border-blue-500 font-medium text-gray-700"
                    value={grupo.profissao_id} onChange={e => handleInputChange(idx, 'profissao_id', parseInt(e.target.value))}
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i+1} value={i+1}>Profissão {i+1}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-sm transition-all shadow-md mt-4">
          Iniciar Partida e Abrir Rodada 1 🚀
        </button>
      </form>
    </div>
  );
}