import React, { useState, useEffect } from 'react';
import ConfigPartida from './ConfigPartida'; // Importa a tela de configuração que já criamos

export default function JogoHome() {
  // Simulação de estados globais (em um app real, viriam do Context de Autenticação)
  const [estaLogado, setEstaLogado] = useState(true); 
  const [totalPartidasCriadas, setTotalPartidasCriadas] = useState(4); // Exemplo: professor tem 4 partidas
  const [modoConfiguracao, setModoConfiguracao] = useState(false);

  const limiteGratuito = 10;

  // Função para simular o download do manual pedagógico em PDF
  const handleDownloadPDF = () => {
    alert("Disparando o download do arquivo 'Regras_e_Observacoes_RPG_Financeiro.pdf'...");
    // Em produção: window.open('/arquivos/manual_regras.pdf', '_blank');
  };

  const handleIniciarBotao = () => {
    if (!estaLogado) {
      alert("Acesso restrito: Por favor, faça login ou cadastre-se para criar uma partida.");
      // Em produção: redirecionar para a tela de Login
      return;
    }
    
    if (totalPartidasCriadas >= limiteGratuito) {
      alert("Limite atingido: Você já possui 10 partidas salvas. Libere espaço apagando uma antiga ou faça o upgrade.");
      return;
    }

    // Se passou nas validações, destrava a tela de configuração
    setModoConfiguracao(true);
  };

  // Se o professor clicou em iniciar e passou nos testes, renderiza a tela de configuração diretamente
  if (modoConfiguracao) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <ConfigPartida aoAvancar={(dados) => console.log("Dados salvos:", dados)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col justify-between">
      
      {/* 🔝 Barra Superior de Status */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center text-xs">
          <span className="font-black tracking-wider text-blue-400">🎮 PLATAFORMA RPG FINANCEIRO</span>
          <div className="flex items-center gap-4">
            {estaLogado ? (
              <span className="bg-gray-800 text-gray-300 px-3 py-1.5 rounded-md font-medium border border-gray-700">
                👤 Professor Logado ({totalPartidasCriadas}/{limiteGratuito} Partidas)
              </span>
            ) : (
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-md transition-colors">
                Fazer Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 🚀 Conteúdo Principal */}
      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 flex flex-col items-center justify-center text-center">
        
        {/* Selo e Título */}
        <span className="bg-blue-500/10 text-blue-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-4 border border-blue-500/20">
          Matemática Financeira Gamificada
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight max-w-2xl leading-tight mb-4">
          Simulador de Investimentos e Planejamento de Vida
        </h1>
        
        {/* Espaço reservado para o resumo que você adicionará depois */}
        <p className="text-sm md:text-base text-gray-400 max-w-xl leading-relaxed mb-8">
          [O seu breve resumo sobre o jogo entrará aqui de forma descritiva, explicando a dinâmica das profissões, o impacto dos dados e a gestão de investimentos por parcelas ou capital único durante as rodadas.]
        </p>

        {/* 🎮 Botão Principal de Entrada */}
        <div className="mb-12 w-full max-w-xs">
          <button
            onClick={handleIniciarBotao}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-sm tracking-wide uppercase transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
          >
            Configurar Nova Partida ➔
          </button>
          {estaLogado && totalPartidasCriadas >= limiteGratuito && (
            <p className="text-red-400 text-[11px] font-semibold mt-2">
              🔒 Limite de 10 partidas gratuito atingido.
            </p>
          )}
        </div>

        {/* 🗂️ Seção de Recursos Pedagógicos (Download das Regras) */}
        <div className="w-full border-t border-gray-800 pt-8 mt-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between text-left gap-4 max-w-2xl mx-auto">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                📖 Manual de Orientação Docente
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Baixe o PDF completo contendo a estrutura de aplicação, orientações pedagógicas para a SEEDF e sugestões de discussões pós-jogo.
              </p>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="w-full sm:w-auto shrink-0 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 font-bold px-4 py-2.5 rounded-lg text-xs transition-colors"
            >
              📥 Baixar Regras (PDF)
            </button>
          </div>
        </div>

      </main>

      {/* 💻 Rodapé */}
      <footer className="border-t border-gray-900 bg-gray-950 p-4 text-center text-[10px] text-gray-600">
        &copy; {new Date().getFullYear()} RPG Financeiro - Todos os direitos reservados.
      </footer>

    </div>
  );
}