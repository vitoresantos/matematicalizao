import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfigPartida from './ConfigPartida'; 

export default function JogoHome() {
  const navigate = useNavigate();

  // 📝 1. Estados dinâmicos que virão do Banco de Dados
  const [nomeProfessor, setNomeProfessor] = useState('Professor'); // Valor padrão enquanto carrega
  const [totalPartidasCriadas, setTotalPartidasCriadas] = useState(0); // Começa em 0 antes da API responder
  const [carregandoDados, setCarregandoDados] = useState(true);
  const [modoConfiguracao, setModoConfiguracao] = useState(false);

  const limiteGratuito = 10;

  // 🔄 2. Chamada à API/Database assim que o componente monta em tela
  useEffect(() => {
    async function buscarDadosDoProfessor() {
      try {
        setCarregandoDados(true);
        
        // TODO INTEGRAÇÃO BACKEND: Aqui você fará a chamada para o seu FastAPI
        // const token = localStorage.getItem('token_usuario');
        // const resposta = await axios.get('/api/v1/professor/perfil', { headers: { Authorization: `Bearer ${token}` } });
        
        // SIMULAÇÃO DE RETORNO DA DATABASE (Substitua pelos dados reais da API futuramente):
        const dadosDoBanco = {
          nome: "Vitor", // 👤 Nome dinâmico vindo da tabela de usuários
          partidasAtivas: 4 // 📊 Contagem real vinda do COUNT de partidas no banco
        };

        // Atualiza os estados do React com o que veio da Database
        setNomeProfessor(dadosDoBanco.nome);
        setTotalPartidasCriadas(dadosDoBanco.partidasAtivas);

      } catch (error) {
        console.error("Erro ao buscar dados do banco de dados:", error);
      } finally {
        setCarregandoDados(false);
      }
    }

    buscarDadosDoProfessor();
  }, []);

  // Função para simular o download do manual pedagógico em PDF
  const handleDownloadPDF = () => {
    alert("Disparando o download do arquivo 'Regras_e_Observacoes_RPG_Financeiro.pdf'...");
  };

  const handleIniciarBotao = () => {
    if (totalPartidasCriadas >= limiteGratuito) {
      alert("Limite atingido: Você já possui 10 partidas salvas. Libere espaço apagando uma antiga ou faça o upgrade.");
      return;
    }

    // Se passou na validação do limite da database, abre a configuração
    setModoConfiguracao(true);
  };

  // Se clicou em iniciar, renderiza a tela de configuração
  if (modoConfiguracao) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center relative">
        {/* Botão para desistir da configuração e voltar para esta Home do jogo */}
        <button 
          onClick={() => setModoConfiguracao(false)}
          className="absolute top-6 left-6 text-sm bg-white px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-700 hover:bg-gray-50"
        >
          ← Voltar
        </button>
        <ConfigPartida />
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
            
            {/* 👤 EXIBIÇÃO DINÂMICA DO BANCO DE DADOS */}
            {carregandoDados ? (
              <span className="text-gray-500 animate-pulse">Carregando dados do painel...</span>
            ) : (
              <span className="bg-gray-800 text-gray-300 px-3 py-1.5 rounded-md font-medium border border-gray-700">
                👋 Olá, {nomeProfessor} ({totalPartidasCriadas}/{limiteGratuito} Partidas)
              </span>
            )}

          </div>
        </div>
      </header>

      {/* 🚀 Conteúdo Principal */}
      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 flex flex-col items-center justify-center text-center">
        
        <span className="bg-blue-500/10 text-blue-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-4 border border-blue-500/20">
          Matemática Financeira Gamificada
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight max-w-2xl leading-tight mb-4">
          Simulador de Investimentos e Planejamento de Vida
        </h1>
        
        <p className="text-sm md:text-base text-gray-400 max-w-xl leading-relaxed mb-8">
          [O seu breve resumo sobre o jogo entrará aqui de forma descritiva, explicando a dinâmica das profissões, o impacto dos dados e a gestão de investimentos por parcelas ou capital único durante as rodadas.]
        </p>

        {/* 🎮 Botão Principal de Entrada */}
        <div className="mb-12 w-full max-w-xs">
          <button
            onClick={handleIniciarBotao}
            disabled={carregandoDados}
            className={`w-full text-white font-bold py-4 px-6 rounded-xl text-sm tracking-wide uppercase transition-all shadow-lg active:scale-[0.98] ${
              carregandoDados 
                ? 'bg-gray-700 cursor-not-allowed shadow-none' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
            }`}
          >
            Configurar Nova Partida ➔
          </button>
          {!carregandoDados && totalPartidasCriadas >= limiteGratuito && (
            <p className="text-red-400 text-[11px] font-semibold mt-2">
              🔒 Limite de 10 partidas atingido.
            </p>
          )}
        </div>

        {/* 🗂️ Seção de Recursos Pedagógicos */}
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