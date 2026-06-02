import React from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Download, 
  Scale, 
  FileText, 
  FileSpreadsheet, 
  Building2,
  Calendar,
  Layers,
  ArrowUpRight,
  Heart
} from 'lucide-react';
import Footer from '../components/Footer';

export default function NgoTransparencyPage({ ong, onNavigate }) {
  // Dados mockados da ONG principal ou fallback para Instituto Terra Viva
  const currentOng = ong || {
    name: 'Instituto Terra Viva',
    cnpj: '12.345.678/0001-90',
    location: 'Av. Paulista, 1000 — SP',
    operatingSince: 'March 2008 (16 Years)',
    legalNature: 'Private Association',
    score: 96,
    budgetUtilization: 92,
    lastAudit: 'Dec 2023',
    auditStatus: 'UNQUALIFIED'
  };

  // Se a ONG foi passada de CausesPage mas não tem todos os campos da transparência, preenchemos dinamicamente
  const resolvedOng = {
    name: currentOng.name || 'Instituto Terra Viva',
    cnpj: currentOng.cnpj || '12.345.678/0001-90',
    location: currentOng.location || 'Av. Paulista, 1000 — SP',
    operatingSince: currentOng.operatingSince || (currentOng.id === 1 ? 'March 2008 (16 Years)' : currentOng.id === 2 ? 'July 2012 (12 Years)' : currentOng.id === 3 ? 'Jan 2015 (9 Years)' : 'September 2010 (14 Years)'),
    legalNature: currentOng.legalNature || 'Private Association',
    score: currentOng.score || 96,
    budgetUtilization: currentOng.budgetUtilization || (currentOng.id === 2 ? 88 : currentOng.id === 3 ? 90 : currentOng.id === 4 ? 94 : 92),
    lastAudit: currentOng.lastAudit || 'Dec 2023',
    auditStatus: currentOng.auditStatus || 'UNQUALIFIED'
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      
      {/* Botão de Voltar */}
      <div className="max-w-7xl w-full mx-auto px-8 md:px-16 pt-6">
        <button 
          onClick={() => onNavigate && onNavigate('ong-profile', currentOng)}
          className="flex items-center space-x-2 text-gray-500 hover:text-[#0A665C] transition font-bold text-xs uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Perfil</span>
        </button>
      </div>

      {/* Container Principal */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-8 md:px-16 py-10 space-y-12">
        
        {/* Bloco Superior: Título + Badge + Score Dial */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-4 max-w-3xl">
            <span className="bg-[#E4F2EE] text-[#0A665C] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5 w-fit border border-[#0A665C]/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Organização Verificada</span>
            </span>

            <h1 className="text-5xl font-extrabold text-[#0A3D36] tracking-tight leading-none">
              {resolvedOng.name}
            </h1>

            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl font-medium pt-1">
              Transparência radical não é um objetivo — é nossa base. Revise nossa situação jurídica verificada, financeiras auditadas e histórico operacional.
            </p>
          </div>

          {/* Dial Dial Score */}
          <div className="flex items-center space-x-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] shrink-0 self-stretch lg:self-auto justify-between md:justify-start">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" className="stroke-[#EBE9E3]" strokeWidth="8" fill="transparent" />
                <circle
                  cx="50" cy="50" r="40" className="stroke-[#0A665C]" strokeWidth="8" fill="transparent"
                  strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - resolvedOng.score / 100)} strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-extrabold text-[#0A3D36]">{resolvedOng.score}</span>
                <span className="text-[6px] font-bold text-gray-400 uppercase tracking-widest">Score de Confiança</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#0A665C] flex items-center space-x-1 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Excelência A+</span>
              </span>
              <p className="text-[10px] text-gray-400 max-w-[120px] font-medium leading-tight">
                Pontuação máxima em saúde financeira e transparência de relatórios.
              </p>
            </div>
          </div>
        </div>

        {/* Grid de Informações de Transparência */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          
          {/* Coluna da Esquerda (Identity, Compliance, Clean History) */}
          <div className="space-y-8">
            
            {/* CARD 1: Identity Registry */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">
                  Registro de Identidade
                </h3>
                <Building2 className="w-4 h-4 text-gray-400" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 items-center">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">CNPJ</span>
                    <span className="text-sm font-extrabold text-[#0A3D36]">{resolvedOng.cnpj}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Em operação desde</span>
                    <span className="text-sm font-extrabold text-[#0A3D36]">{resolvedOng.operatingSince}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Natureza Jurídica</span>
                    <span className="text-sm font-extrabold text-[#0A3D36]">{resolvedOng.legalNature}</span>
                  </div>
                </div>

                {/* Mapa SVG de Alta Fidelidade */}
                <div className="relative h-44 rounded-2xl overflow-hidden border border-gray-100 bg-[#EAE8E3]/35 flex flex-col justify-end">
                  {/* Fundo de malha do mapa usando SVG */}
                  <svg className="absolute inset-0 w-full h-full text-gray-300" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    {/* Linhas de ruas abstratas */}
                    <path d="M -10,30 L 300,70 M 50,-10 L 120,200 M 150,-20 L 80,200 M -20,120 L 300,100 M 10,160 L 250,140" 
                          fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="3" strokeLinecap="round" />
                    <path d="M -10,30 L 300,70 M 50,-10 L 120,200 M 150,-20 L 80,200" 
                          fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Pontos de interesse */}
                    <circle cx="95" cy="115" r="8" fill="rgba(10, 102, 92, 0.15)" />
                    <circle cx="95" cy="115" r="4" fill="#0A665C" />
                    <circle cx="150" cy="50" r="3" fill="#A0A0A0" />
                    <circle cx="50" cy="80" r="3" fill="#A0A0A0" />
                    <circle cx="220" cy="120" r="3" fill="#A0A0A0" />
                  </svg>
                  
                  {/* Caixa flutuante de Endereço */}
                  <div className="relative m-3 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-md border border-gray-100 max-w-[190px]">
                    <span className="text-[8px] font-bold text-[#0A665C] uppercase tracking-wider block">Sede</span>
                    <span className="text-[10px] font-bold text-gray-700 leading-tight block mt-0.5">{resolvedOng.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance e Clean History Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              
              {/* CARD 2: Compliance Status */}
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] flex flex-col justify-between space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">
                    Status de Conformidade
                  </h3>
                  <Scale className="w-4 h-4 text-gray-400" />
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Certidão Negativa Federal', status: 'NEGATIVA' },
                    { label: 'Certidão Negativa Estadual', status: 'NEGATIVA' },
                    { label: 'Regularidade Trabalhista (CNDT)', status: 'NEGATIVA' }
                  ].map((cert, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                      <span className="text-xs font-semibold text-gray-600">{cert.label}</span>
                      <span className="bg-[#E4F2EE] text-[#0A665C] text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#0A665C]/10 tracking-wider">
                        {cert.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD 3: Clean History Confirmation */}
              <div className="bg-[#0A3D36] text-white rounded-[2rem] p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A665C]/10 rounded-full translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500" />
                
                <div className="w-10 h-10 bg-[#0A665C]/35 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-teal-300" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-bold tracking-tight">Confirmação de Histórico Limpo</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Certificada sem pendências jurídicas ou sanções administrativas nos últimos 10 anos de operação.
                  </p>
                </div>

                <button className="w-full bg-[#0A665C] hover:bg-[#08524a] text-white py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition shadow-md border border-white/5 cursor-pointer text-center">
                  Verificar Registros Públicos
                </button>
              </div>

            </div>

          </div>

          {/* Coluna da Direita (Financial Health, Assets) */}
          <div className="space-y-8">
            
            {/* CARD 4: Financial Health */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] space-y-6">
              <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">
                Saúde Financeira
              </h3>

              {/* Barra de Progresso de Orçamento */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Utilização Orçamentária</span>
                  <span className="text-sm font-extrabold text-[#0A665C]">{resolvedOng.budgetUtilization}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#0A665C] h-full rounded-full transition-all duration-1000" style={{ width: `${resolvedOng.budgetUtilization}%` }} />
                </div>
                <p className="text-[9px] text-gray-400 italic">
                  Eficiência operacional vs. gasto programático.
                </p>
              </div>

              {/* Grid de Indicadores de Auditoria */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-gray-50">
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">Última Auditoria</span>
                  <span className="text-xs font-extrabold text-gray-700 block mt-1">{resolvedOng.lastAudit}</span>
                </div>
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-gray-50">
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">Status</span>
                  <span className="text-xs font-extrabold text-[#0A665C] block mt-1 tracking-wider">{resolvedOng.auditStatus}</span>
                </div>
              </div>
            </div>

            {/* CARD 5: Transparency Assets */}
            <div className="bg-[#F5F2EC]/40 rounded-[2rem] p-8 border border-[#E5E2D9]/40 space-y-6">
              <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">
                Documentos Públicos
              </h3>

              <div className="space-y-3">
                {[
                  { name: 'Relatório Anual 2023', size: 'PDF • 14.2 MB', ext: 'pdf' },
                  { name: 'Estatuto Social', size: 'PDF • 2.8 MB', ext: 'pdf' },
                  { name: 'Demonstrativo Financeiro (DRE)', size: 'XLSX • 1.1 MB', ext: 'xlsx' }
                ].map((asset, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.005)] flex items-center justify-between hover:border-[#0A665C]/20 transition-all group">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] flex items-center justify-center text-gray-400 group-hover:text-[#0A665C] transition-colors">
                        {asset.ext === 'pdf' ? (
                          <FileText className="w-5 h-5" />
                        ) : (
                          <FileSpreadsheet className="w-5 h-5" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-gray-800 block leading-tight">{asset.name}</span>
                        <span className="text-[9px] font-semibold text-gray-400 block">{asset.size}</span>
                      </div>
                    </div>

                    <button className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#E4F2EE] flex items-center justify-center text-gray-400 hover:text-[#0A665C] transition cursor-pointer">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Banner Inferior: The Ethical Commitment */}
        <section className="bg-[#FAF8F5] border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] rounded-[2.5rem] p-10 md:p-14 text-center max-w-5xl mx-auto space-y-4">
          <h2 className="text-2xl font-extrabold text-[#0A3D36] tracking-tight">
            Compromisso Ético
          </h2>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-3xl mx-auto">
            Nossa política de "Livro Aberto" garante que cada centavo doado para {resolvedOng.name} seja rastreável. Utilizamos auditorias independentes de terceiros para validar nossos dados de impacto, assegurando que sua contribuição gere a mudança esperada.
          </p>
        </section>

      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

    </div>
  );
}
