import React, { useState } from 'react';
import {
  Search,
  Heart,
  Settings,
  LifeBuoy,
  Leaf,
  GraduationCap,
  HeartPulse,
  Scale,
  Sparkles,
  MapPin,
  ShieldCheck
} from 'lucide-react';

// Dados mocked baseados no layout e imagem de referência
const initialOngs = [
  {
    id: 1,
    name: 'Instituto Rebrota',
    cnpj: '12.345.678/0001-90',
    description: 'Nossa missão é restaurar o equilíbrio ecológico através da biodiversidade urbana. Transformamos espaços cinzas em pulmões vivos, conectando comunidades à regeneração ativa da Floresta Amazônica em perímetros municipais.',
    cause: 'meio-ambiente',
    causeLabel: 'Meio ambiente',
    score: 96,
    icon: 'tree',
    location: 'Manaus, AM'
  },
  {
    id: 2,
    name: 'Águas Limpas Brasil',
    cnpj: '98.765.432/0001-10',
    description: 'Projetos de saneamento básico e acesso à água potável em comunidades ribeirinhas do Norte e Nordeste.',
    cause: 'saude',
    causeLabel: 'Saúde',
    score: 92,
    icon: 'drop',
    location: 'Santarém, PA'
  },
  {
    id: 3,
    name: 'Educação Sem Fronteiras',
    cnpj: '45.123.890/0001-55',
    description: 'Promovemos acesso à educação de qualidade para jovens em situação de vulnerabilidade através de bolsas e mentoria educacional.',
    cause: 'educacao',
    causeLabel: 'Educação',
    score: 88,
    icon: 'pencil',
    location: 'São Paulo, SP'
  },
  {
    id: 4,
    name: 'Vozes da Comunidade',
    cnpj: '11.222.333/0001-44',
    description: 'Defesa e fomento dos direitos humanos através de suporte legal, capacitação e denúncia de violações em áreas periféricas.',
    cause: 'direitos-humanos',
    causeLabel: 'Direitos humanos',
    score: 95,
    icon: 'scale',
    location: 'Rio de Janeiro, RJ'
  }
];

