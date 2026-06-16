import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutInstitucional from './pages/institucional/LayoutInstitucional';
import HomeInstitucional from './pages/institucional/HomeInstitucional';
import JogoHome from './pages/jogo_rpg/JogoHome';
import Auth from './pages/auth/Auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 🌎 AQUI ESTÁ O SEGREDO: O Layout "envelopa" a Home */}
        <Route element={<LayoutInstitucional />}>
          {/* O path="/" vai carregar a Home dentro do espaço <Outlet /> do Layout */}
          <Route path="/" element={<HomeInstitucional />} />
        </Route>

        {/* 🔐 Rotas Sem Menu e Sem Rodapé (Telas Cheias) */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/jogo" element={<JogoHome />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;