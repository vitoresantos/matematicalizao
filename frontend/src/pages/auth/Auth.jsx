import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 🚀 Importa o Axios

export default function Auth() {
  const navigate = useNavigate();
  
  // Seus estados atuais continuam aqui...
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [escola, setEscola] = useState('');
  const [uf, setUf] = useState('');
  const [erroGeral, setErroGeral] = useState('');
  const [carregando, setCarregando] = useState(false); // Novo estado para botão de loading

  // URL DB no Render)
  const API_URL = 'https://matematicalizacao-backend.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroGeral('');
    setCarregando(true);

    try {
      if (isLogin) {
        // 🔒 CONEXÃO REAL: LOGIN
        // O FastAPI usando OAuth2 espera os dados em formato "Form Data" (URL Encoded)
        const params = new URLSearchParams();
        params.append('username', email); // O backend lê o email no campo username
        params.append('password', senha);

        const resposta = await axios.post(`${API_URL}/login`, params, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // 💾 SALVA O TOKEN NO NAVEGADOR
        // Guardamos a chave de acesso para usar nas outras telas (como JogoHome e Dashboard)
        localStorage.setItem('token_usuario', resposta.data.access_token);
        
        // Redireciona com sucesso para o painel principal do professor
        navigate('/dashboard');

      } else {
        // 🔒 CONEXÃO REAL: CADASTRO
        const apenasNumerosCpf = cpf.replace(/\D/g, '');
        if (apenasNumerosCpf.length !== 11) {
          setErroGeral('Por favor, insira um CPF válido com 11 dígitos.');
          setCarregando(false);
          return;
        }

        await axios.post(`${API_URL}/cadastro`, {
          nome: nomeCompleto,
          cpf: apenasNumerosCpf,
          escola: escola,
          uf: uf,
          email: email,
          senha: senha
        });

        alert("Cadastro concluído com sucesso! Agora você já pode fazer o seu login.");
        setIsLogin(true); // Muda a tela automaticamente para o modo de Login
        setSenha(''); // Limpa a senha por segurança
      }
    } catch (error) {
      console.error("Erro na autenticação:", error);
      // Pega a mensagem exata de erro tratada que o FastAPI enviou no 'detail'
      const mensagemErro = error.response?.data?.detail || 'Erro ao conectar com o servidor do jogo.';
      setErroGeral(mensagemErro);
    } finally {
      setCarregando(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      
      {/* ⬅️ Botão Voltar para a Home do Site */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700/50 shadow-sm"
      >
        ← Voltar ao Início
      </button>
      
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 transition-all">
        
        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">🎮 RPG Financeiro</h2>
          <p className="text-sm text-gray-500 mt-2">
            {isLogin ? 'Faça login para gerenciar suas turmas' : 'Crie sua conta de professor gratuita'}
          </p>
        </div>

        {erroGeral && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded text-sm">
            {erroGeral}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* CAMPOS EXCLUSIVOS DE CADASTRO */}
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase">Nome Completo</label>
                <input
                  type="text" required
                  className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase">CPF</label>
                  <input
                    type="text" required
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className={`mt-1 w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 outline-none text-sm ${
                      cpfInvalido ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    value={cpf} onChange={handleCpfChange}
                  />
                  {cpfInvalido && <span className="text-xs text-red-500 block mt-1">CPF inválido!</span>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase">UF</label>
                  <select
                    required
                    className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    value={uf} onChange={(e) => setUf(e.target.value)}
                  >
                    <option value="">--</option>
                    {UFs.map(item => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase">Escola onde trabalha</label>
                <input
                  type="text" required
                  className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  value={escola} onChange={(e) => setEscola(e.target.value)}
                />
              </div>
            </>
          )}

          {/* CAMPOS COMUNS (LOGIN E CADASTRO) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase">E-mail</label>
            <input
              type="email" required
              placeholder="professor@escola.edu.br"
              className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase">Senha</label>
            <input
              type="password" required
              placeholder="••••••••"
              className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              value={senha} onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {/* Botão de Envio Corrigido */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-bold text-sm transition-all shadow-md mt-2 bg-blue-600 hover:bg-blue-700"
          >
            {isLogin ? 'Entrar no Painel' : 'Concluir Cadastro'}
          </button>
        </form>

        {/* Alternador de Modo */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            {isLogin ? 'Não tem uma conta?' : 'Já possui uma conta?'}
            <button
              onClick={() => { setIsLogin(!isLogin); setErroGeral(''); setCpfInvalido(false); }}
              className="text-blue-600 font-bold ml-1 hover:underline focus:outline-none"
            >
              {isLogin ? 'Cadastre-se aqui' : 'Faça login'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}