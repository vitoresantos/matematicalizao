import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // 🟢 Importado o Navigate aqui
import LayoutInstitucional from './pages/institucional/LayoutInstitucional';
import HomeInstitucional from './pages/institucional/HomeInstitucional';
import JogoHome from './pages/jogo_rpg/JogoHome';
import Auth from './pages/auth/Auth';
import ConfigGrupos from './pages/jogo_rpg/ConfigGrups';
import Dashboard from './pages/dashboard/Dashboard';

// 🛡️ Componente de Proteção por Grupo Atualizado para o Banco Real
function RotaProtegido() {
  const token = localStorage.getItem('token_usuario'); // Verifica se o token de acesso gerado no login existe salvo no navegado

  if (!token) {
    // Se não houver chave de acesso, barra na hora e joga para o Login (/auth)
    return <Navigate to="/auth" replace />;
  }

 // Se o token existe, renderiza as páginas do jogo
  return <LayoutInstitucional />; 
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 🌎 ROTAS PÚBLICAS (Apenas a Home usa o menu institucional padrão) */}
        <Route element={<LayoutInstitucional />}>
          <Route path="/" element={<HomeInstitucional />} />
        </Route>

        {/* 🔐 ROTA DE AUTENTICAÇÃO (Tela cheia, pública) */}
        <Route path="/auth" element={<Auth />} />
        
        {/* 🛡️ TODAS AS ROTAS PROTEGIDAS CENTRALIZADAS AQUI (Sem nenhuma duplicidade!) */}
        <Route element={<RotaProtegido />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jogo" element={<JogoHome />} />
          <Route path="/cadastrar-grupos" element={<ConfigGrupos />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;