import React, { useState } from 'react';

export default function Contatos() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleEnviarMensagem = (e) => {
    e.preventDefault();
    console.log("Formulário enviado:", { nome, email, mensagem });
    alert("Mensagem enviada com sucesso! Nossa equipe pedagógica entrará em contato em breve.");
    setNome(''); setEmail(''); setMensagem('');
  };

  return (
    <section id="contato" className="py-24 bg-gray-900 text-white scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Informações Institucionais */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-blue-400 font-extrabold text-[10px] tracking-widest uppercase">Canais de Atendimento</span>
              <h2 className="text-3xl font-black tracking-tight text-white">Conecte-se Conosco</h2>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              Tem interesse em trazer as oficinas de autoaprendizagem para sua instituição de ensino, sugerir melhorias para o simulador RPG Financeiro ou propor parcerias acadêmicas? Deixe sua mensagem.
            </p>
            <div className="space-y-3 pt-4 text-xs text-gray-400">
              <div className="flex items-center gap-3">
                <span>📍</span>
                <span>Brasília, Distrito Federal — Brasil</span>
              </div>
              <div className="flex items-center gap-3">
                <span>📧</span>
                <span className="hover:text-blue-400 cursor-pointer">contato@matematicalizacao.com.br</span>
              </div>
            </div>
          </div>

          {/* Formulário Interativo */}
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700/50 shadow-xl">
            <form onSubmit={handleEnviarMensagem} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Seu Nome</label>
                <input 
                  type="text" required placeholder="Ex: Professor Thiago" 
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-blue-500 transition-colors"
                  value={nome} onChange={e => setNome(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">E-mail para Contato</label>
                <input 
                  type="email" required placeholder="Ex: thiago@escola.df.gov.br" 
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-blue-500 transition-colors"
                  value={email} onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Mensagem ou Proposta</label>
                <textarea 
                  required rows="4" placeholder="Descreva como o Matematicalização pode ajudar a transformar sua realidade educacional..." 
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-blue-500 transition-colors resize-none"
                  value={mensagem} onChange={e => setMensagem(e.target.value)}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-lg shadow-lg shadow-blue-600/10 transition-colors uppercase tracking-wider"
              >
                Enviar Mensagem para a Equipe ➔
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}