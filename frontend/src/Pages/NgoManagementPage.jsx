import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ngoService } from '../services/ngoService';
import UrgencyRequestsDashboard from '../components/urgency/UrgencyRequestsDashboard';
import UrgencyRequestWizard from '../components/urgency/UrgencyRequestWizard';
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
  Check,
  Heart,
  Percent,
  Info,
  Archive,
  Eye,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Copy
} from 'lucide-react';
import verdeUrbeGarden from '../assets/verde_urbe_garden.png';
import reflorestaSeedling from '../assets/refloresta_seedling.png';
import loginBgPlant from '../assets/login_bg_plant.png';
import genericImage from '../assets/imagem_generica.jpg';
import Footer from '../components/Footer';

export default function NgoManagementPage({ onNavigate }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const ngoId = user?.ngoId ?? 1;
  const ngoName = user?.ngoName ?? 'Instituto Rebrota';
  const [ngoScore, setNgoScore] = useState(0);

  useEffect(() => {
    ngoService.list()
      .then((list) => {
        const match = list.find((item) => item.name === ngoName) || list[0];
        if (match) setNgoScore(match.score);
      })
      .catch(() => {});
  }, [ngoName]);

  const tabFromUrl = searchParams.get('tab');
  const [activeSubTab, setActiveSubTab] = useState(tabFromUrl || 'visao-geral');
  const [urgencyView, setUrgencyView] = useState('list');
  const [urgencyRequestId, setUrgencyRequestId] = useState(null);

  useEffect(() => {
    if (tabFromUrl) setActiveSubTab(tabFromUrl);
  }, [tabFromUrl]);

  useEffect(() => {
    if (tabFromUrl === 'urgencia' && searchParams.get('action') === 'nova') {
      setUrgencyView('form');
      setUrgencyRequestId(null);
    }
  }, [tabFromUrl, searchParams]);

  const handleTabChange = (tabId) => {
    setActiveSubTab(tabId);
    setSearchParams(tabId === 'visao-geral' ? {} : { tab: tabId });
    setIsCreatingCampaign(false);
    if (tabId !== 'urgencia') {
      setUrgencyView('list');
      setUrgencyRequestId(null);
    }
  };
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

  // States for campaign management
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [menuOpenCampaignId, setMenuOpenCampaignId] = useState(null);

  // Form states for campaign
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCause, setFormCause] = useState('meio-ambiente');
  const [formTarget, setFormTarget] = useState('');
  const [formDays, setFormDays] = useState('30');
  const [formRequirements, setFormRequirements] = useState('');
  const [formDestination, setFormDestination] = useState('');
  // Matchfunding form states
  const [hasMatch, setHasMatch] = useState(false);
  const [formMatchMultiplier, setFormMatchMultiplier] = useState('2');
  const [formMatchSponsor, setFormMatchSponsor] = useState('');
  const [formMatchCap, setFormMatchCap] = useState('');
  const [formMatchPeriod, setFormMatchPeriod] = useState('');

  // Campaigns state
  const [myCampaigns, setMyCampaigns] = useState([
    {
      id: 'c1',
      name: 'Projeto Verde Urbe',
      description: 'Implantação de hortas comunitárias em coberturas de prédios públicos para segurança alimentar no centro urbano.',
      targetAmount: 50000,
      raisedAmount: 45000,
      status: 'publicada', // 'rascunho' | 'em-revisao' | 'aprovada' | 'publicada' | 'recusada' | 'encerrada' | 'arquivada'
      cause: 'meio-ambiente',
      causeLabel: 'Meio ambiente',
      daysLeft: 12,
      cover: verdeUrbeGarden,
      matchMultiplier: 1,
      matchSponsor: null,
      matchCap: null,
      matchPeriod: null,
      requirements: 'Autorização estrutural de prédios públicos selecionados.',
      destination: 'Hortas comunitárias municipais.'
    },
    {
      id: 'c2',
      name: 'Refloresta SP: Mata Atlântica',
      description: 'Plantio planejado de 5.000 mudas de espécies nativas em áreas de preservação permanente no cinturão verde.',
      targetAmount: 120000,
      raisedAmount: 50400,
      status: 'publicada',
      cause: 'meio-ambiente',
      causeLabel: 'Meio ambiente',
      daysLeft: 45,
      cover: reflorestaSeedling,
      matchMultiplier: 2,
      matchSponsor: 'EcoFund Brasil',
      matchCap: 50000,
      matchPeriod: 'Jun-Ago 2026',
      requirements: 'Laudo de solo e fornecedores de mudas cadastrados.',
      destination: 'Reflorestamento de encostas.'
    },
    {
      id: 'c3',
      name: 'Hortas Escolares 2026',
      description: 'Criação de hortas comunitárias de aprendizado prático em escolas públicas da periferia.',
      targetAmount: 35000,
      raisedAmount: 0,
      status: 'rascunho',
      cause: 'educacao',
      causeLabel: 'Educação',
      daysLeft: 60,
      cover: loginBgPlant,
      matchMultiplier: 1,
      matchSponsor: null,
      matchCap: null,
      matchPeriod: null,
      requirements: 'Contrato de adesão das escolas parceiras.',
      destination: 'Fornecimento de insumos e monitoramento.'
    },
    {
      id: 'c4',
      name: 'Mutirão Água Limpa',
      description: 'Mutirão voluntário para remoção de detritos e revegetação de matas ciliares no córrego local.',
      targetAmount: 25000,
      raisedAmount: 0,
      status: 'em-revisao',
      cause: 'saude',
      causeLabel: 'Saúde',
      daysLeft: 30,
      cover: genericImage,
      matchMultiplier: 1,
      matchSponsor: null,
      matchCap: null,
      matchPeriod: null,
      requirements: 'Aprovação da Secretaria Municipal do Verde e Meio Ambiente.',
      destination: 'Materiais de proteção e ferramentas.'
    }
  ]);

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

  // Action handlers
  const handleOpenCreate = () => {
    setEditingCampaign(null);
    setFormName('');
    setFormDescription('');
    setFormCause('meio-ambiente');
    setFormTarget('');
    setFormDays('30');
    setFormRequirements('');
    setFormDestination('');
    setHasMatch(false);
    setFormMatchMultiplier('2');
    setFormMatchSponsor('');
    setFormMatchCap('');
    setFormMatchPeriod('');
    setIsCreatingCampaign(true);
  };

  const handleOpenEdit = (campaign) => {
    setEditingCampaign(campaign);
    setFormName(campaign.name);
    setFormDescription(campaign.description);
    setFormCause(campaign.cause);
    setFormTarget(campaign.targetAmount.toString());
    setFormDays(campaign.daysLeft.toString());
    setFormRequirements(campaign.requirements || '');
    setFormDestination(campaign.destination || '');
    setHasMatch(campaign.matchMultiplier > 1);
    setFormMatchMultiplier((campaign.matchMultiplier || 2).toString());
    setFormMatchSponsor(campaign.matchSponsor || '');
    setFormMatchCap(campaign.matchCap ? campaign.matchCap.toString() : '');
    setFormMatchPeriod(campaign.matchPeriod || '');
    setIsCreatingCampaign(true);
    setMenuOpenCampaignId(null);
  };

  const handleSaveCampaign = (status = 'rascunho') => {
    if (!formName.trim() || !formTarget.trim()) {
      alert('Por favor, preencha o Nome e a Meta de Arrecadação.');
      return;
    }

    const causeLabels = {
      'meio-ambiente': 'Meio ambiente',
      'educacao': 'Educação',
      'saude': 'Saúde',
      'direitos-humanos': 'Direitos humanos'
    };

    const newCampaign = {
      id: editingCampaign ? editingCampaign.id : 'c_' + Date.now(),
      name: formName,
      description: formDescription,
      cause: formCause,
      causeLabel: causeLabels[formCause] || 'Outros',
      targetAmount: parseFloat(formTarget) || 10000,
      raisedAmount: editingCampaign ? editingCampaign.raisedAmount : 0,
      status: status,
      daysLeft: parseInt(formDays) || 30,
      cover: editingCampaign ? editingCampaign.cover : genericImage,
      matchMultiplier: editingCampaign ? editingCampaign.matchMultiplier : 1,
      matchSponsor: editingCampaign ? editingCampaign.matchSponsor : null,
      matchCap: editingCampaign ? editingCampaign.matchCap : null,
      matchPeriod: editingCampaign ? editingCampaign.matchPeriod : null,
      requirements: formRequirements,
      destination: formDestination
    };

    if (editingCampaign) {
      setMyCampaigns(prev => prev.map(c => c.id === editingCampaign.id ? newCampaign : c));
      alert(`Campanha "${formName}" atualizada no estado: ${status === 'em-revisao' ? 'Enviada para Revisão' : 'Rascunho salvo'}`);
    } else {
      setMyCampaigns(prev => [...prev, newCampaign]);
      alert(`Campanha "${formName}" criada no estado: ${status === 'em-revisao' ? 'Enviada para Revisão' : 'Rascunho salvo'}`);
    }

    setIsCreatingCampaign(false);
    setEditingCampaign(null);
  };

  const handleDuplicate = (campaign) => {
    const duplicated = {
      ...campaign,
      id: 'c_' + Date.now(),
      name: campaign.name + ' (Cópia)',
      raisedAmount: 0,
      status: 'rascunho'
    };
    setMyCampaigns(prev => [...prev, duplicated]);
    alert(`Campanha "${campaign.name}" duplicada como rascunho com sucesso.`);
    setMenuOpenCampaignId(null);
  };

  const handleChangeStatus = (campaignId, newStatus) => {
    setMyCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, status: newStatus } : c));
    alert(`Status da campanha atualizado para: ${newStatus}`);
    setMenuOpenCampaignId(null);
  };

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

          {/* Brand/Logo Card */}
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
            { id: 'urgencia', label: 'Urgência' },
            { id: 'doadores', label: 'Doadores' },
            { id: 'relatorios', label: 'Relatórios' },
            { id: 'cadastro', label: 'Alterações Cadastrais' }
          ].map((subTab) => {
            const isActive = activeSubTab === subTab.id;
            return (
              <button
                key={subTab.id}
                onClick={() => handleTabChange(subTab.id)}
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
                      strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - ngoScore / 100)} strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-extrabold text-[#0A3D36]">{ngoScore}</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">de 100</span>
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

                <button
                  type="button"
                  onClick={() => handleTabChange('urgencia')}
                  className="w-full bg-[#0A665C] hover:bg-[#08524a] text-white font-bold py-3.5 px-6 rounded-2xl shadow-sm flex items-center justify-center space-x-2 text-sm transition-colors cursor-pointer"
                >
                  <span>Solicitações de Urgência</span>
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
                    <button 
                      onClick={() => {
                        setActiveSubTab('campanhas');
                        setCampaignTab('ativas');
                      }}
                      className="text-[#0A665C] hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Gerenciar Campanhas</span>
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
            {/* Header section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-[#0A3D36]">Minhas Campanhas</h2>
                <p className="text-gray-500 text-xs mt-1.5">
                  Gerencie o impacto do Instituto Rebrota. Acompanhe a arrecadação em tempo real e crie novas iniciativas.
                </p>
              </div>
              {!isCreatingCampaign && (
                <button 
                  onClick={handleOpenCreate}
                  className="bg-[#0A665C] hover:bg-[#08524a] text-white font-bold px-6 py-3 rounded-full flex items-center space-x-2 text-sm shadow-md transition-colors cursor-pointer shrink-0"
                >
                  <PlusCircle className="w-4.5 h-4.5" />
                  <span>Criar Nova Campanha</span>
                </button>
              )}
            </div>

            {/* CREATE / EDIT FORM */}
            {isCreatingCampaign ? (
              <div className="bg-white rounded-[2.5rem] border border-gray-150 p-8 shadow-sm space-y-6 max-w-3xl">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-150 pb-4">
                  {editingCampaign ? 'Editar Campanha' : 'Criar Nova Campanha'}
                </h3>

                <form className="space-y-6">
                  {/* Basic fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nome da Campanha</label>
                      <input 
                        type="text" 
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Ex: Reflorestamento de Encostas" 
                        className="w-full bg-[#FAF8F5] border-none rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#0A665C]" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Causa Relacionada</label>
                      <select
                        value={formCause}
                        onChange={(e) => setFormCause(e.target.value)}
                        className="w-full bg-[#FAF8F5] border-none rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#0A665C]"
                      >
                        <option value="meio-ambiente">Meio ambiente</option>
                        <option value="educacao">Educação</option>
                        <option value="saude">Saúde</option>
                        <option value="direitos-humanos">Direitos humanos</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Descrição do Objetivo</label>
                    <textarea 
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Descreva o propósito da campanha e qual será o impacto gerado..."
                      rows="3" 
                      className="w-full bg-[#FAF8F5] border-none rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#0A665C]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Meta de Arrecadação (R$)</label>
                      <input 
                        type="number" 
                        value={formTarget}
                        onChange={(e) => setFormTarget(e.target.value)}
                        placeholder="Ex: 50000" 
                        className="w-full bg-[#FAF8F5] border-none rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#0A665C]" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Prazo de Duração (dias)</label>
                      <input 
                        type="number" 
                        value={formDays}
                        onChange={(e) => setFormDays(e.target.value)}
                        placeholder="Ex: 30" 
                        className="w-full bg-[#FAF8F5] border-none rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#0A665C]" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Requisitos da Campanha</label>
                      <input 
                        type="text" 
                        value={formRequirements}
                        onChange={(e) => setFormRequirements(e.target.value)}
                        placeholder="Ex: Laudo e autorizações prévias" 
                        className="w-full bg-[#FAF8F5] border-none rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#0A665C]" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Destino dos Recursos</label>
                      <input 
                        type="text" 
                        value={formDestination}
                        onChange={(e) => setFormDestination(e.target.value)}
                        placeholder="Ex: Aquisição de mudas e insumos de plantio" 
                        className="w-full bg-[#FAF8F5] border-none rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#0A665C]" 
                      />
                    </div>
                  </div>



                  {/* Actions buttons */}
                  <div className="flex justify-end space-x-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setIsCreatingCampaign(false)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-full font-bold text-xs"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleSaveCampaign('rascunho')}
                      className="bg-[#FAF2E8] hover:bg-[#ebdcc8] text-[#8C6D3F] py-3 px-6 rounded-full font-bold text-xs"
                    >
                      Salvar como Rascunho
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleSaveCampaign('em-revisao')}
                      className="bg-[#0A665C] hover:bg-[#08524a] text-white py-3 px-6 rounded-full font-bold text-xs"
                    >
                      Solicitar Publicação
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                {/* Campaign sub-sub-tabs selection */}
                <div className="flex space-x-6 border-b border-gray-100 pb-1">
                  {[
                    { id: 'ativas', label: 'Ativas' },
                    { id: 'rascunhos', label: 'Rascunhos & Em Revisão' },
                    { id: 'encerradas', label: 'Encerradas' },
                    { id: 'arquivadas', label: 'Arquivadas' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setCampaignTab(tab.id)}
                      className={`pb-3 text-xs font-bold uppercase tracking-wider relative cursor-pointer ${
                        campaignTab === tab.id ? 'text-[#0A665C] border-b-2 border-[#0A665C]' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Campaigns List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {myCampaigns
                    .filter(c => {
                      if (campaignTab === 'ativas') return c.status === 'publicada' || c.status === 'aprovada';
                      if (campaignTab === 'rascunhos') return c.status === 'rascunho' || c.status === 'em-revisao' || c.status === 'recusada';
                      if (campaignTab === 'encerradas') return c.status === 'encerrada';
                      if (campaignTab === 'arquivadas') return c.status === 'arquivada';
                      return false;
                    })
                    .map(campaign => {
                      const progressPercent = Math.min(Math.round((campaign.raisedAmount / campaign.targetAmount) * 100), 100);
                      const isMenuOpen = menuOpenCampaignId === campaign.id;
                      
                      return (
                        <div 
                          key={campaign.id} 
                          className="bg-white rounded-[2rem] border border-gray-150 shadow-sm overflow-hidden flex flex-col md:flex-row relative"
                        >
                          {/* Left Cover Image */}
                          <div className="relative w-full md:w-44 h-48 md:h-auto shrink-0 bg-gray-150">
                            <img src={campaign.cover} alt={campaign.name} className="w-full h-full object-cover" />
                            
                            {/* Badges for status */}
                            <span className="absolute top-4 left-4 bg-gray-900/80 text-white text-[9px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                              {campaign.status === 'em-revisao' && 'EM REVISÃO'}
                              {campaign.status === 'rascunho' && 'RASCUNHO'}
                              {campaign.status === 'publicada' && 'EM PROGRESSO'}
                              {campaign.status === 'recusada' && 'RECUSADA'}
                              {campaign.status === 'encerrada' && 'CONCLUÍDA'}
                              {campaign.status === 'arquivada' && 'ARQUIVADA'}
                            </span>
                          </div>

                          {/* Campaign details */}
                          <div className="p-6 flex flex-col justify-between flex-grow space-y-4 relative">
                            {/* Alert for administrative review validation */}
                            {campaign.status === 'em-revisao' && (
                              <div className="bg-amber-50 text-amber-800 text-[9px] font-bold px-2 py-1 rounded border border-amber-100 flex items-center space-x-1 w-fit">
                                <Info className="w-3 h-3 text-amber-700" />
                                <span>Depende de validação administrativa</span>
                              </div>
                            )}

                            <div className="space-y-1">
                              <h3 className="text-base font-extrabold text-gray-900 leading-tight pr-6">{campaign.name}</h3>
                              <p className="text-gray-500 text-[10px] leading-relaxed line-clamp-2">
                                {campaign.description}
                              </p>
                            </div>

                            {/* Matchfunding indicators */}
                            {campaign.matchMultiplier > 1 && (
                              <div className="bg-emerald-50 text-emerald-800 p-2 rounded-xl border border-emerald-100 text-[9px] font-semibold space-y-0.5">
                                <div className="flex items-center space-x-1">
                                  <Percent className="w-3 h-3 text-emerald-600" />
                                  <span className="font-extrabold">Matchfunding {campaign.matchMultiplier}x ativo</span>
                                </div>
                                <p className="text-gray-500 font-medium">Parceiro: {campaign.matchSponsor} (Teto: R$ {campaign.matchCap?.toLocaleString('pt-BR')})</p>
                              </div>
                            )}

                            {/* Progress bar info */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-end text-[10px] font-bold">
                                <span className="text-[#0A665C] font-extrabold">{progressPercent}%</span>
                                <span className="text-gray-400 uppercase tracking-widest">META: R$ {campaign.targetAmount.toLocaleString('pt-BR')}</span>
                              </div>
                              <div className="w-full bg-gray-150 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-[#0A665C] h-full rounded-full" style={{ width: `${progressPercent}%` }} />
                              </div>
                              <div className="flex justify-between text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                                <span>R$ {campaign.raisedAmount.toLocaleString('pt-BR')} arrecadados</span>
                                <span>{campaign.daysLeft} dias restantes</span>
                              </div>
                            </div>

                            {/* Action links & Action menu ••• */}
                            <div className="flex items-center justify-between pt-1">
                              <button 
                                onClick={() => handleOpenEdit(campaign)}
                                className="text-xs font-bold text-[#0A665C] hover:underline"
                              >
                                Editar
                              </button>

                              <div className="relative">
                                <button 
                                  onClick={() => setMenuOpenCampaignId(isMenuOpen ? null : campaign.id)}
                                  className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer shadow-2xs"
                                >
                                  Ações •••
                                </button>

                                {isMenuOpen && (
                                  <div className="absolute right-0 bottom-full mb-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-20">
                                    {campaign.status === 'rascunho' && (
                                      <button 
                                        onClick={() => handleChangeStatus(campaign.id, 'em-revisao')}
                                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition text-left"
                                      >
                                        <CheckCircle className="w-3.5 h-3.5 text-gray-400" />
                                        <span>Solicitar Publicação</span>
                                      </button>
                                    )}
                                    {campaign.status === 'publicada' && (
                                      <button 
                                        onClick={() => handleChangeStatus(campaign.id, 'encerrada')}
                                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition text-left font-bold"
                                      >
                                        <XCircle className="w-3.5 h-3.5" />
                                        <span>Encerrar Campanha</span>
                                      </button>
                                    )}
                                    <button 
                                      onClick={() => handleDuplicate(campaign)}
                                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition text-left"
                                    >
                                      <Copy className="w-3.5 h-3.5 text-gray-400" />
                                      <span>Duplicar Iniciativa</span>
                                    </button>
                                    {campaign.status !== 'arquivada' && (
                                      <button 
                                        onClick={() => handleChangeStatus(campaign.id, 'arquivada')}
                                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition text-left"
                                      >
                                        <Archive className="w-3.5 h-3.5 text-gray-400" />
                                        <span>Arquivar</span>
                                      </button>
                                    )}
                                    {campaign.status === 'arquivada' && (
                                      <button 
                                        onClick={() => handleChangeStatus(campaign.id, 'rascunho')}
                                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition text-left"
                                      >
                                        <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
                                        <span>Restaurar Rascunho</span>
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>

                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        )}

        {/* VIEW: Urgência */}
        {activeSubTab === 'urgencia' && (
          <div className="space-y-6">
            {urgencyView === 'list' && (
              <UrgencyRequestsDashboard
                ngoId={ngoId}
                onCreateNew={() => {
                  setUrgencyRequestId(null);
                  setUrgencyView('form');
                }}
                onEditRequest={(id) => {
                  setUrgencyRequestId(id);
                  setUrgencyView('form');
                }}
                onViewRequest={(id) => {
                  setUrgencyRequestId(id);
                  setUrgencyView('view');
                }}
              />
            )}
            {(urgencyView === 'form' || urgencyView === 'view') && (
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => {
                    setUrgencyView('list');
                    setUrgencyRequestId(null);
                  }}
                  className="text-sm font-bold text-[#0A665C] hover:underline"
                >
                  ← Voltar às solicitações
                </button>
                <UrgencyRequestWizard
                  ngoId={ngoId}
                  ngoName={ngoName}
                  requestId={urgencyRequestId}
                  readOnly={urgencyView === 'view'}
                  onComplete={() => {
                    setUrgencyView('list');
                    setUrgencyRequestId(null);
                  }}
                  onCancel={() => {
                    setUrgencyView('list');
                    setUrgencyRequestId(null);
                  }}
                />
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
                        <h5 className="text-xs font-bold text-gray-900">Doadores</h5>
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">Fidelidade e novos ingressos</p>
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
                        strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - ngoScore / 100)} strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-base font-extrabold text-[#0A3D36]">{ngoScore}</span>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Impacto & Transparência</h5>
                    <h6 className="text-xs font-bold text-gray-900 mt-0.5">Score de Confiança</h6>
                    <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                      Sua ONG possui {ngoScore} pontos nos critérios de verificação automatizada.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* VIEW 5: Alterações Cadastrais */}
        {activeSubTab === 'cadastro' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 animate-fadeIn">
            {/* Form */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-900">Solicitar Alteração Cadastral</h3>
                <p className="text-xs text-gray-400">
                  Envie novas informações cadastrais para revisão administrativa. As alterações serão publicadas após validação dos documentos pela equipe do ONG+.
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Razão Social</label>
                    <input type="text" placeholder="Instituto Rebrota de Preservação Ambiental" className="w-full bg-[#FAF8F5] border-none rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#0A665C]" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nome Fantasia / Público</label>
                    <input type="text" placeholder="Instituto Rebrota" className="w-full bg-[#FAF8F5] border-none rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#0A665C]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Endereço Principal / Sede</label>
                  <input type="text" placeholder="Rua das Palmeiras, 102, Manaus, AM" className="w-full bg-[#FAF8F5] border-none rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#0A665C]" />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Descrição Institucional</label>
                  <textarea rows="4" placeholder="Nossa missão é restaurar o equilíbrio ecológico através da biodiversidade urbana..." className="w-full bg-[#FAF8F5] border-none rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#0A665C]" />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Documento Comprovatório (PDF)</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-[#FAF8F5] transition cursor-pointer">
                    <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-xs font-bold text-[#0A665C] block">Fazer upload do Estatuto ou Ata de Eleição</span>
                    <span className="text-[10px] text-gray-400">PDF de até 10MB</span>
                  </div>
                </div>

                <button type="submit" className="bg-[#0A665C] hover:bg-[#08524a] text-white py-3.5 px-6 rounded-full font-bold text-xs tracking-wider transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); alert('Solicitação de alteração cadastral enviada para moderação!'); }}>
                  Enviar para Análise
                </button>
              </form>
            </div>

            {/* Request feedback section */}
            <div className="space-y-6">
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] space-y-6">
                <h4 className="text-sm font-bold text-gray-900">Histórico de Solicitações</h4>
                
                <div className="space-y-4">
                  {[
                    { type: 'Endereço & Nome Fantasia', date: '02 Jun, 2026', status: 'Pendente', color: 'bg-amber-100 text-amber-800 border-amber-200', notes: 'Aguardando validação da equipe interna.' },
                    { type: 'Estatuto de Fundação', date: '14 Abr, 2026', status: 'Aprovada', color: 'bg-[#CBDDCD] text-[#0A3D36] border-[#CBDDCD]', notes: 'Documento homologado com sucesso.' },
                    { type: 'Razão Social', date: '10 Mar, 2026', status: 'Recusada', color: 'bg-red-50 text-red-700 border-red-100', notes: 'Cópia do CNPJ incorreta ou desatualizada.' }
                  ].map((req, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-50 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-900">{req.type}</span>
                        <span className={`text-[9px] font-extrabold border px-2 py-0.5 rounded-full uppercase tracking-wider ${req.color}`}>
                          {req.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-semibold">Solicitado em: {req.date}</div>
                      <p className="text-[10px] text-gray-500 font-medium leading-relaxed bg-white p-2 rounded-lg border border-gray-100/50">
                        {req.notes}
                      </p>
                    </div>
                  ))}
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
