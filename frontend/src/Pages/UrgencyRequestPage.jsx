import React, { useState } from 'react';
import {
  Wind,
  TrendingDown,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Upload,
  DollarSign,
  FileText,
  AlertTriangle,
  Save
} from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Natureza da Crise' },
  { id: 2, label: 'Avaliação de Impacto' },
  { id: 3, label: 'Requisitos Financeiros' },
  { id: 4, label: 'Revisão e Envio' },
];

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center mb-10">
      {STEPS.map((step, idx) => {
        const done = step.id < currentStep;
        const active = step.id === currentStep;
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                done ? 'bg-[#0A665C] text-white' :
                active ? 'bg-[#0A3D36] text-white ring-4 ring-[#0A3D36]/20' :
                'bg-[#EAE8E3] text-gray-400'
              }`}>
                {done ? <CheckCircle className="w-4 h-4" /> : step.id}
              </div>
              <span className={`text-[10px] font-bold mt-1.5 text-center max-w-[70px] leading-tight hidden sm:block ${
                active ? 'text-[#0A3D36]' : done ? 'text-[#0A665C]' : 'text-gray-400'
              }`}>{step.label}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-4 sm:mb-6 transition-colors ${
                done ? 'bg-[#0A665C]' : 'bg-[#EAE8E3]'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Step1({ selectedCrisis, setSelectedCrisis }) {
  const crises = [
    { id: 'natural', icon: Wind, title: 'Desastre Natural', desc: 'Eventos climáticos extremos, tremores sísmicos ou falhas geológicas.' },
    { id: 'economic', icon: TrendingDown, title: 'Crise Econômica', desc: 'Colapso de infraestrutura financeira local ou inflação hiper-acelerada.' },
    { id: 'political', icon: ShieldAlert, title: 'Instabilidade Política', desc: 'Conflitos civis, deslocamento forçado ou falha de governança.' },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[#0A3D36]">1. Natureza da Crise</h3>
        <p className="text-xs text-gray-500 mt-1">Classifique o evento primário que motiva esta solicitação.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {crises.map(({ id, icon: Icon, title, desc }) => (
          <div
            key={id}
            onClick={() => setSelectedCrisis(id)}
            className={`cursor-pointer bg-white p-6 rounded-xl border transition-all flex flex-col justify-between h-48 ${
              selectedCrisis === id
                ? 'border-[#0A3D36] shadow-md ring-1 ring-[#0A3D36]'
                : 'border-gray-200 hover:border-gray-300 shadow-sm'
            }`}
          >
            <div className="flex justify-between items-start">
              <Icon className={`w-6 h-6 ${selectedCrisis === id ? 'text-[#0A3D36]' : 'text-gray-500'}`} />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedCrisis === id ? 'border-[#0A3D36] bg-[#0A3D36]' : 'border-gray-300 bg-white'
              }`}>
                {selectedCrisis === id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-bold text-gray-900 text-sm mb-1.5">{title}</h4>
              <p className="text-[11px] text-gray-500 leading-normal">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step2({ fields, setFields }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[#0A3D36]">2. Avaliação de Impacto</h3>
        <p className="text-xs text-gray-500 mt-1">Métricas quantificáveis da população e território afetados.</p>
      </div>
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
              População Diretamente Afetada
            </label>
            <input
              type="text"
              value={fields.population}
              onChange={(e) => setFields(f => ({ ...f, population: e.target.value }))}
              placeholder="Ex: 15000"
              className="w-full bg-[#EAE8E3] text-gray-800 placeholder-gray-500 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] transition text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
              Extensão Territorial (KM²)
            </label>
            <input
              type="text"
              value={fields.territory}
              onChange={(e) => setFields(f => ({ ...f, territory: e.target.value }))}
              placeholder="Ex: 450"
              className="w-full bg-[#EAE8E3] text-gray-800 placeholder-gray-500 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] transition text-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
            Resumo do Risco Operacional Atual
          </label>
          <textarea
            value={fields.riskSummary}
            onChange={(e) => setFields(f => ({ ...f, riskSummary: e.target.value }))}
            placeholder="Descreva os gargalos imediatos na entrega de assistência e riscos à segurança da equipe no local..."
            rows={4}
            className="w-full bg-[#EAE8E3] text-gray-800 placeholder-gray-500 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] transition text-sm resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}

function Step3({ fields, setFields }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[#0A3D36]">3. Requisitos Financeiros</h3>
        <p className="text-xs text-gray-500 mt-1">Detalhe os recursos necessários, justificativa e plano de uso.</p>
      </div>
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
              Valor Solicitado (R$)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={fields.amount}
                onChange={(e) => setFields(f => ({ ...f, amount: e.target.value }))}
                placeholder="0,00"
                className="w-full bg-[#EAE8E3] text-gray-800 placeholder-gray-500 rounded-lg pl-10 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] transition text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
              Prazo para Uso dos Recursos
            </label>
            <input
              type="date"
              value={fields.deadline}
              onChange={(e) => setFields(f => ({ ...f, deadline: e.target.value }))}
              className="w-full bg-[#EAE8E3] text-gray-800 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] transition text-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
            Justificativa do Pedido
          </label>
          <textarea
            value={fields.justification}
            onChange={(e) => setFields(f => ({ ...f, justification: e.target.value }))}
            placeholder="Explique por que esses recursos são necessários e com qual urgência..."
            rows={3}
            className="w-full bg-[#EAE8E3] text-gray-800 placeholder-gray-500 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] transition text-sm resize-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
            Plano de Uso dos Recursos
          </label>
          <textarea
            value={fields.usePlan}
            onChange={(e) => setFields(f => ({ ...f, usePlan: e.target.value }))}
            placeholder="Descreva como os recursos serão distribuídos: itens de necessidade, logística, pessoal, etc..."
            rows={4}
            className="w-full bg-[#EAE8E3] text-gray-800 placeholder-gray-500 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] transition text-sm resize-none"
          />
        </div>
        {/* Upload de documentos */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
            Documentos de Evidência da Urgência
          </label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#0A665C]/40 transition cursor-pointer bg-gray-50">
            <Upload className="w-6 h-6 text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-500 font-medium">
              Arraste arquivos aqui ou <span className="text-[#0A665C] font-bold">clique para selecionar</span>
            </p>
            <p className="text-[10px] text-gray-400 mt-1">PDF, JPG, PNG — máx. 10 MB por arquivo</p>
          </div>
          <div className="flex items-start space-x-2 text-xs text-amber-700 bg-amber-50 px-3 py-2.5 rounded-lg">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Documentos obrigatórios: boletim de ocorrência, declaração do gestor, registros fotográficos da crise.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step4({ data, onSubmit }) {
  const crisisLabels = { natural: 'Desastre Natural', economic: 'Crise Econômica', political: 'Instabilidade Política' };
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[#0A3D36]">4. Revisão e Envio</h3>
        <p className="text-xs text-gray-500 mt-1">Revise os dados antes de enviar ao conselho administrativo.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {[
          { label: 'Natureza da Crise', value: crisisLabels[data.crisis] || '—' },
          { label: 'População Afetada', value: data.impact.population || '—' },
          { label: 'Extensão Territorial', value: data.impact.territory ? `${data.impact.territory} KM²` : '—' },
          { label: 'Valor Solicitado', value: data.financial.amount ? `R$ ${parseFloat(data.financial.amount).toLocaleString('pt-BR')}` : '—' },
          { label: 'Prazo para Uso', value: data.financial.deadline || '—' },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center px-6 py-4">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{label}</span>
            <span className="text-sm font-bold text-gray-900">{value}</span>
          </div>
        ))}
      </div>
      {data.impact.riskSummary && (
        <div className="bg-[#F9FAF9] rounded-xl p-5 border border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Risco Operacional</p>
          <p className="text-sm text-gray-700 leading-relaxed">{data.impact.riskSummary}</p>
        </div>
      )}
      {data.financial.justification && (
        <div className="bg-[#F9FAF9] rounded-xl p-5 border border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Justificativa</p>
          <p className="text-sm text-gray-700 leading-relaxed">{data.financial.justification}</p>
        </div>
      )}
      <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">
          Ao enviar, você confirma que todas as informações são verdadeiras e que os documentos de evidência foram anexados. Declarações falsas implicam em suspensão imediata da ONG na plataforma.
        </p>
      </div>
      <button
        type="button"
        onClick={onSubmit}
        className="w-full flex items-center justify-center space-x-2 bg-[#0A665C] hover:bg-[#08524a] text-white px-7 py-4 rounded-full font-bold text-sm transition-colors shadow-md cursor-pointer"
      >
        <FileText className="w-4 h-4" />
        <span>Enviar Solicitação ao Conselho</span>
      </button>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
      <div className="w-20 h-20 bg-[#E4F2EE] rounded-full flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-[#0A665C]" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-[#0A3D36]">Solicitação Enviada!</h2>
        <p className="text-gray-500 text-sm max-w-md">
          Seu protocolo foi registrado com sucesso. O conselho administrativo irá analisar a solicitação em até 5 dias úteis. Você receberá atualizações de status por e-mail.
        </p>
      </div>
      <div className="bg-[#F9FAF9] rounded-2xl px-8 py-5 border border-gray-100 space-y-1">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Número do Protocolo</p>
        <p className="text-2xl font-extrabold text-[#0A3D36] tracking-wide">#UR-8924-BR</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {['Em análise', 'Prazo: 5 dias úteis', 'Notificação por e-mail'].map(tag => (
          <span key={tag} className="bg-[#CBDDCD] text-[#0A3D36] text-xs font-bold px-3 py-1.5 rounded-full">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function UrgencyRequestPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [savedDraft, setSavedDraft] = useState(false);

  const [selectedCrisis, setSelectedCrisis] = useState('natural');
  const [impactFields, setImpactFields] = useState({ population: '', territory: '', riskSummary: '' });
  const [financialFields, setFinancialFields] = useState({ amount: '', deadline: '', justification: '', usePlan: '' });

  const allData = {
    crisis: selectedCrisis,
    impact: impactFields,
    financial: financialFields,
  };

  const handleNext = () => setCurrentStep(s => Math.min(s + 1, 4));
  const handleBack = () => setCurrentStep(s => Math.max(s - 1, 1));
  const handleSaveDraft = () => { setSavedDraft(true); setTimeout(() => setSavedDraft(false), 2500); };
  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] font-sans flex items-center justify-center px-6">
        <div className="w-full max-w-2xl">
          <SuccessState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans">
      <main className="w-full max-w-5xl mx-auto py-12 px-6 md:px-10">
        {/* Status Badge & Protocol ID */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="bg-[#CBDDCD] text-[#0A3D36] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ● Em Preenchimento
          </span>
          <span className="text-sm font-semibold text-gray-500">Protocolo #UR-8924-BR</span>
        </div>

        <h1 className="text-4xl font-bold text-[#0A3D36] mb-1">Solicitação de Urgência</h1>
        <h2 className="text-2xl text-gray-800 font-medium mb-6">Protocolo de Alívio Financeiro</h2>
        <p className="text-[#646A63] text-sm leading-relaxed mb-10 max-w-3xl">
          Formulário oficial para requisição de fundos de contingência. O preenchimento detalhado e a precisão dos dados são obrigatórios para a avaliação acelerada pelo conselho diretor.
        </p>

        <StepIndicator currentStep={currentStep} />

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="bg-[#FAF8F5] border border-[#E5E2D9]/80 rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            {currentStep === 1 && (
              <Step1 selectedCrisis={selectedCrisis} setSelectedCrisis={setSelectedCrisis} />
            )}
            {currentStep === 2 && (
              <Step2 fields={impactFields} setFields={setImpactFields} />
            )}
            {currentStep === 3 && (
              <Step3 fields={financialFields} setFields={setFinancialFields} />
            )}
            {currentStep === 4 && (
              <Step4 data={allData} onSubmit={handleSubmit} />
            )}
          </div>

          {/* Navigation */}
          {currentStep < 4 && (
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center space-x-2 text-gray-500 hover:text-[#0A3D36] font-semibold text-sm transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className={`flex items-center space-x-2 font-semibold text-sm transition ${
                    savedDraft ? 'text-teal-600' : 'text-[#0A3D36] hover:underline'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span>{savedDraft ? 'Rascunho salvo!' : 'Salvar Rascunho'}</span>
                </button>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center space-x-2 bg-[#0A665C] hover:bg-[#08524a] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-colors shadow-md cursor-pointer"
              >
                <span>
                  {currentStep === 3 ? 'Revisar Solicitação' : 'Continuar'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
