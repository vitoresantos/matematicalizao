import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Importações das páginas baseadas na sua estrutura real de arquivos
import HomeInstitucional from './pages/institucional/HomeInstitucional.jsx'
import Sobre from './pages/institucional/Sobre.jsx'
import EducacaoMatematica from './pages/institucional/EducacaoMatematica.jsx'
import Contatos from './pages/institucional/Contatos.jsx'
import Auth from './pages/auth/Auth.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import JogoHome from './pages/jogo_rpg/JogoHome.jsx'
import ConfigPartida from './pages/jogo_rpg/ConfigPartida.jsx'
import ConfigGrups from './pages/jogo_rpg/ConfigGrups.jsx'
import CentralLancamentos from './pages/jogo_rpg/CentralLancamentos.jsx'

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Institucionais do site */}
        <Route path="/" element={<HomeInstitucional />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/educacao-matematica" element={<EducacaoMatematica />} />
        <Route path="/contatos" element={<Contatos />} />

        {/* Autenticação (Login/Cadastro) */}
        <Route path="/auth" element={<Auth />} />

        {/* Área Restrita / Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Rotas do Jogo RPG */}
        <Route path="/jogo" element={<JogoHome />} />
        <Route path="/jogo/configurar-partida" element={<ConfigPartida />} />
        <Route path="/jogo/configurar-grupos" element={<ConfigGrups />} />
        <Route path="/jogo/central-lancamentos" element={<CentralLancamentos />} />

        {/* Redireciona qualquer rota inexistente de volta para a Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App