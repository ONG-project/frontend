import React, { useState } from 'react';
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
  Heart
} from 'lucide-react';
import reflorestaSeedling from '../assets/refloresta_seedling.png';
import Footer from '../components/Footer';

export default function NgoProfilePage({ ong, onNavigate }) {
  // Configuração padrão caso nenhuma ong seja passada via props
  const currentOng = ong || {
    name: 'Instituto Rebrota',
    cnpj: '12.345.678/0001-90',
    location: 'Manaus, AM',
    description: 'Nossa missão é restaurar o equilíbrio ecológico através da biodiversidade urbana. Transformamos espaços cinzas em pulmões vivos, conectando comunidades à regeneração ativa da Floresta Amazônica em perímetros municipais.',
    score: 96
  };

  // Estados para o formulário interativo de doação
  const [frequency, setFrequency] = useState('mensal'); // 'mensal', 'unica'
  const [amount, setAmount] = useState('100'); // '50', '100', '200', 'custom'
  const [customAmount, setCustomAmount] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleCompleteDonation = (e) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
    }, 5000);
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
            <span className="bg-[#CBDDCD] text-[#0A3D36] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              <span>Parceiro Verificado</span>
            </span>

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
            
            {paymentSuccess && (
              <div className="absolute inset-0 bg-white/95 rounded-[2rem] flex flex-col items-center justify-center p-8 space-y-4 z-10 transition-all">
                <div className="w-14 h-14 bg-[#E4F2EE] text-[#0A665C] rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#0A3D36]">Doação Concluída!</h4>
                <p className="text-xs text-gray-500 text-center max-w-[240px]">
                  Muito obrigado por apoiar o {currentOng.name}. Seu impacto ambiental começará hoje mesmo.
                </p>
                <button 
                  onClick={() => setPaymentSuccess(false)}
                  className="bg-[#0A665C] text-white px-5 py-2 rounded-full font-bold text-xs"
                >
                  Fechar
                </button>
              </div>
            )}

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

      </main>
      
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
