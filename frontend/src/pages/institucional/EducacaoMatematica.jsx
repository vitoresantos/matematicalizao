import React from 'react';

export default function EducacaoMatematica() {
  const pilaresMetodologicos = [
    { num: "01", titulo: "Gamificação Estrutural", desc: "Uso de mecânicas de jogos (regras, dados, papéis) não como distração, mas como simulação matemática de cenários da vida real." },
    { num: "02", titulo: "Raciocínio Crítico-Abstrato", desc: "Priorizar o 'porquê' os algoritmos funcionam antes de treinar exaustivamente o 'como' operá-los mecanicamente." },
    { num: "03", titulo: "Tecnologia Inteligente", desc: "Automatizar a parte burocrática e de cálculo em massa para que o tempo de aula seja focado inteiramente no debate e reflexão." }
  ];

  return (
    <section id="desafios" className="py-24 bg-gray-50 border-b border-gray-100 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-widest">
            Linha Pedagógica
          </span>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Rompendo com o Ensino Tradicional
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            A educação matemática contemporânea exige respostas para a falta de engajamento e a desconexão com a realidade.
          </p>
        </div>

        {/* Cards de Metodologia */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pilaresMetodologicos.map((pilar, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-transform">
              <div>
                <span className="text-2xl font-black text-blue-600/20 block mb-4">{pilar.num}</span>
                <h3 className="font-bold text-sm text-gray-800 mb-2">{pilar.titulo}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{pilar.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Citação Reflexiva */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-white text-center shadow-lg relative overflow-hidden max-w-3xl mx-auto">
          <span className="absolute -top-6 -left-6 text-9xl opacity-10 select-none font-serif">“</span>
          <p className="text-sm md:text-base font-medium italic relative z-10 leading-relaxed">
            "A matemática não é sobre números, equações ou algoritmos: é sobre compreensão."
          </p>
          <span className="block text-xs font-bold uppercase tracking-wider text-blue-200 mt-3">— William Paul Thurston</span>
        </div>

      </div>
    </section>
  );
}