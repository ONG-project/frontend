import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Building2,
  ShieldCheck,
  FileText,
  Target,
  ArrowLeft,
  CreditCard,
  QrCode,
  Wallet,
  Heart,
  Clock,
  CheckCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import reflorestaSeedling from '../assets/refloresta_seedling.png';
import Footer from '../components/Footer';
import UrgencyPublicSection from '../components/urgency/UrgencyPublicSection';

export default function NgoProfilePage({ ong, onNavigate }) {
  // Configuração padrão caso nenhuma ong seja passada via props
  const currentOng = ong || {
    id: 1,
    name: 'Instituto Rebrota',
    cnpj: '12.345.678/0001-90',
    location: 'Manaus, AM',
    description: 'Nossa missão é restaurar o equilíbrio ecológico através da biodiversidade urbana. Transformamos espaços cinzas em pulmões vivos, conectando comunidades à regeneração ativa da Floresta Amazônica em perímetros municipais.',
    score: 96
  };

  const navigate = useNavigate();

  // Estados para o formulário interativo de doação
  const [frequency, setFrequency] = useState('mensal'); // 'mensal', 'unica'
  const [amount, setAmount] = useState('100'); // '50', '100', '200', 'custom'
  const [customAmount, setCustomAmount] = useState('');

  const handleCompleteDonation = (e) => {
    e.preventDefault();
    const selectedAmount = amount === 'custom' ? customAmount : amount;
    navigate('/doacao', {
      state: {
        ngoId: currentOng.id,
        ngoName: currentOng.name,
        type: 'ngo',
        amount: selectedAmount,
        frequency
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      
      {/* Back button to explore causes */}
      <div className="max-w-7xl w-full mx-auto px-8 md:px-16 pt-6">
        <button 
          onClick={() => onNavigate && onNavigate('causas')}
          className="flex items-center space-x-2 text-gray-500 hover:text-[#0A665C] transition font-bold text-xs uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Causas</span>
        </button>
      </div>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-8 md:px-16 py-10 space-y-12">
        
        {/* Intro Block: Header da ONG + Bloco Transparência */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
          
          {/* Informações Principais da ONG */}
          <div className="space-y-6">
            {currentOng.verified !== false ? (
              <span className="bg-[#CBDDCD] text-[#0A3D36] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1 w-fit">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                <span>Parceiro Verificado</span>
              </span>
            ) : (
              <span className="bg-gray-150 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1 w-fit">
                <span>Aguardando Verificação</span>
              </span>
            )}

            <h1 className="text-5xl font-extrabold text-[#0A3D36] tracking-tight leading-none">
              {currentOng.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-xs font-semibold">
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{currentOng.location}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span>CNPJ: {currentOng.cnpj}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-[10px] font-semibold">
              <span>Fonte dos dados: Receita Federal & Auditoria Interna</span>
              <span>•</span>
              <span>Última atualização: {currentOng.lastUpdated || '04/06/2026'}</span>
              <span>•</span>
              <span className="text-[#0A665C]">Consistência de dados: 100% íntegro</span>
            </div>

            <p className="text-gray-600 text-base leading-relaxed max-w-2xl font-medium pt-2">
              {currentOng.description}
            </p>
          </div>

          {/* Card Transparência */}
          <div 
            onClick={() => onNavigate && onNavigate('ong-transparency', currentOng)}
            className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-[#0A665C]/20 transition-all flex flex-col justify-between items-center text-center space-y-6 cursor-pointer group"
          >
            <div className="w-full space-y-4">
              <h3 className="text-xs font-extrabold text-[#0A3D36] uppercase tracking-widest group-hover:text-[#0A665C] transition-colors">
                Transparência
              </h3>
              
              {/* Circular Dial Gauge */}
              <div className="relative w-36 h-36 flex items-center justify-center mx-auto transition-transform group-hover:scale-105 duration-300">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="stroke-[#EBE9E3]" strokeWidth="7.5" fill="transparent" />
                  <circle
                    cx="50" cy="50" r="40" className="stroke-[#0A665C]" strokeWidth="7.5" fill="transparent"
                    strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - currentOng.score / 100)} strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-[#0A3D36]">{currentOng.score}</span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">de 100</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-500 leading-relaxed max-w-[240px]">
                Pontuação máxima em saúde financeira e prestação de contas.
              </p>
              <span className="inline-flex items-center text-[#0A665C] group-hover:text-[#08524a] text-xs font-bold transition hover:underline">
                Ver Transparência Pública &rarr;
              </span>
            </div>
          </div>

        </div>

        {/* Impact Block: Vidas Impactadas + Banner de Destaque */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-stretch">
          
          {/* Card Vidas Impactadas */}
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] flex flex-col justify-between space-y-16">
            <div className="w-10 h-10 bg-[#E4F2EE] text-[#0A665C] rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 fill-[#0A665C]/20" />
            </div>
            <div className="space-y-2">
              <h2 className="text-5xl font-extrabold text-[#0A3D36] tracking-tight">15k+</h2>
              <h4 className="text-sm font-bold text-gray-900">Vidas Impactadas</h4>
            </div>
          </div>

          {/* Banner de Destaque Ilustrado */}
          <div className="relative rounded-[2rem] overflow-hidden min-h-[300px] flex items-end">
            <img 
              src={reflorestaSeedling} 
              alt="Projeto Construindo Juntos" 
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7]" 
            />
            {/* Gradiente sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="relative p-10 text-white space-y-2 max-w-2xl">
              <h3 className="text-2xl font-extrabold tracking-tight">Construindo Juntos</h3>
              <p className="text-white/80 text-xs leading-relaxed font-medium">
                Unimos saberes ancestrais e tecnologia urbana para criar o maior cinturão de micro-florestas do Norte. Seu apoio é a semente do amanhã.
              </p>
            </div>
          </div>

        </div>

        {/* Investment Block: Invista no Impacto + Card Checkout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 pt-6">
          
          {/* Esquerda: Benefícios e Garantias */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold text-[#0A3D36] tracking-tight">
                Invista no Impacto
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                Sua doação não é apenas um presente, é um investimento em mudanças reais e mensuráveis. Junte-se a nós para expandir nosso alcance.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { 
                  title: 'Doação Segura', 
                  desc: 'Protocolos bancários de alta segurança protegem cada transação financeira.', 
                  icon: ShieldCheck 
                },
                { 
                  title: 'Transparência Total', 
                  desc: 'Relatórios auditados e disponíveis mensalmente em nossa plataforma.', 
                  icon: FileText 
                },
                { 
                  title: 'Impacto Direto', 
                  desc: '92% de cada Real investido vai diretamente para as frentes de reflorestamento.', 
                  icon: Target 
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-9 h-9 rounded-lg bg-[#EAE8E3]/60 flex items-center justify-center text-[#0A665C] shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                      <p className="text-xs text-gray-500 leading-normal max-w-sm">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direita: Checkout Card */}
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] space-y-6 relative">
            


            {/* Toggle de Frequência */}
            <div className="bg-[#FAF8F5] p-1 rounded-full flex border border-gray-100">
              <button 
                onClick={() => setFrequency('mensal')}
                className={`flex-1 py-3 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  frequency === 'mensal' 
                    ? 'bg-[#0A665C] text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Mensal
              </button>
              <button 
                onClick={() => setFrequency('unica')}
                className={`flex-1 py-3 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  frequency === 'unica' 
                    ? 'bg-[#0A665C] text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Única
              </button>
            </div>

            {/* Seleção de Valores */}
            <div className="grid grid-cols-3 gap-3">
              {['50', '100', '200'].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    setAmount(val);
                    setCustomAmount('');
                  }}
                  className={`py-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    amount === val 
                      ? 'border-[#0A665C] bg-[#FAF8F5] text-[#0A665C] font-extrabold shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                  }`}
                >
                  R${val}
                </button>
              ))}
            </div>

            {/* Input para Outro Valor */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Outro Valor
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-xs font-bold text-gray-500">
                  R$
                </span>
                <input
                  type="number"
                  placeholder="0,00"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount('custom');
                  }}
                  className="w-full bg-[#FAF8F5] text-gray-800 placeholder-gray-400 rounded-xl pl-10 pr-4 py-4 text-xs font-bold border-none focus:outline-none focus:ring-1 focus:ring-[#0A665C]"
                />
              </div>
            </div>

            {/* Completar Doação Button */}
            <button 
              onClick={handleCompleteDonation}
              className="w-full bg-[#0A665C] hover:bg-[#08524a] text-white py-4.5 rounded-xl font-bold text-sm tracking-wide shadow-md transition-colors cursor-pointer text-center"
            >
              Completar Doação
            </button>

            {/* Payment Method Icons below button */}
            <div className="flex items-center justify-center space-x-6 pt-2 text-gray-400">
              <CreditCard className="w-5 h-5 hover:text-gray-600 transition" />
              <QrCode className="w-5 h-5 hover:text-gray-600 transition" />
              <Wallet className="w-5 h-5 hover:text-gray-600 transition" />
            </div>

          </div>

        </div>

        <UrgencyPublicSection
          ngoId={currentOng.id ?? 1}
          title="Apoio Emergencial desta ONG"
          description="Solicitações de urgência aprovadas e publicadas, com transparência sobre a crise e o plano de uso dos recursos."
        />

        {/* Campanhas Ativas */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0A3D36] tracking-tight">Campanhas Ativas</h2>
              <p className="text-gray-500 text-sm mt-1">Iniciações em andamento — apoie uma causa específica.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: 1,
                title: 'Micro-florestas Urbanas 2026',
                desc: 'Plantação de 50.000 mudas em 8 municípios do Amazonas até dezembro de 2026.',
                meta: 120000,
                arrecadado: 87400,
                prazo: 'Dez 2026',
                status: 'Ativa',
                match: true,
                matchLabel: '1x — Patrocinádor: EcoFund'
              },
              {
                id: 2,
                title: 'Corredores Biológicos Norte',
                desc: 'Conectar áreas de preservação fragmentadas no Pará e Roraima com faixas de reflorestamento.',
                meta: 80000,
                arrecadado: 31200,
                prazo: 'Mar 2027',
                status: 'Ativa',
                match: false,
                matchLabel: null
              },
            ].map((camp) => {
              const pct = Math.round((camp.arrecadado / camp.meta) * 100);
              return (
                <div key={camp.id} className="bg-white rounded-[1.5rem] p-7 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] space-y-4 hover:shadow-[0_4px_30px_rgba(0,0,0,0.04)] transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#CBDDCD] text-[#0A3D36] text-[10px] font-bold px-2.5 py-0.5 rounded-full">{camp.status}</span>
                        {camp.match && (
                          <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>Match {camp.matchLabel}</span>
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 text-base">{camp.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{camp.desc}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-gray-700">
                      <span>R$ {camp.arrecadado.toLocaleString('pt-BR')} arrecadados</span>
                      <span>{pct}% da meta</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-teal-700 h-2 rounded-full"
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>Meta: R$ {camp.meta.toLocaleString('pt-BR')}</span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Prazo: {camp.prazo}</span>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/doacao', {
                      state: {
                        campaignId: camp.id,
                        campaignName: camp.title,
                        ngoId: currentOng.id,
                        type: 'campaign'
                      }
                    })}
                    className="w-full bg-[#0A665C] hover:bg-[#08524a] text-white py-2.5 rounded-xl font-bold text-xs transition cursor-pointer"
                  >
                    Apoiar esta Campanha
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Histórico de Campanhas */}
        <div className="space-y-6 pt-4">
          <h2 className="text-2xl font-extrabold text-[#0A3D36] tracking-tight">Histórico de Campanhas</h2>
          <div className="space-y-4">
            {[
              { title: 'Sementes do Futuro 2025', meta: 60000, arrecadado: 63500, prazo: 'Jun 2025', status: 'Encerrada' },
              { title: 'Refloresta Paraá 2024', meta: 45000, arrecadado: 45000, prazo: 'Dez 2024', status: 'Meta atingida' },
              { title: 'Hortas Comunitárias AM 2024', meta: 30000, arrecadado: 29100, prazo: 'Set 2024', status: 'Encerrada' },
            ].map((camp, idx) => {
              const pct = Math.round((camp.arrecadado / camp.meta) * 100);
              const isComplete = camp.arrecadado >= camp.meta;
              return (
                <div key={idx} className="bg-white rounded-[1.5rem] p-6 border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      {isComplete
                        ? <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                        : <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                      }
                      <p className="font-bold text-gray-900 text-sm">{camp.title}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isComplete ? 'bg-[#CBDDCD] text-[#0A3D36]' : 'bg-gray-100 text-gray-600'
                      }`}>{camp.status}</span>
                    </div>
                    <p className="text-gray-400 text-xs pl-6">
                      R$ {camp.arrecadado.toLocaleString('pt-BR')} / R$ {camp.meta.toLocaleString('pt-BR')} &middot; {camp.prazo}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 shrink-0">
                    <div className="w-24">
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${ isComplete ? 'bg-teal-500' : 'bg-gray-300' }`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-600">{pct}%</span>
                     <button
                       title="Relatórios disponíveis em breve"
                       disabled
                       className="text-gray-300 text-xs font-bold cursor-not-allowed"
                     >
                       Relatório
                     </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>
      
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
