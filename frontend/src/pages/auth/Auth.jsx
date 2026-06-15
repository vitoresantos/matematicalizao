import React, { useState } from 'react';
import { validarCPF } from '../services/validators'; // Importa a função acima

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Alterna entre Login e Cadastro
  
  // Estados dos campos
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [escola, setEscola] = useState('');
  const [uf, setUf] = useState('');
  
  // Estados de erro e validação
  const [cpfInvalido, setCpfInvalido] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  // Aplica máscara de CPF automaticamente enquanto o professor digita
  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Mantém apenas números
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      setCpf(value);
    }
    
    // Se terminou de digitar os 11 números, valida matematicamente
    if (e.target.value.replace(/\D/g, '').length === 11) {
      setCpfInvalido(!validarCPF(e.target.value));
    } else {
      setCpfInvalido(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErroGeral('');

    if (isLogin) {
      // LÓGICA DE LOGIN
      console.log("Executando login com:", { email, senha });
      // Aqui chamamos o backend: axios.post('/api/login', { email, senha })
    } else {
      // LÓGICA DE CADASTRO
      if (cpfInvalido || !cpf) {
        setErroGeral('Por favor, insira um CPF válido para prosseguir.');
        return;
      }
      console.log("Executando cadastro de:", { nomeCompleto, cpf, escola, uf, email, senha });
      // Aqui chamamos o backend: axios.post('/api/cadastro', { ... })
    }
  };

  // Lista simples de UFs para o seletor dropdown
  const UFs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
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

          {/* Botão de Envio */}
          <button
            type="submit"
            disabled={!isLogin && cpfInvalido}
            className={`w-full py-3 rounded-lg text-white font-bold text-sm transition-all mt-2 ${
              !isLogin && cpfInvalido 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-md'
            }`}
          >
            {isLogin ? 'Entrar no Painel' : 'Concluir Cadastro'}
          </button>
        </form>

        {/* Alternador de Modo */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            {isLogin ? 'Não tem uma conta?' : 'Já possui uma conta?'}
            <button
              onClick={() => { setIsLogin(!isLogin); setErroGeral(''); }}
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