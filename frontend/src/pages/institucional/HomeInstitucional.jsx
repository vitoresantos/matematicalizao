import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function HomeInstitucional() { 
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate(); 

  const aoNavegarParaOJogo = () => {
  navigate('/jogo');
};
  const aoNavegarParaAuth = () => {
  navigate('/auth'); 
};

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans scroll-smooth">
      
      {/* 🧭 1. Menu de Navegação Superior (Navbar) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center w-full">
          
          {/* 1. LADO ESQUERDO: Logo da Instituição */}
          <div className="flex items-center select-none cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/arquivos/logo.png" 
              alt="Logo Matematicalização" 
              className="navbar-logo"
            />
          </div>

          {/* 2. CENTRO: Links do Menu (Fica exatamente no meio da tela no PC) */}
          <div className="hidden lg:flex navbar-links-center">
            <a href="#inicio" className="navbar-link">Início</a>
            <a href="#sobre" className="navbar-link">Sobre</a>
            <a href="#desafios" className="navbar-link">Educação Matemática</a>
            <a href="#jogo" className="navbar-link">Jogo RPG</a>
            <a href="#contato" className="navbar-link">Contatos</a>
          </div>

          {/* 3. LADO DIREITO: Botão de Login / Cadastro */}
          <div className="hidden lg:block">
            <button 
              onClick={aoNavegarParaAuth}
              className="navbar-btn-primary"
            >
              Entrar / Cadastrar ➔
            </button>
          </div>

          {/* 4. BOTÃO HAMBÚRGUER: Aparece APENAS no celular/tablet */}
          <button 
            className="mobile-menu-toggle focus:outline-none"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            {menuAberto ? '✕' : '☰'}
          </button>
        </div>

        {/* 5. MENU RETRÁTIL MOBILE: Abre apenas no celular se clicado */}
        {menuAberto && (
          <div className="mobile-menu-dropdown">
            <a href="#inicio" className="navbar-link" onClick={() => setMenuAberto(false)}>Início</a>
            <a href="#sobre" className="navbar-link" onClick={() => setMenuAberto(false)}>Sobre</a>
            <a href="#desafios" className="navbar-link" onClick={() => setMenuAberto(false)}>Educação Matemática</a>
            <a href="#jogo" className="navbar-link" onClick={() => setMenuAberto(false)}>Jogo RPG</a>
            <a href="#contato" className="navbar-link" onClick={() => setMenuAberto(false)}>Contatos</a>
            <button 
              onClick={() => { setMenuAberto(false); aoNavegarParaAuth(); }}
              className="navbar-btn-mobile"
            >
              Entrar / Cadastrar ➔
            </button>
          </div>
        )}
      </nav>

      {/* 🚀 2. Seção de Boas-Vindas (Hero Section) */}
      <section id="inicio" className="pt-32 pb-20 bg-gradient-to-b from-blue-50/50 to-white px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="bg-blue-100 text-blue-700 text-[11px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full">
            Aperfeiçoamento no Ensino e Aprendizagem
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Desmistificando a Matemática de forma profunda e autônoma.
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Uma instituição dedicada a transformar a prática docente de professores e equipar alunos com ferramentas de neuroaprendizagem para estudar e aprender sozinhos.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <a href="#jogo" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all">
              Conhecer o Jogo Financeiro
            </a>
            <a href="#sobre" className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold text-sm px-6 py-3.5 rounded-xl transition-all">
              Saber Mais Sobre Nós
            </a>
          </div>
        </div>
      </section>

      {/* 📐 3. Seção: Sobre a Matematicalização */}
      <section id="sobre" className="py-20 max-w-5xl mx-auto px-4 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">O que é a Matematicalização?</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Nascemos com o propósito de redefinir o ensino da matemática. Acreditamos que o aprendizado matemático não deve ser baseado na memorização mecânica de fórmulas, mas sim na construção ativa do pensamento crítico e do raciocínio lógico-abstrato.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Oferecemos cursos especializados de capacitação, metodologias ativas inovadoras e recursos gamificados para que **professores** liderem salas de aula engajadas. Como subproduto direto, preparamos **alunos** para dominarem processos cognitivos de autoaprendizagem, capacitando-os a evoluir de forma independente.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="p-4 bg-white rounded-xl border border-gray-100">
              <h4 className="font-bold text-sm text-blue-600 mb-1">💡 Foco no Professor</h4>
              <p className="text-xs text-gray-500">Formação contínua, dinâmicas imersivas e ferramentas de gestão pedagógica para o dia a dia escolar.</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-gray-100">
              <h4 className="font-bold text-sm text-emerald-600 mb-1">🧠 Autonomia do Aluno</h4>
              <p className="text-xs text-gray-500">Estratégias baseadas em neurociência educacional para que o estudante aprenda a aprender matemática sozinho.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 📉 4. Seção: Desafios da Educação Matemática */}
      <section id="desafios" className="py-20 bg-gray-50 border-y border-gray-100 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Os Desafios do Ensino Tradicional</h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            A educação matemática enfrenta barreiras históricas: o desinteresse, a ansiedade matemática e a falta de conexão com a realidade prática dos estudantes.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <div className="text-xl mb-3">🧩</div>
            <h3 className="font-bold text-sm text-gray-800 mb-2">Abstração Sem Contexto</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Apresentar conceitos puramente abstratos sem âncoras na vida real distancia o interesse natural do estudante.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <div className="text-xl mb-3">⏳</div>
            <h3 className="font-bold text-sm text-gray-800 mb-2">Falta de Tempo Didático</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Professores sobrecarregados precisam gerenciar dados complexos em sala de aula, sobrando pouco tempo para discussões reflexivas.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <div className="text-xl mb-3">🛡️</div>
            <h3 className="font-bold text-sm text-gray-800 mb-2">Dependência de Instrução</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Alunos condicionados a apenas replicar exemplos perdem a capacidade de investigar e solucionar problemas de forma autônoma.</p>
          </div>
        </div>
      </section>

      {/* 🎲 5. Seção: Apresentação do Jogo RPG */}
      <section id="jogo" className="py-20 max-w-5xl mx-auto px-4 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-gradient-to-br from-gray-900 to-gray-850 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-4xl opacity-10">🎮</div>
            <span className="text-[10px] font-black tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full uppercase">
              Recurso Destacado
            </span>
            <h3 className="text-2xl font-black mt-3 mb-2 tracking-tight">Simulador RPG Financeiro</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Nossa primeira ferramenta prática automatizada. Um jogo de tomada de decisões, onde os alunos assumem profissões e aplicam conceitos reais de juros, inflação e riscos de mercado em rodadas dinâmicas de investimento.
            </p>
            <button 
              onClick={aoNavegarParaOJogo}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-md transition-all"
            >
              Entrar na Plataforma do Jogo ➔
            </button>
          </div>
          <div className="order-1 md:order-2 space-y-4">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Gamificação como Resposta</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Para vencer os desafios da educação matemática, o Matematicalização propõe a imersão. Ao transformar a sala de aula em um ambiente de simulação com regras claras, os alunos constroem modelos matemáticos mentais de forma natural e engajada.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              O simulador retira do professor o peso operacional dos cálculos manuais complexes, permitindo que ele foque exclusivamente na mediação pedagógica e nas provocações conceituais baseadas nos relatórios fornecidos pelo sistema.
            </p>
          </div>
        </div>
      </section>

      {/* 📞 6. Seção: Contatos */}
      <section id="contato" className="py-20 bg-gray-900 text-white px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight">Fale com o Matematicalização</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Tem alguma dúvida sobre nossas formações, quer sugerir melhorias no simulador de RPG ou levar as oficinas pedagógicas para a sua escola ou regional de ensino? Entre em contato conosco.
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>📍 Distrito Federal, Brasil</p>
              <p>📧 contato@matematicalizacao.com.br</p>
            </div>
          </div>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Seu Nome Completo" className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-blue-500" />
            <input type="email" placeholder="Seu Melhor E-mail" className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-blue-500" />
            <textarea placeholder="Como podemos ajudar a transformar sua experiência com a matemática?" rows="3" className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-blue-500"></textarea>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow-md">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </section>

      {/* 💻 7. Footer */}
      <footer className="bg-gray-950 p-6 text-center text-[10px] text-gray-500 border-t border-gray-900">
        &copy; {new Date().getFullYear()} Matematicalização. Focado no aprimoramento do ensino matemático. Todos os direitos reservados.
      </footer>

    </div>
  );
}