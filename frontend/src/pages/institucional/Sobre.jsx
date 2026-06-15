import React from 'react';

export default function Sobre() {
  return (
    <section id="sobre" className="py-24 bg-white border-b border-gray-50 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Nossa Missão com a Matemática
          </h2>
          <div className="h-1 w-12 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-sm text-gray-500 leading-relaxed">
            O Matematicalização é mais do que uma plataforma; é um movimento pedagógico para transformar a cultura do aprendizado exato no Brasil.
          </p>
        </div>

        {/* Bloco de Texto e Manifesto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">O Manifesto Matematicalização</h3>
            <p>
              A matemática é a linguagem com a qual estruturamos o universo e tomamos decisões lógicas. No entanto, o ensino tradicional a transformou em um conjunto de regras rígidas e memorizações sem propósito, gerando o bloqueio e a famosa "ansiedade matemática".
            </p>
            <p>
              Nosso objetivo é **matematizar** os processos cotidianos. Queremos que o estudante e o docente vejam a matemática como uma ferramenta viva de investigação, criatividade e emancipação intelectual.
            </p>
          </div>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">A Ciência do Aprendizado</h3>
            <p>
              Baseados em evidências da neurociência cognitiva e em metodologias ativas de resolução de problemas, desenvolvemos ecossistemas de aprendizagem onde o erro não é uma falha, mas sim o dado mais valioso do processo de modelagem matemática.
            </p>
          </div>
        </div>

        {/* Os Dois Pilares de Atuação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 border border-gray-100 rounded-2xl bg-gradient-to-br from-blue-50/30 to-transparent">
            <span className="text-2xl mb-4 block">👨‍🏫</span>
            <h4 className="text-base font-bold text-gray-900 mb-2">Para Professores (O Motor)</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Capacitação focada em design de experiências de aprendizagem, gamificação avançada e análise de dados pedagógicos para otimizar o tempo em sala de aula.
            </p>
          </div>

          <div className="p-8 border border-gray-100 rounded-2xl bg-gradient-to-br from-emerald-50/30 to-transparent">
            <span className="text-2xl mb-4 block">🧠</span>
            <h4 className="text-base font-bold text-gray-900 mb-2">Para Alunos (A Autonomia)</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Treinamento em técnicas de estudo autodidata, metacognição e gerenciamento de foco para que o estudante aprenda a quebrar problemas complexos sozinho.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}