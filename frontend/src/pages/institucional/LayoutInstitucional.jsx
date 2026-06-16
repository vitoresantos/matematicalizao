import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export default function LayoutInstitucional() {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  const aoNavegarParaAuth = () => navigate('/auth');

  {/* 🧪 VARIÁVEL DE TESTE: Altere para 'true' para testar o menu em modo "Logado" */}
  const usuarioLogado = false; 

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans scroll-smooth">
      
      {/* 🧭 1. Menu de Navegação Superior (Navbar Fixo) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 navbar-grid-container">
          
          {/* Lado Esquerdo: Logo */}
          <div className="navbar-logo-wrapper" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); navigate('/'); }}>
            <img src="/arquivos/logo.png" alt="Logo" className="navbar-logo" />
          </div>

          {/* Centro: Links */}
          <div className="hidden lg:flex navbar-links-center">
            <a href="#inicio" className="navbar-link">Início</a>
            <a href="#sobre" className="navbar-link">Sobre</a>
            <a href="#desafios" className="navbar-link">Educação Matemática</a>
            <a href="#jogo" className="navbar-link">Jogo RPG</a>
            <a href="#contato" className="navbar-link">Contatos</a>
          </div>

          {/* Direito: Botão Dinâmico */}
          <div className="hidden lg:block navbar-button-wrapper">
            {usuarioLogado ? (
              <button onClick={() => navigate('/jogo')} className="navbar-btn-primary">
                Minha Conta (Jogar) ➔
              </button>
            ) : (
              <button onClick={aoNavegarParaAuth} className="navbar-btn-primary">
                Entrar / Cadastrar ➔
              </button>
            )}
          </div>

          {/* Hambúrguer Mobile */}
          <button className="mobile-menu-toggle focus:outline-none" onClick={() => setMenuAberto(!menuAberto)}>
            {menuAberto ? '✕' : '☰'}
          </button>
        </div>

        {/* Menu Retrátil Mobile */}
        {menuAberto && (
          <div className="mobile-menu-dropdown">
            <a href="#inicio" className="navbar-link" onClick={() => setMenuAberto(false)}>Início</a>
            <a href="#sobre" className="navbar-link" onClick={() => setMenuAberto(false)}>Sobre</a>
            <a href="#desafios" className="navbar-link" onClick={() => setMenuAberto(false)}>Educação Matemática</a>
            <a href="#jogo" className="navbar-link" onClick={() => setMenuAberto(false)}>Jogo RPG</a>
            <a href="#contato" className="navbar-link" onClick={() => setMenuAberto(false)}>Contatos</a>
            <button 
              onClick={() => { setMenuAberto(false); usuarioLogado ? navigate('/jogo') : aoNavegarParaAuth(); }}
              className="navbar-btn-mobile"
            >
              {usuarioLogado ? 'Minha Conta ➔' : 'Entrar / Cadastrar ➔'}
            </button>
          </div>
        )}
      </nav>

      {/* 🧩 2. Conteúdo Dinâmico das Páginas */}
      {/* O 'flex-get-1' garante que o conteúdo empurre o rodapé para o final da tela */}
      <main className="pt-20 flex-grow">
        <Outlet />
      </main>

      {/* 👣 3. Rodapé Institucional (Estrutura Base) */}
      <footer className="footer-container">
        <div className="max-w-6xl mx-auto px-4 footer-grid">
          
          {/* Coluna 1: Sobre a Marca */}
          <div className="footer-column">
            <h3 className="footer-title">Matematicalização</h3>
            <p className="footer-text">
              Inovando a educação matemática através do pensamento crítico e da gamificação.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="footer-column">
            <h4 className="footer-subtitle">Navegação</h4>
            <ul className="footer-links-list">
              <li><a href="#inicio">Início</a></li>
              <li><a href="#sobre">Sobre o Projeto</a></li>
              <li><a href="#jogo">O Jogo RPG</a></li>
            </ul>
          </div>

          {/* Coluna 3: Redes/Contatos */}
          <div className="footer-column">
            <h4 className="footer-subtitle">Contato</h4>
            <p className="footer-text">📧 contato@matematicalizacao.com.br</p>
            <p className="footer-text">📍 Distrito Federal, Brasil</p>
          </div>

        </div>

        {/* Linha Inferior de Direitos Autorais */}
        <div className="footer-bottom">
          <p>&copy; 2026 Matematicalização. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  );
}