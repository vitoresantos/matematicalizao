import React, { useState } from 'react';

export default function PainelRodada({ configPartida, grupos }) {
  const [rodadaAtual, setRodadaAtual] = useState(1);
  const [dadosLancamento, setDadosLancamento] = useState(
    grupos.map(g => ({
      grupo_id: g.numero_grupo,
      nome_personagem: g.nome_personagem,
      dado_aluno: 3,
      slot1_id: '', slot1_valor: 0, slot1_tipo: 'capital_unico',
      slot2_id: '', slot2_valor: 0, slot2_tipo: 'capital_unico',
      slot3_id: '', slot3_valor: 0, slot3_tipo: 'capital_unico',
    }))
  );

  const handleRowChange = (idx, campo, valor) => {
    const novosLancamentos = [...dadosLancamento];
    novosLancamentos[idx][campo] = valor;
    setDadosLancamento(novosLancamentos);
  };

  const salvarGrupo = (idx) => {
    console.log(`Enviando dados do Grupo ${dadosLancamento[idx].grupo_id} para o Backend:`, dadosLancamento[idx]);
    alert(`Grupo ${dadosLancamento[idx].grupo_id} calculado e salvo com sucesso!`);
  };

  // Cálculo dos gatilhos com base na regra algébrica do professor
  const rodadaMundo1 = (configPartida.totalRodadas / 2) - 1;
  const rodadaMundo2 = configPartida.totalRodadas - 2;

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Cabeçalho de Controle de Rodada */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">🕹️ Central de Lançamentos</h2>
          <p className="text-xs text-gray-500">Duração da rodada: {configPartida.anosRodada} anos ({configPartida.anosRodada * 12} meses)</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold bg-blue-50 text-blue-700 px-4 py-2 rounded-xl border border-blue-100">
            RODADA {rodadaAtual} / {configPartida.totalRodadas}
          </span>
          {(rodadaAtual === rodadaMundo1 || rodadaAtual === rodadaMundo2) && (
            <span className="text-xs bg-amber-500 text-white font-extrabold px-3 py-2 rounded-xl animate-pulse">
              ⚠️ PRÓXIMA É RODADA DO MUNDO
            </span>
          )}
        </div>
      </div>

      {/* Tabela de Lançamento em Massa */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-800 text-white text-[11px] font-bold uppercase tracking-wider">
              <th className="p-3 rounded-l-lg">Mesa</th>
              <th className="p-3">Personagem</th>
              <th className="p-3 w-20 text-center">Dado (1-6)</th>
              <th className="p-3 text-center">Slot 1 (Ativo / Aporte / Tipo)</th>
              <th className="p-3 text-center">Slot 2 (Ativo / Aporte / Tipo)</th>
              <th className="p-3 text-center">Slot 3 (Ativo / Aporte / Tipo)</th>
              <th className="p-3 text-center rounded-r-lg">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {dadosLancamento.map((item, idx) => (
              <tr key={item.grupo_id} className="hover:bg-gray-50/70 transition-colors">
                <td className="p-3 font-bold text-gray-700">G{item.grupo_id}</td>
                <td className="p-3 font-medium text-gray-900">{item.nome_personagem}</td>
                
                {/* Dado do Aluno */}
                <td className="p-3 text-center">
                  <input type="number" min="1" max="6"
                    className="w-14 p-1.5 border rounded bg-white text-center font-bold text-sm text-blue-600 focus:ring-1 focus:ring-blue-500 outline-none"
                    value={item.dado_aluno} onChange={e => handleRowChange(idx, 'dado_aluno', parseInt(e.target.value))} />
                </td>

                {/* SLOT 1 */}
                <td className="p-2 bg-blue-50/20">
                  <div className="flex flex-col gap-1">
                    <select className="p-1 border rounded bg-white text-[11px]" value={item.slot1_id} onChange={e => handleRowChange(idx, 'slot1_id', e.target.value)}>
                      <option value="">Nenhum Ativo</option>
                      {Array.from({length: 12}, (_, i) => <option key={i+1} value={i+1}>Nº {i+1}</option>)}
                    </select>
                    <input type="number" placeholder="R$ 0,00" className="p-1 border rounded bg-white text-[11px]" value={item.slot1_valor || ''} onChange={e => handleRowChange(idx, 'slot1_valor', parseFloat(e.target.value))} />
                    <select className="p-0.5 text-[9px] border bg-gray-50 text-gray-600 rounded" value={item.slot1_tipo} onChange={e => handleRowChange(idx, 'slot1_tipo', e.target.value)}>
                      <option value="capital_unico">Único (Mesa)</option>
                      <option value="parcela_mensal">Mensal (Salário)</option>
                    </select>
                  </div>
                </td>

                {/* SLOT 2 */}
                <td className="p-2">
                  <div className="flex flex-col gap-1">
                    <select className="p-1 border rounded bg-white text-[11px]" value={item.slot2_id} onChange={e => handleRowChange(idx, 'slot2_id', e.target.value)}>
                      <option value="">Nenhum Ativo</option>
                      {Array.from({length: 12}, (_, i) => <option key={i+1} value={i+1}>Nº {i+1}</option>)}
                    </select>
                    <input type="number" placeholder="R$ 0,00" className="p-1 border rounded bg-white text-[11px]" value={item.slot2_valor || ''} onChange={e => handleRowChange(idx, 'slot2_valor', parseFloat(e.target.value))} />
                    <select className="p-0.5 text-[9px] border bg-gray-50 text-gray-600 rounded" value={item.slot2_tipo} onChange={e => handleRowChange(idx, 'slot2_tipo', e.target.value)}>
                      <option value="capital_unico">Único (Mesa)</option>
                      <option value="parcela_mensal">Mensal (Salário)</option>
                    </select>
                  </div>
                </td>

                {/* SLOT 3 */}
                <td className="p-2 bg-blue-50/20">
                  <div className="flex flex-col gap-1">
                    <select className="p-1 border rounded bg-white text-[11px]" value={item.slot3_id} onChange={e => handleRowChange(idx, 'slot3_id', e.target.value)}>
                      <option value="">Nenhum Ativo</option>
                      {Array.from({length: 12}, (_, i) => <option key={i+1} value={i+1}>Nº {i+1}</option>)}
                    </select>
                    <input type="number" placeholder="R$ 0,00" className="p-1 border rounded bg-white text-[11px]" value={item.slot3_valor || ''} onChange={e => handleRowChange(idx, 'slot3_valor', parseFloat(e.target.value))} />
                    <select className="p-0.5 text-[9px] border bg-gray-50 text-gray-600 rounded" value={item.slot3_tipo} onChange={e => handleRowChange(idx, 'slot3_tipo', e.target.value)}>
                      <option value="capital_unico">Único (Mesa)</option>
                      <option value="parcela_mensal">Mensal (Salário)</option>
                    </select>
                  </div>
                </td>

                {/* Ação de Cálculo individual */}
                <td className="p-3 text-center">
                  <button type="button" onClick={() => salvarGrupo(idx)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded shadow-sm transition-colors text-[11px]">
                    Calcular
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Rodapé de Encerramento de Turno */}
      <div className="mt-6 flex justify-end border-t pt-4">
        <button onClick={() => setRodadaAtual(prev => Math.min(configPartida.totalRodadas, prev + 1))}
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold px-6 py-2.5 rounded-lg text-xs shadow transition-all">
          Concluir Rodada e Atualizar Visores ➔
        </button>
      </div>
    </div>
  );
}