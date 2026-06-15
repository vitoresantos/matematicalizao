import React, { useState } from 'react';

export default function Dashboard() {
  const [abaAtiva, setAbaAtiva] = useState('partidas'); // 'partidas' ou 'perfil'
  
  // Mock de dados do professor (viria do backend/contexto)
  const [dadosProfessor, setDadosProfessor] = useState({
    nome: "Cleyton Hércules", // Exemplo baseado em suas referências pedagógicas
    cpf: "123.456.789-00",
    escola: "SEEDF",
    uf: "DF",
    email: "professor@seedf.gov.br"
  });

  // Mock de partidas existentes
  const [partidas, setPartidas] = useState([
    { id: 1, nome: "3º Ano A - Matutino", grupos: 5, rodada: 12 },
    { id: 2, nome: "2º Ano C - Vespertino", grupos: 4, rodada: 4 },
  ]);

  const limitePartidas = 10;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar de Navegação */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
        <h2 className="text-xl font-bold mb-8 text-blue-400">RPG Financeiro</h2>
        <nav className="space-y-4 flex-1">
          <button 
            onClick={() => setAbaAtiva('partidas')}
            className={`w-full text-left p-3 rounded-lg transition ${abaAtiva === 'partidas' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            📊 Minhas Partidas
          </button>
          <button 
            onClick={() => setAbaAtiva('perfil')}
            className={`w-full text-left p-3 rounded-lg transition ${abaAtiva === 'perfil' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            👤 Meu Perfil
          </button>
        </nav>
        <button className="text-gray-400 hover:text-white text-sm mt-auto">Sair da Conta</button>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {abaAtiva === 'partidas' ? (
          <section>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Bem-vindo, Prof. {dadosProfessor.nome.split(' ')[0]}</h1>
                <p className="text-gray-500">Gerencie suas simulações de matemática financeira.</p>
              </div>
              
              {/* Contador de Limite de Partidas */}
              <div className="text-right">
                <p className="text-sm font-bold text-gray-600 mb-1">Status do Plano</p>
                <div className="w-48 bg-gray-300 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full transition-all" 
                    style={{ width: `${(partidas.length / limitePartidas) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{partidas.length} de {limitePartidas} partidas usadas</p>
              </div>
            </div>

            {/* Grid de Partidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partidas.map(p => (
                <div key={p.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{p.nome}</h3>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>👥 {p.grupos} Grupos</span>
                    <span>🎲 Rodada {p.rodada}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg font-bold text-xs hover:bg-green-200">ENTRAR</button>
                    <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100" title="Exportar CSV">📥</button>
                    <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100" title="Excluir">🗑️</button>
                  </div>
                </div>
              ))}
              
              {/* Botão de Nova Partida */}
              {partidas.length < limitePartidas && (
                <button className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 text-gray-400 hover:border-blue-400 hover:text-blue-400 transition">
                  <span className="text-3xl mb-2">+</span>
                  <span className="font-bold">Criar Nova Turma</span>
                </button>
              )}
            </div>
          </section>
        ) : (
          <section className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-bottom pb-4">Editar Informações Pessoais</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Nome Completo</label>
                <input 
                  type="text" 
                  value={dadosProfessor.nome}
                  onChange={(e) => setDadosProfessor({...dadosProfessor, nome: e.target.value})}
                  className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">CPF (Não editável)</label>
                <input 
                  type="text" 
                  value={dadosProfessor.cpf} 
                  disabled 
                  className="mt-1 w-full p-2.5 border rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">Escola</label>
                  <input 
                    type="text" 
                    value={dadosProfessor.escola}
                    onChange={(e) => setDadosProfessor({...dadosProfessor, escola: e.target.value})}
                    className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">UF</label>
                  <input 
                    type="text" 
                    value={dadosProfessor.uf}
                    onChange={(e) => setDadosProfessor({...dadosProfessor, uf: e.target.value})}
                    className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition mt-4">
                Salvar Alterações
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}