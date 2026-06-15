import React, { useState } from 'react';

export default function ModalMundo({ isOpen, numeroRodada, aoConfirmar }) {
  const [dadoSorteado, setDadoSorteado] = useState('');
  const [consequenciaVisual, setConsequenciaVisual] = useState(null);

  if (!isOpen) return null;

  // Tabela de efeitos macroeconômicos para exibição dinâmica em tempo real
  const EFEITOS_MUNDO = {
    1: { titulo: "💥 Dado 1: Crash Sistêmico (Desastroso)", cor: "text-red-600 bg-red-50 border-red-200", desc: "Pânico nos mercados! O sistema confisca automaticamente 30% do saldo acumulado em todos os ativos de risco (Médio, Alto e Muito Alto) de cada grupo." },
    2: { titulo: "📉 Dado 2: Crise de Inflação (Prejudicial)", cor: "text-orange-600 bg-orange-50 border-orange-200", desc: "Aceleração drástica do custo de vida. O poder de compra corrói e o salário-base de todos os personagens é reduzido em 10% para o início da próxima rodada." },
    3: { titulo: "⚖️ Dado 3: Estabilidade de Mercado (Neutro)", cor: "text-gray-600 bg-gray-50 border-gray-200", desc: "Cenário econômico previsível e estável. Não há penalidades nem bônus gerais. Os investimentos e salários seguem o fluxo normal do motor matemático." },
    4: { titulo: "💰 Dado 4: Incentivo Fiscal (Favorável)", cor: "text-emerald-600 bg-emerald-50 border-emerald-200", desc: "Governo injeta estímulos na economia. Todos os grupos recebem um bônus imediato de R$ 500,00 adicionados direto no Caixa Livre para a próxima rodada." },
    5: { titulo: "🚀 Dado 5: Boom de Commodities (Propício)", cor: "text-teal-600 bg-teal-50 border-teal-200", desc: "Forte valorização do mercado de capitais. Grupos que se arriscaram recebem uma bonificação de +5% incidentes sobre os saldos finais dos ativos de risco." },
    6: { titulo: "🛡️ Dado 6: Revolução Tecnológica (Excepcional)", cor: "text-blue-600 bg-blue-50 border-blue-200", desc: "Salto massivo de produtividade global. Todos os personagens da sala ganham um aumento salarial permanente de 15% que se propagará até o fim do jogo." }
  };

  const handleInputChange = (valor) => {
    const num = parseInt(valor);
    setDadoSorteado(valor);
    
    if (num >= 1 && num <= 6) {
      setConsequenciaVisual(EFEITOS_MUNDO[num]);
    } else {
      setConsequenciaVisual(null);
    }
  };

  const handleSalvarEAvancar = () => {
    if (!dadoSorteado || dadoSorteado < 1 || dadoSorteado > 6) return;
    
    // Dispara a chamada que avisa o componente pai para enviar o payload ao Backend
    aoConfirmar(parseInt(dadoSorteado));
    
    // Limpa o estado interno para o próximo evento de mundo (ex: da rodada 4 para a 8)
    setDadoSorteado('');
    setConsequenciaVisual(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-gray-100 transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabeçalho Temático */}
        <div className="text-center mb-6 border-b pb-4">
          <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
            🌍 Evento Macroeconômico Global
          </span>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Fim da Rodada {numeroRodada}</h2>
          <p className="text-xs text-gray-500 mt-1">O mundo mudou. O professor deve lançar o dado de conjuntura de mercado.</p>
        </div>

        {/* Campo do Lançamento */}
        <div className="bg-gray-50 border rounded-xl p-4 flex flex-col items-center justify-center space-y-3 mb-5">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Número tirado no dado físico</label>
          <input 
            type="number" min="1" max="6" placeholder="?"
            className="w-20 p-3 text-center border-2 border-gray-300 rounded-xl font-black text-2xl text-blue-600 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none shadow-inner transition-all"
            value={dadoSorteado}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>

        {/* Feedback Dinâmico do Efeito Pedagógico */}
        <div className="min-h-[120px] flex items-center justify-center">
          {consequenciaVisual ? (
            <div className={`w-full p-4 border rounded-xl transition-all ${consequenciaVisual.cor}`}>
              <h4 className="font-extrabold text-sm mb-1.5 tracking-tight">{consequenciaVisual.titulo}</h4>
              <p className="text-xs leading-relaxed font-medium">{consequenciaVisual.desc}</p>
            </div>
          ) : (
            <p className="text-xs text-gray-400 font-medium italic text-center max-w-xs">
              Aguardando o sorteio do dado físico para calcular os impactos nas carteiras dos alunos...
            </p>
          )}
        </div>

        {/* Botão de Envio para o FastAPI */}
        <div className="mt-6 border-t pt-4 flex gap-3">
          <button
            type="button"
            disabled={!consequenciaVisual}
            onClick={handleSalvarEAvancar}
            className={`w-full py-3 rounded-xl text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md ${
              consequenciaVisual 
                ? 'bg-gray-900 hover:bg-gray-800 active:scale-[0.98]' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Aplicar Consequências e Avançar ➔
          </button>
        </div>

      </div>
    </div>
  );
}