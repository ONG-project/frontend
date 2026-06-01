import React, { useState } from 'react';
import { 
  UploadCloud, 
  ChevronRight, 
  ChevronLeft,
  ShieldCheck,
  Search,
  PlusCircle,
  Download,
  History,
  RefreshCw,
  Calendar,
  Mail,
  FileText,
  FileDown,
  Check
} from 'lucide-react';
import verdeUrbeGarden from '../assets/verde_urbe_garden.png';
import reflorestaSeedling from '../assets/refloresta_seedling.png';
import Footer from '../components/Footer';

export default function NgoManagementPage({ onNavigate }) {
  const [activeSubTab, setActiveSubTab] = useState('visao-geral'); // 'visao-geral', 'campanhas', 'doadores', 'relatorios'
  const [campaignTab, setCampaignTab] = useState('ativas'); // 'ativas', 'encerradas', 'rascunhos', 'impacto'
  const [donorSection, setDonorSection] = useState('doadores'); // 'doadores', 'campanhas', 'relatorios', 'retencao'
  
  // Doadores tab states
  const [donorFilter, setDonorFilter] = useState('Todos'); // 'Todos', 'Mensais', 'Eventuais'
  const [searchQuery, setSearchQuery] = useState('');

  // Relatorios tab states
  const [period, setPeriod] = useState('30-days'); // '30-days', '3-months', 'custom'
  const [includeFinance, setIncludeFinance] = useState(true);
  const [includeDonors, setIncludeDonors] = useState(true);
  const [includeCampaigns, setIncludeCampaigns] = useState(false);
  const [includeCnpj, setIncludeCnpj] = useState(true);

  const donorRows = [
    { initials: 'AS', color: 'bg-[#B2E4E1] text-[#0A665C]', name: 'Alice Schmidt', email: 'alice.schmidt@email.com', value: 'R$ 450,00', frequency: 'Mensal', date: '12 Out, 2024', status: 'Ativo' },
    { initials: 'RM', color: 'bg-[#CBD9ED] text-indigo-700', name: 'Ricardo Mendes', email: 'mendes.r@provedor.net', value: 'R$ 1.200,00', frequency: 'Eventual', date: '08 Out, 2024', status: 'Ativo' },
    { initials: 'HB', color: 'bg-gray-200 text-gray-600', name: 'Helena Barbosa', email: 'helena.b@site.com', value: 'R$ 75,00', frequency: 'Mensal', date: '05 Out, 2024', status: 'Pendente' },
    { initials: 'CP', color: 'bg-[#DCEDC8] text-[#0A665C]', name: 'Clara Peroli', email: 'clara.peroli@gmail.com', value: 'R$ 300,00', frequency: 'Mensal', date: '28 Set, 2024', status: 'Ativo' }
  ];

  const filteredDonors = donorRows.filter((donor) => {
    const matchesFilter = donorFilter === 'Todos' || donor.frequency === donorFilter;
    const query = searchQuery.toLowerCase();
    const matchesQuery = donor.name.toLowerCase().includes(query) || donor.email.toLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      
      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-8 py-10 space-y-8">
        
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#FAF8F5] pb-2 border-b border-[#E5E2D9]/60">
          <div className="space-y-3 max-w-3xl">
            {/* Gestao Badge & CNPJ */}
            <div className="flex items-center space-x-3.5">
              <span className="bg-[#CBDDCD] text-[#0A3D36] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                <span>Painel de Gestão</span>
              </span>
              <span className="text-xs font-semibold text-gray-500">
                CNPJ: 12.345.678/0001-90
              </span>
            </div>

            {/* NGO Title */}
            <h1 className="text-4xl font-extrabold text-[#0A3D36] tracking-tight">
              Instituto Rebrota
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
              Bem-vindo de volta. Aqui você pode gerenciar suas campanhas, monitorar doações e exportar relatórios de impacto.
            </p>
          </div>

          {/* Brand/Logo Card right side */}
          <div className="mt-6 md:mt-0 w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center p-3">
            <div className="w-full h-full bg-[#EAE8E3] rounded-lg flex flex-col items-center justify-center text-gray-400 font-bold text-xs uppercase tracking-tighter">
              <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center font-bold text-[10px]">
                IR
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex space-x-6 border-b border-[#E5E2D9]/40 pb-1">
          {[
            { id: 'visao-geral', label: 'Visão Geral & Transparência' },
            { id: 'campanhas', label: 'Minhas Campanhas' },
            { id: 'doadores', label: 'Doadores' },
            { id: 'relatorios', label: 'Relatórios' }
          ].map((subTab) => {
            const isActive = activeSubTab === subTab.id;
            return (
              <button
                key={subTab.id}
                onClick={() => setActiveSubTab(subTab.id)}
                className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                  isActive 
                    ? 'text-[#0A665C] border-b-2 border-[#0A665C]' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {subTab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Subsection Views */}
        
        {/* VIEW 1: Visão Geral & Transparência */}
        {activeSubTab === 'visao-geral' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-8">
            {/* Left Card - Transparência Pública */}
            <div className="bg-[#F5F2EC] rounded-[2rem] p-8 border border-[#E5E2D9] flex flex-col justify-between items-center text-center space-y-8">
              <div className="w-full">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest text-left mb-6">
                  Transparência Pública
                </h3>
                
                {/* Circular Dial Gauge */}
                <div className="relative w-44 h-44 flex items-center justify-center mx-auto my-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" className="stroke-[#E0DBD3]" strokeWidth="8.5" fill="transparent" />
                    <circle
                      cx="50" cy="50" r="40" className="stroke-[#0A665C]" strokeWidth="8.5" fill="transparent"
                      strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - 9.8 / 10)} strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-extrabold text-[#0A3D36]">9.8</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Pontuação</span>
                  </div>
                </div>
              </div>

              {/* Bottom details & Button */}
              <div className="w-full space-y-4">
                <p className="text-xs font-medium text-gray-500">
                  Última auditoria externa: <span className="font-bold text-gray-700">Maio 2026</span>
                </p>
                
                <button className="w-full bg-white hover:bg-gray-50 text-[#0A665C] font-bold py-3.5 px-6 rounded-2xl border border-[#EBE9E3] shadow-sm flex items-center justify-center space-x-2 text-sm transition-colors cursor-pointer">
                  <UploadCloud className="w-4 h-4" />
                  <span>Enviar Nova Auditoria</span>
                </button>
              </div>
            </div>

            {/* Right Card - Campaign Progress card */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
              <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                <img src={verdeUrbeGarden} alt="Projeto Verde Urbe Garden" className="w-full h-full object-cover" />
                <span className="absolute top-6 left-6 bg-[#0A3D36] text-white text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  Ativa no Portal
                </span>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold text-[#0A3D36]">Projeto Verde Urbe</h2>
                  <p className="text-gray-500 text-sm font-medium">Campanha principal atingindo 90% da meta.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-full bg-[#FAF8F5] rounded-full h-3 overflow-hidden border border-gray-100">
                    <div className="bg-[#0A665C] h-full rounded-full" style={{ width: '90%' }} />
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-gray-700">R$ 45.000 de R$ 50.000</span>
                    <button className="text-[#0A665C] hover:underline flex items-center space-x-1 cursor-pointer">
                      <span>Editar Campanha</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Minhas Campanhas */}
        {activeSubTab === 'campanhas' && (
          <div className="space-y-10">
            {/* Header section inside subtab */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-[#0A3D36]">Minhas Campanhas</h2>
                <p className="text-gray-500 text-xs mt-1.5">
                  Gerencie o impacto do Instituto Rebrota. Acompanhe a arrecadação em tempo real e crie novas iniciativas para transformar o cenário ambiental urbano.
                </p>
              </div>
              <button className="bg-[#0A665C] hover:bg-[#08524a] text-white font-bold px-6 py-3 rounded-full flex items-center space-x-2 text-sm shadow-md transition-colors cursor-pointer shrink-0">
                <PlusCircle className="w-4.5 h-4.5" />
                <span>Criar Nova Campanha</span>
              </button>
            </div>

            {/* Campaign sub-sub-tabs */}
            <div className="flex space-x-6 border-b border-gray-100 pb-1">
              {[
                { id: 'ativas', label: 'Campanhas Ativas' },
                { id: 'encerradas', label: 'Campanhas Encerradas' },
                { id: 'rascunhos', label: 'Rascunhos' },
                { id: 'impacto', label: 'Relatórios de Impacto' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCampaignTab(tab.id)}
                  className={`pb-3 text-xs font-bold uppercase tracking-wider ${
                    campaignTab === tab.id ? 'text-[#0A665C] border-b-2 border-[#0A665C]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Campaigns Grid */}
            {campaignTab === 'ativas' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Campaign 1: Projeto Verde Urbe */}
              <div className="bg-white rounded-[2rem] border border-gray-150 shadow-sm overflow-hidden flex flex-col md:flex-row">
                <div className="relative w-full md:w-44 h-48 md:h-full shrink-0">
                  <img src={verdeUrbeGarden} alt="Verde Urbe" className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-[#0A3D36]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    EM PROGRESSO
                  </span>
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900">Projeto Verde Urbe</h3>
                    <p className="text-gray-500 text-[11px] leading-relaxed max-w-[240px]">
                      Implantação de hortas comunitárias em coberturas de prédios públicos para...
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-end text-xs">
                      <span className="text-[#0A665C] font-extrabold text-sm">90%</span>
                      <span className="text-gray-400 font-semibold uppercase text-[9px]">META: R$ 50.000</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-[#0A665C] h-full rounded-full" style={{ width: '90%' }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
                      <span>R$ 45.000 arrecadados</span>
                      <span className="text-red-500">12 dias restantes</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-1">
                    <button className="flex-grow bg-[#EAE8E3] hover:bg-gray-200 text-gray-800 font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer">
                      Editar Campanha
                    </button>
                    <button className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold px-3 py-2 rounded-lg text-xs cursor-pointer">
                      •••
                    </button>
                  </div>
                </div>
              </div>

              {/* Campaign 2: Refloresta SP */}
              <div className="bg-white rounded-[2rem] border border-gray-150 shadow-sm overflow-hidden flex flex-col md:flex-row">
                <div className="relative w-full md:w-44 h-48 md:h-full shrink-0">
                  <img src={reflorestaSeedling} alt="Refloresta SP" className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-[#0A3D36]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    EM PROGRESSO
                  </span>
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900">Refloresta SP: Mata Atlântica</h3>
                    <p className="text-gray-500 text-[11px] leading-relaxed max-w-[240px]">
                      Plantio de 5.000 mudas nativas em áreas de preservação permanente no cinturão...
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-end text-xs">
                      <span className="text-[#0A665C] font-extrabold text-sm">42%</span>
                      <span className="text-gray-400 font-semibold uppercase text-[9px]">META: R$ 120.000</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-[#0A665C] h-full rounded-full" style={{ width: '42%' }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
                      <span>R$ 50.400 arrecadados</span>
                      <span className="text-gray-500">45 dias restantes</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-1">
                    <button className="flex-grow bg-[#EAE8E3] hover:bg-gray-200 text-gray-800 font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer">
                      Editar Campanha
                    </button>
                    <button className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold px-3 py-2 rounded-lg text-xs cursor-pointer">
                      •••
                    </button>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Campaign Encerradas section */}
            {campaignTab === 'encerradas' && (
            <div className="space-y-6 pt-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <h3 className="text-xl font-extrabold text-[#0A3D36]">Campanhas Encerradas</h3>
                <a href="#" className="text-xs font-bold text-[#0A665C] hover:underline">Ver Histórico Completo →</a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.2fr_1fr] gap-6">
                {/* Past Campaign 1 */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-48">
                  <div className="flex justify-between items-start">
                    <span className="bg-[#DDF3E8] text-[#0A665C] text-[9px] font-bold px-2 py-0.5 rounded flex items-center uppercase tracking-wider">
                      ✓ Ciclo Água Viva
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold">JUNHO 2023</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[#0A665C] font-extrabold text-lg">R$ 82.400</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">103% da meta alcançada</div>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Instalação de 15 sistemas de captação de água da chuva em escolas municipais da periferia de Osasco.
                  </p>
                  <div className="text-[10px] font-bold text-[#0A665C] uppercase tracking-wide bg-[#EAF5F2] py-1 px-2.5 rounded-lg w-fit">
                    Impacto: 4.500 alunos beneficiados.
                  </div>
                </div>

                {/* Past Campaign 2 */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-48">
                  <div className="flex justify-between items-start">
                    <span className="bg-[#DDF3E8] text-[#0A665C] text-[9px] font-bold px-2 py-0.5 rounded flex items-center uppercase tracking-wider">
                      ✓ Energia do Bem
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold">MARÇO 2023</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[#0A665C] font-extrabold text-lg">R$ 145.000</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">100% da meta alcançada</div>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Painéis fotovoltaicos para a sede administrativa da ONG e centros de reciclagem parceiros.
                  </p>
                  <div className="text-[10px] font-bold text-[#0A665C] uppercase tracking-wide bg-[#EAF5F2] py-1 px-2.5 rounded-lg w-fit">
                    Impacto: Redução de 70% nos custos fixos.
                  </div>
                </div>

                {/* Summary card */}
                <div className="bg-[#0A665C] text-white p-6 rounded-2xl flex flex-col justify-between h-48 shadow-md">
                  <div className="text-[10px] font-bold text-teal-100 uppercase tracking-widest">
                    Resumo de 2023
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[9px] font-bold text-teal-200 uppercase tracking-wider">Total Arrecadado</div>
                      <div className="text-2xl font-extrabold">R$ 542.800</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-teal-200 uppercase tracking-wider">Campanhas Concluídas</div>
                      <div className="text-base font-extrabold">12 Projetos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}

            {campaignTab === 'rascunhos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                  <span className="bg-[#F5F2EC] text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Rascunho</span>
                  <h3 className="text-lg font-bold text-gray-900">Hortas Escolares 2026</h3>
                  <p className="text-xs text-gray-500">Última edição: hoje, 10:14. Meta preliminar de R$ 35.000 e plano de execução em revisão.</p>
                  <div className="flex gap-2 pt-2">
                    <button className="bg-[#0A665C] text-white text-xs font-bold px-4 py-2 rounded-lg">Continuar edição</button>
                    <button className="bg-[#EAE8E3] text-gray-700 text-xs font-bold px-4 py-2 rounded-lg">Duplicar</button>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                  <span className="bg-[#F5F2EC] text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Rascunho</span>
                  <h3 className="text-lg font-bold text-gray-900">Mutirão Água Limpa</h3>
                  <p className="text-xs text-gray-500">Última edição: ontem, 17:38. Escopo inicial definido e aguardando anexos obrigatórios.</p>
                  <div className="flex gap-2 pt-2">
                    <button className="bg-[#0A665C] text-white text-xs font-bold px-4 py-2 rounded-lg">Continuar edição</button>
                    <button className="bg-[#EAE8E3] text-gray-700 text-xs font-bold px-4 py-2 rounded-lg">Excluir rascunho</button>
                  </div>
                </div>
              </div>
            )}

            {campaignTab === 'impacto' && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-[#0A3D36]">Relatórios de Impacto</h3>
                  <p className="text-xs text-gray-500 mt-1">Acompanhe os relatórios publicados por campanha com métricas e evidências.</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { campaign: 'Projeto Verde Urbe', period: 'Maio 2026', metric: '1.240 famílias beneficiadas' },
                    { campaign: 'Refloresta SP', period: 'Abril 2026', metric: '3.100 mudas plantadas' }
                  ].map((item) => (
                    <div key={item.campaign} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.campaign}</p>
                        <p className="text-xs text-gray-500">Período: {item.period}</p>
                      </div>
                      <div className="text-xs font-semibold text-[#0A665C]">{item.metric}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: Doadores */}
        {activeSubTab === 'doadores' && (
          <div className="space-y-8">
            
            {/* Upper title & info bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-[#0A3D36]">Base de Doadores</h2>
                <div className="flex items-center space-x-3.5 mt-1">
                  <span className="bg-[#CBDDCD] text-[#0A3D36] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    CNPJ: Ativo
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">
                    Última atualização: Hoje, 09:42
                  </span>
                </div>
              </div>

              {/* Search input & buttons */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Buscar por nome ou e-mail..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#EAE8E3]/60 text-gray-800 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#0A665C]"
                  />
                </div>
                
                <div className="bg-[#EAE8E3]/60 p-0.5 rounded-lg flex space-x-1">
                  {['Todos', 'Mensais', 'Eventuais'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setDonorFilter(filter)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                        donorFilter === filter 
                          ? 'bg-[#0A665C] text-white shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Inner sub-tabs list */}
            <div className="flex space-x-6 border-b border-gray-100 pb-1">
              {[
                { id: 'doadores', label: 'Doadores' },
                { id: 'campanhas', label: 'Campanhas' },
                { id: 'relatorios', label: 'Relatórios' },
                { id: 'retencao', label: 'Retenção' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDonorSection(tab.id)}
                  className={`pb-3 text-xs font-bold uppercase tracking-wider ${
                    donorSection === tab.id ? 'text-[#0A665C] border-b-2 border-[#0A665C]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {donorSection === 'doadores' && (
            <>
            {/* Donors Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-bold text-[10px] uppercase tracking-wider bg-gray-50/50">
                      <th className="py-4 px-6">Doador</th>
                      <th className="py-4 px-6 text-right">Último Valor</th>
                      <th className="py-4 px-6">Frequência</th>
                      <th className="py-4 px-6">Última Data</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150 text-xs font-medium text-gray-700">
                    {filteredDonors.map((donor) => (
                      <tr key={donor.email}>
                        <td className="py-4 px-6 flex items-center space-x-3.5">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${donor.color}`}>
                            {donor.initials}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{donor.name}</div>
                            <div className="text-gray-400 text-[10px]">{donor.email}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-[#0A665C] text-sm">{donor.value}</td>
                        <td className="py-4 px-6">
                          <span className="flex items-center space-x-1.5 text-gray-500 font-semibold text-[11px]">
                            {donor.frequency === 'Mensal' ? <RefreshCw className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                            <span>{donor.frequency === 'Eventual' ? 'Única' : donor.frequency}</span>
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-500 font-semibold">{donor.date}</td>
                        <td className="py-4 px-6">
                          <span className={`font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wide ${donor.status === 'Ativo' ? 'bg-[#CBDDCD]/60 text-[#0A3D36]' : 'bg-gray-100 text-gray-500'}`}>
                            ● {donor.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button className="bg-[#0A665C] hover:bg-[#08524a] text-white font-bold px-4 py-2 rounded-lg flex items-center space-x-2 text-[10px] tracking-wide shadow-sm transition-colors mx-auto cursor-pointer">
                            <Mail className="w-3 h-3" />
                            <span>Enviar Mensagem</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table pagination */}
              <div className="flex items-center justify-between border-t border-gray-150 px-6 py-4 text-xs font-semibold text-gray-500">
                <span>Mostrando {filteredDonors.length} de 1.240 doadores ativos</span>
                <div className="flex items-center space-x-1">
                  <button className="p-1.5 rounded-md hover:bg-gray-100 transition"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="w-7 h-7 bg-[#0A665C] text-white rounded-md flex items-center justify-center font-bold">1</button>
                  <button className="w-7 h-7 rounded-md hover:bg-gray-100 flex items-center justify-center">2</button>
                  <button className="w-7 h-7 rounded-md hover:bg-gray-100 flex items-center justify-center">3</button>
                  <button className="p-1.5 rounded-md hover:bg-gray-100 transition"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* Bottom summary blocks */}
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8">
              {/* Engagement Alerts */}
              <div className="bg-[#FAF8F5] border border-gray-100 p-8 rounded-2xl shadow-[0_1px_5px_rgba(0,0,0,0.01)] flex flex-col justify-between space-y-6">
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-[#0A3D36] text-lg">Engajamento de Impacto</h4>
                  <p className="text-gray-500 text-xs leading-relaxed max-w-md">
                    Você possui 12 doadores com pagamentos pendentes este mês. Inicie uma conversa empática para entender como podemos ajudá-los.
                  </p>
                </div>
                <div className="flex space-x-3.5 pt-2">
                  <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2.5 px-6 rounded-lg text-xs tracking-wide transition-colors cursor-pointer shadow-sm">
                    Ver Pendências
                  </button>
                  <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold py-2.5 px-6 rounded-lg text-xs tracking-wide transition-colors cursor-pointer">
                    Baixar Relatório Mensal
                  </button>
                </div>
              </div>

              {/* Fundraising Target block */}
              <div className="bg-[#E4F2EE] border border-[#CBDDCD] p-8 rounded-2xl shadow-[0_1px_5px_rgba(0,0,0,0.01)] flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-[#0A3D36] text-xs uppercase tracking-widest">Meta de Arrecadação</h4>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-extrabold text-[#0A3D36]">R$ 84.200</span>
                    <span className="text-[#0A665C] font-bold text-xs">78% da meta</span>
                  </div>
                </div>
                
                <div className="w-full bg-[#FAF8F5] rounded-full h-2.5 overflow-hidden border border-[#CBDDCD]/60">
                  <div className="bg-[#0A665C] h-full rounded-full" style={{ width: '78%' }} />
                </div>

                <p className="text-[11px] text-gray-600 leading-normal">
                  Faltam apenas <span className="font-bold text-gray-800">R$ 15.800</span> para batermos o objetivo mensal de reflorestamento.
                </p>
              </div>
            </div>
            </>
            )}

            {donorSection === 'campanhas' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Projeto Verde Urbe', value: 'R$ 45.000', donors: '188 doadores' },
                  { title: 'Refloresta SP', value: 'R$ 50.400', donors: '121 doadores' },
                  { title: 'Ciclo Água Viva', value: 'R$ 82.400', donors: '267 doadores' }
                ].map((item) => (
                  <div key={item.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-2">
                    <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                    <p className="text-2xl font-extrabold text-[#0A665C]">{item.value}</p>
                    <p className="text-xs text-gray-500">{item.donors}</p>
                  </div>
                ))}
              </div>
            )}

            {donorSection === 'relatorios' && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-4">Relatórios da Base de Doadores</h4>
                <div className="space-y-3">
                  {['Relatório Mensal de Retenção', 'Ticket Médio por Campanha', 'Doadores Inativos 90+ dias'].map((report) => (
                    <div key={report} className="flex items-center justify-between bg-[#FAF8F5] border border-gray-100 rounded-xl px-4 py-3">
                      <span className="text-xs font-semibold text-gray-700">{report}</span>
                      <button className="text-xs font-bold text-[#0A665C]">Baixar</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {donorSection === 'retencao' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <p className="text-xs text-gray-500">Retenção 30 dias</p>
                  <p className="text-3xl font-extrabold text-[#0A665C] mt-2">82%</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <p className="text-xs text-gray-500">Retenção 90 dias</p>
                  <p className="text-3xl font-extrabold text-[#0A665C] mt-2">67%</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <p className="text-xs text-gray-500">Risco de churn</p>
                  <p className="text-3xl font-extrabold text-[#A14E3B] mt-2">14%</p>
                </div>
              </div>
            )}

          </div>
        )}

        {/* VIEW 4: Relatórios */}
        {activeSubTab === 'relatorios' && (
          <div className="space-y-8">
            
            {/* Header info panel */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-5 gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Instituto Rebrota</h3>
                <div className="flex items-center space-x-3.5 mt-1">
                  <span className="bg-[#CBDDCD] text-[#0A3D36] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    CNPJ Ativo
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">12.345.678/0001-90</span>
                </div>
              </div>
            </div>

            {/* Layout Panels Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8">
              
              {/* Left Panel - Export configuration */}
              <div className="bg-[#FAF8F5] border border-gray-150 rounded-[2rem] p-8 shadow-[0_1px_8px_rgba(0,0,0,0.01)] space-y-6">
                <div>
                  <h4 className="text-base font-bold text-gray-900">Configurar Exportação de PDF</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Personalize os dados que serão compilados no seu relatório editorial.
                  </p>
                </div>

                {/* Period selector */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Seletor de Período
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPeriod('30-days')}
                      className={`flex items-center space-x-3 p-4 rounded-xl border text-xs font-bold transition-all cursor-pointer bg-white ${
                        period === '30-days' ? 'border-[#0A665C] shadow-sm' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                        period === '30-days' ? 'border-[#0A665C]' : 'border-gray-300'
                      }`}>
                        {period === '30-days' && <div className="w-2.5 h-2.5 rounded-full bg-[#0A665C]" />}
                      </div>
                      <span className="text-gray-800">Últimos 30 dias</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPeriod('3-months')}
                      className={`flex items-center space-x-3 p-4 rounded-xl border text-xs font-bold transition-all cursor-pointer bg-white ${
                        period === '3-months' ? 'border-[#0A665C] shadow-sm' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                        period === '3-months' ? 'border-[#0A665C]' : 'border-gray-300'
                      }`}>
                        {period === '3-months' && <div className="w-2.5 h-2.5 rounded-full bg-[#0A665C]" />}
                      </div>
                      <span className="text-gray-800">Últimos 3 meses</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPeriod('custom')}
                      className={`flex items-center space-x-3 p-4 rounded-xl border text-xs font-bold transition-all cursor-pointer bg-white ${
                        period === 'custom' ? 'border-[#0A665C] shadow-sm' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                        period === 'custom' ? 'border-[#0A665C]' : 'border-gray-300'
                      }`}>
                        {period === 'custom' && <div className="w-2.5 h-2.5 rounded-full bg-[#0A665C]" />}
                      </div>
                      <span className="text-gray-800">Personalizado</span>
                    </button>
                  </div>
                </div>

                {/* Checklist options */}
                <div className="space-y-3 pt-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Dados a serem incluídos
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Option 1 */}
                    <button
                      type="button"
                      onClick={() => setIncludeFinance(!includeFinance)}
                      className={`flex items-start text-left p-4 bg-white border rounded-xl transition-all cursor-pointer ${
                        includeFinance ? 'border-[#0A665C]' : 'border-gray-150 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center mr-3 mt-0.5 shrink-0 ${
                        includeFinance ? 'bg-[#0A665C] border-[#0A665C] text-white' : 'border-gray-300'
                      }`}>
                        {includeFinance && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-900">Resumo Financeiro</h5>
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">Entradas, saídas e balanço geral</p>
                      </div>
                    </button>

                    {/* Option 2 */}
                    <button
                      type="button"
                      onClick={() => setIncludeDonors(!includeDonors)}
                      className={`flex items-start text-left p-4 bg-white border rounded-xl transition-all cursor-pointer ${
                        includeDonors ? 'border-[#0A665C]' : 'border-gray-150 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center mr-3 mt-0.5 shrink-0 ${
                        includeDonors ? 'bg-[#0A665C] border-[#0A665C] text-white' : 'border-gray-300'
                      }`}>
                        {includeDonors && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-900">Lista de Doadores</h5>
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">Nomes, datas e valores totais</p>
                      </div>
                    </button>

                    {/* Option 3 */}
                    <button
                      type="button"
                      onClick={() => setIncludeCampaigns(!includeCampaigns)}
                      className={`flex items-start text-left p-4 bg-white border rounded-xl transition-all cursor-pointer ${
                        includeCampaigns ? 'border-[#0A665C]' : 'border-gray-150 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center mr-3 mt-0.5 shrink-0 ${
                        includeCampaigns ? 'bg-[#0A665C] border-[#0A665C] text-white' : 'border-gray-300'
                      }`}>
                        {includeCampaigns && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-900">Impacto de Campanhas</h5>
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">Métricas de alcance e conversão</p>
                      </div>
                    </button>

                    {/* Option 4 */}
                    <button
                      type="button"
                      onClick={() => setIncludeCnpj(!includeCnpj)}
                      className={`flex items-start text-left p-4 bg-white border rounded-xl transition-all cursor-pointer ${
                        includeCnpj ? 'border-[#0A665C]' : 'border-gray-150 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center mr-3 mt-0.5 shrink-0 ${
                        includeCnpj ? 'bg-[#0A665C] border-[#0A665C] text-white' : 'border-gray-300'
                      }`}>
                        {includeCnpj && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-900">Auditoria de CNPJ</h5>
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">Status jurídico e certidões</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* PDF export button */}
                <div className="pt-4">
                  <button className="w-full bg-[#0A665C] hover:bg-[#08524a] text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2.5 text-sm shadow-md transition-colors cursor-pointer">
                    <FileDown className="w-5 h-5" />
                    <span>Exportar Relatório PDF</span>
                  </button>
                </div>
              </div>

              {/* Right Panel - History & Score info */}
              <div className="space-y-8">
                {/* File History panel */}
                <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm flex flex-col justify-between space-y-6">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-sm font-bold text-gray-900">Histórico</h4>
                      <History className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="space-y-4">
                      {[
                        { title: 'Relatório Anual 2023', date: 'GERADO EM 12 JAN, 2024' },
                        { title: 'Impacto Q4 - Social', date: 'GERADO EM 05 DEZ, 2023' },
                        { title: 'Auditoria Fiscal Outubro', date: 'GERADO EM 02 NOV, 2023' },
                        { title: 'Resumo de Doadores Mensal', date: 'GERADO EM 30 OUT, 2023' }
                      ].map((doc, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-[#FAF8F5] rounded-xl border border-gray-50">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 bg-[#DDF3E8] text-[#0A665C] rounded-lg flex items-center justify-center shrink-0">
                              <FileText className="w-4.5 h-4.5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-gray-800">{doc.title}</div>
                              <div className="text-[9px] font-bold text-gray-400 mt-0.5 tracking-wider">{doc.date}</div>
                            </div>
                          </div>
                          <button className="p-2 text-[#0A665C] hover:bg-[#EAE8E3] rounded-lg transition-colors cursor-pointer">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a href="#" className="text-xs font-bold text-[#0A665C] hover:underline text-center block pt-2">
                    Ver todos os arquivos
                  </a>
                </div>

                {/* Score badge card */}
                <div className="bg-[#FAF8F5] border border-gray-150 p-6 rounded-2xl flex items-center space-x-6">
                  {/* Small progress score dial */}
                  <div className="relative w-18 h-18 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" className="stroke-[#EAE8E3]" strokeWidth="10" fill="transparent" />
                      <circle
                        cx="50" cy="50" r="40" className="stroke-[#0A665C]" strokeWidth="10" fill="transparent"
                        strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - 9.0 / 10)} strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-base font-extrabold text-[#0A3D36]">9.0</span>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Impacto & Transparência</h5>
                    <h6 className="text-xs font-bold text-gray-900 mt-0.5">Score Rebrota</h6>
                    <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                      Sua ONG cumpre 90% dos critérios de governança editorial e fiscal.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      <Footer onNavigate={onNavigate} />

    </div>
  );
}