export default function CausesPage({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Lógica de filtragem (Causa + Barra de Busca)
  const filteredOngs = initialOngs.filter(ong => {
    const matchesFilter = activeFilter === 'todas' || ong.cause === activeFilter;
    const matchesSearch = 
      ong.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ong.cnpj.includes(searchQuery) ||
      ong.causeLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 bg-[#FAF8F5] min-h-screen flex font-sans">
      
      {/* Sidebar Lateral de Filtros */}
      <aside className="w-80 bg-[#F5F2EC] flex flex-col justify-between p-8 border-r border-[#E5E2D9] shrink-0">
        <div className="space-y-8">
          <div>
            <h3 className="text-[#0A3D36] font-bold text-xs uppercase tracking-wider mb-2">Filtros</h3>
            <p className="text-gray-400 text-xs font-semibold">Escolha por causas</p>
          </div>

          {/* Lista de Causas */}
          <nav className="space-y-2">
            {[
              { id: 'todas', label: 'Todas as causas', icon: Sparkles },
              { id: 'meio-ambiente', label: 'Meio ambiente', icon: Leaf },
              { id: 'educacao', label: 'Educação', icon: GraduationCap },
              { id: 'saude', label: 'Saúde', icon: HeartPulse },
              { id: 'direitos-humanos', label: 'Direitos humanos', icon: Scale },
            ].map(filter => {
              const IconComponent = filter.icon;
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-white text-[#0A665C] shadow-sm'
                      : 'text-gray-500 hover:bg-[#EBE9E3] hover:text-gray-700'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#0A665C]' : 'text-gray-400'}`} />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Botão de Doar Fundo */}
          <button 
            onClick={() => onNavigate && onNavigate('doacao')}
            className="w-full bg-[#0A665C] hover:bg-[#08524a] text-white py-4 px-6 rounded-full font-bold text-xs flex items-center justify-center space-x-2.5 shadow-md transition-colors cursor-pointer"
          >
            <Heart className="w-4.5 h-4.5 fill-white" />
            <span>Doar para o nosso fundo</span>
          </button>
        </div>

        {/* Links do rodapé da Sidebar */}
        <div className="space-y-1 pt-6 border-t border-[#E5E2D9]/60">
          <button 
            onClick={() => onNavigate && onNavigate('/gestao-ong')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-bold text-gray-500 hover:bg-[#EBE9E3] hover:text-gray-700 transition"
          >
            <Settings className="w-4 h-4 text-gray-400" />
            <span>Gestão ONG</span>
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('/sobre')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-bold text-gray-500 hover:bg-[#EBE9E3] hover:text-gray-700 transition"
          >
            <LifeBuoy className="w-4 h-4 text-gray-400" />
            <span>Suporte</span>
          </button>
        </div>
      </aside>

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 py-12 px-16 max-w-6xl mx-auto space-y-10">
        
        {/* Barra de Busca com Design Arredondado Clean */}
        <div className="relative w-full max-w-4xl">
          <span className="absolute inset-y-0 left-0 flex items-center pl-6 text-gray-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar ONGs, causas ou CNPJ..."
            className="w-full bg-white text-gray-800 placeholder-gray-400 rounded-full pl-14 pr-8 py-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.015)] focus:outline-none focus:ring-1 focus:ring-[#0A665C]/30 text-sm transition-all"
          />
        </div>

        {/* Título & Subtítulo */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-[#0A3D36] tracking-tight">
            Organizações
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Descubra e apoie iniciativas verificadas de impacto social.
          </p>
        </div>

        {/* Listagem das ONGs */}
        <div className="space-y-6 max-w-4xl">
          {filteredOngs.length > 0 ? (
            filteredOngs.map(ong => (
              <div 
                key={ong.id} 
                className="bg-white rounded-[2rem] p-8 border border-gray-100/80 shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.025)] transition-all flex items-center justify-between gap-8"
              >
                {/* Logo / Categoria Icon */}
                <div className="w-20 h-20 rounded-full bg-[#EAE8E3]/60 flex items-center justify-center shrink-0">
                  {ong.icon === 'tree' && (
                    <div className="w-14 h-14 bg-[#CBDDCD] rounded-full flex items-center justify-center text-[#0A665C]">
                      <Leaf className="w-7 h-7" />
                    </div>
                  )}
                  {ong.icon === 'drop' && (
                    <div className="w-14 h-14 bg-[#CBD9ED] rounded-full flex items-center justify-center text-[#2F6196]">
                      <LifeBuoy className="w-7 h-7 rotate-45" />
                    </div>
                  )}
                  {ong.icon === 'pencil' && (
                    <div className="w-14 h-14 bg-[#F2DDD9] rounded-full flex items-center justify-center text-[#B55A48]">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                  )}
                  {ong.icon === 'scale' && (
                    <div className="w-14 h-14 bg-[#EDE5D9] rounded-full flex items-center justify-center text-[#8C6D3F]">
                      <Scale className="w-7 h-7" />
                    </div>
                  )}
                </div>

                {/* Informações da ONG */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-900">{ong.name}</h3>
                    <span className="inline-flex items-center space-x-1 bg-[#CBDDCD] text-[#0A3D36] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verificado</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-semibold">
                    <span>CNPJ: {ong.cnpj}</span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{ong.location}</span>
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed max-w-2xl font-medium">
                    {ong.description}
                  </p>
                </div>

                {/* Score Dial Gauge / Link Ver Mais */}
                <div className="flex flex-col items-center justify-center shrink-0 space-y-3.5">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" className="stroke-[#EBE9E3]" strokeWidth="7" fill="transparent" />
                      <circle
                        cx="50" cy="50" r="40" className="stroke-[#0A665C]" strokeWidth="7" fill="transparent"
                        strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - ong.score / 100)} strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-lg font-extrabold text-[#0A3D36]">{ong.score}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onNavigate && onNavigate('ong-profile', ong)}
                    className="text-[#0A665C] hover:text-[#08524a] text-xs font-bold transition hover:underline cursor-pointer"
                  >
                    Ver Mais
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200 space-y-4">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-gray-500 font-semibold text-sm">Nenhuma organização encontrada</p>
              <p className="text-gray-400 text-xs max-w-xs mx-auto">
                Tente ajustar os filtros de causa ou remova termos da busca.
              </p>
              <button
                onClick={() => { setActiveFilter('todas'); setSearchQuery(''); }}
                className="text-[#0A665C] text-xs font-bold hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>

      </main>

    </div>
  );
}
