import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // 🟢 Importado o Navigate aqui
import LayoutInstitucional from './pages/institucional/LayoutInstitucional';
import HomeInstitucional from './pages/institucional/HomeInstitucional';
import JogoHome from './pages/jogo_rpg/JogoHome';
import Auth from './pages/auth/Auth';
import ConfigGrupo from './pages/jogo_rpg/ConfigGrupo';
import Dashboard from './pages/dashboard/Dashboard';

// 🛡️ Componente de Proteção por Grupo
function RotaProtegido() {
  const usuarioLogado = true; // Altere para false para testar o bloqueio de segurança

  if (!usuarioLogado) {
    // Se não estiver logado, barra o usuário e joga para o Login
    return <Navigate to="/auth" replace />;
  }

  // Se estiver logado, o Outlet permite que as páginas de dentro apareçam
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
          <Route path="/cadastrar-grupos" element={<ConfigGrupo />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;