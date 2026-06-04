import React, { useState, useEffect, useRef } from 'react';
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
  Save,
  X,
} from 'lucide-react';
import { WIZARD_STEPS, CRISIS_TYPES, URGENCY_STATUS } from '../../data/urgencyConstants';
import {
  getRequestById,
  saveDraft,
  submitUrgencyRequest,
} from '../../services/urgencyRequestService';
import UrgencyStatusBadge from './UrgencyStatusBadge';

const CRISIS_ICONS = { natural: Wind, economic: TrendingDown, political: ShieldAlert };

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center mb-10">
      {WIZARD_STEPS.map((step, idx) => {
        const done = step.id < currentStep;
        const active = step.id === currentStep;
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  done
                    ? 'bg-[#0A665C] text-white'
                    : active
                      ? 'bg-[#0A3D36] text-white ring-4 ring-[#0A3D36]/20'
                      : 'bg-[#EAE8E3] text-gray-400'
                }`}
              >
                {done ? <CheckCircle className="w-4 h-4" /> : step.id}
              </div>
              <span
                className={`text-[10px] font-bold mt-1.5 text-center max-w-[70px] leading-tight hidden sm:block ${
                  active ? 'text-[#0A3D36]' : done ? 'text-[#0A665C]' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < WIZARD_STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mb-4 sm:mb-6 transition-colors ${
                  done ? 'bg-[#0A665C]' : 'bg-[#EAE8E3]'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function FileUploadZone({ label, files, onFilesChange, hint }) {
  const inputRef = useRef(null);

  const handleFiles = (fileList) => {
    const next = Array.from(fileList).map((f) => ({
      name: f.name,
      size: f.size,
    }));
    onFilesChange([...files, ...next]);
  };

  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
        {label}
      </label>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#0A665C]/40 transition cursor-pointer bg-gray-50"
      >
        <Upload className="w-6 h-6 text-gray-300 mx-auto mb-2" />
        <p className="text-xs text-gray-500 font-medium">
          Arraste arquivos aqui ou{' '}
          <span className="text-[#0A665C] font-bold">clique para selecionar</span>
        </p>
        <p className="text-[10px] text-gray-400 mt-1">PDF, JPG, PNG — máx. 10 MB por arquivo</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>
      {hint && (
        <div className="flex items-start space-x-2 text-xs text-amber-700 bg-amber-50 px-3 py-2.5 rounded-lg">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{hint}</span>
        </div>
      )}
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-3 py-2 text-xs"
            >
              <span className="font-medium text-gray-700 truncate">{f.name}</span>
              <button
                type="button"
                onClick={() => onFilesChange(files.filter((_, idx) => idx !== i))}
                className="text-gray-400 hover:text-red-500 p-1"
                aria-label="Remover arquivo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function emptyForm() {
  return {
    crisis: 'natural',
    impact: { population: '', territory: '', riskSummary: '' },
    financial: { amount: '', deadline: '', justification: '', usePlan: '' },
    evidenceFiles: [],
    financialDocuments: [],
  };
}

function requestToForm(request) {
  if (!request) return emptyForm();
  return {
    crisis: request.crisis ?? 'natural',
    impact: request.impact ?? emptyForm().impact,
    financial: request.financial ?? emptyForm().financial,
    evidenceFiles: request.evidenceFiles ?? [],
    financialDocuments: request.financialDocuments ?? [],
  };
}

function SuccessState({ protocol, onDone }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center">
      <div className="w-20 h-20 bg-[#E4F2EE] rounded-full flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-[#0A665C]" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-[#0A3D36]">Solicitação Enviada!</h2>
        <p className="text-gray-500 text-sm max-w-md">
          Seu protocolo foi registrado. O conselho administrativo analisará em até 5 dias úteis.
          Você receberá atualizações de status por e-mail (mock).
        </p>
      </div>
      <div className="bg-[#F9FAF9] rounded-2xl px-8 py-5 border border-gray-100 space-y-1">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
          Número do Protocolo
        </p>
        <p className="text-2xl font-extrabold text-[#0A3D36] tracking-wide">{protocol}</p>
      </div>
      <UrgencyStatusBadge status={URGENCY_STATUS.SENT} className="text-xs" />
      {onDone && (
        <button
          type="button"
          onClick={onDone}
          className="text-[#0A665C] font-bold text-sm hover:underline"
        >
          Voltar ao painel de urgências
        </button>
      )}
    </div>
  );
}

export default function UrgencyRequestWizard({
  ngoId,
  ngoName,
  requestId = null,
  readOnly = false,
  onComplete,
  onCancel,
}) {
  const existing = requestId ? getRequestById(requestId) : null;
  const isViewOnly =
    readOnly || (existing && existing.status !== URGENCY_STATUS.DRAFT);

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [savedDraft, setSavedDraft] = useState(false);
  const [activeRequestId, setActiveRequestId] = useState(requestId);
  const [protocol, setProtocol] = useState(existing?.protocol ?? null);
  const [status, setStatus] = useState(existing?.status ?? URGENCY_STATUS.DRAFT);

  const [form, setForm] = useState(() => requestToForm(existing));

  useEffect(() => {
    if (existing) {
      setForm(requestToForm(existing));
      setProtocol(existing.protocol);
      setStatus(existing.status);
      setActiveRequestId(existing.id);
    }
  }, [requestId]);

  const buildPayload = () => ({
    crisis: form.crisis,
    impact: form.impact,
    financial: form.financial,
    evidenceFiles: form.evidenceFiles,
    financialDocuments: form.financialDocuments,
  });

  const handleSaveDraft = () => {
    const saved = saveDraft(ngoId, ngoName, buildPayload(), activeRequestId);
    if (saved) {
      setActiveRequestId(saved.id);
      setProtocol(saved.protocol);
      setStatus(saved.status);
      setSavedDraft(true);
      setTimeout(() => setSavedDraft(false), 2500);
    }
  };

  const handleSubmit = () => {
    const saved = submitUrgencyRequest(ngoId, ngoName, buildPayload(), activeRequestId);
    if (saved) {
      setProtocol(saved.protocol);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return <SuccessState protocol={protocol} onDone={onComplete} />;
  }

  if (isViewOnly) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <UrgencyStatusBadge status={status} />
          {protocol && (
            <span className="text-sm font-semibold text-gray-500">Protocolo {protocol}</span>
          )}
        </div>
        <p className="text-xs text-gray-500">
          Status: solicitação em modo de visualização. Rascunhos podem ser editados; demais status são somente leitura.
        </p>
        <ReviewStep form={form} readOnly />
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-[#0A665C] font-bold text-sm hover:underline"
          >
            Voltar à lista
          </button>
        )}
      </div>
    );
  }

  const crises = Object.entries(CRISIS_TYPES).map(([id, { label }]) => ({
    id,
    icon: CRISIS_ICONS[id],
    title: label,
    desc:
      id === 'natural'
        ? 'Eventos climáticos extremos, tremores sísmicos ou falhas geológicas.'
        : id === 'economic'
          ? 'Colapso de infraestrutura financeira local ou inflação hiper-acelerada.'
          : 'Conflitos civis, deslocamento forçado ou falha de governança.',
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <UrgencyStatusBadge status={status} />
        {protocol && (
          <span className="text-sm font-semibold text-gray-500">Protocolo {protocol}</span>
        )}
      </div>

      <StepIndicator currentStep={currentStep} />

      <div className="bg-[#FAF8F5] border border-[#E5E2D9]/80 rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#0A3D36]">1. Natureza da Crise</h3>
              <p className="text-xs text-gray-500 mt-1">
                Classifique o evento primário que motiva esta solicitação.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {crises.map(({ id, icon: Icon, title, desc }) => (
                <div
                  key={id}
                  onClick={() => setForm((f) => ({ ...f, crisis: id }))}
                  className={`cursor-pointer bg-white p-6 rounded-xl border transition-all flex flex-col justify-between h-48 ${
                    form.crisis === id
                      ? 'border-[#0A3D36] shadow-md ring-1 ring-[#0A3D36]'
                      : 'border-gray-200 hover:border-gray-300 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <Icon
                      className={`w-6 h-6 ${form.crisis === id ? 'text-[#0A3D36]' : 'text-gray-500'}`}
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        form.crisis === id ? 'border-[#0A3D36] bg-[#0A3D36]' : 'border-gray-300 bg-white'
                      }`}
                    >
                      {form.crisis === id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
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
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#0A3D36]">2. Avaliação de Impacto</h3>
              <p className="text-xs text-gray-500 mt-1">
                Métricas quantificáveis da população e território afetados.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                    População Diretamente Afetada
                  </label>
                  <input
                    type="text"
                    value={form.impact.population}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        impact: { ...f.impact, population: e.target.value },
                      }))
                    }
                    placeholder="Ex: 15000"
                    className="w-full bg-[#EAE8E3] text-gray-800 placeholder-gray-500 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                    Extensão Territorial (KM²)
                  </label>
                  <input
                    type="text"
                    value={form.impact.territory}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        impact: { ...f.impact, territory: e.target.value },
                      }))
                    }
                    placeholder="Ex: 450"
                    className="w-full bg-[#EAE8E3] text-gray-800 placeholder-gray-500 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Resumo do Risco Operacional Atual
                </label>
                <textarea
                  value={form.impact.riskSummary}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      impact: { ...f.impact, riskSummary: e.target.value },
                    }))
                  }
                  placeholder="Descreva os gargalos imediatos na entrega de assistência..."
                  rows={4}
                  className="w-full bg-[#EAE8E3] text-gray-800 placeholder-gray-500 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] text-sm resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#0A3D36]">3. Requisitos Financeiros</h3>
              <p className="text-xs text-gray-500 mt-1">
                Valores solicitados, justificativa, prazo e plano de uso dos recursos.
              </p>
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
                      value={form.financial.amount}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          financial: { ...f.financial, amount: e.target.value },
                        }))
                      }
                      placeholder="0,00"
                      className="w-full bg-[#EAE8E3] rounded-lg pl-10 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                    Prazo para Uso dos Recursos
                  </label>
                  <input
                    type="date"
                    value={form.financial.deadline}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        financial: { ...f.financial, deadline: e.target.value },
                      }))
                    }
                    className="w-full bg-[#EAE8E3] rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Justificativa do Pedido
                </label>
                <textarea
                  value={form.financial.justification}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      financial: { ...f.financial, justification: e.target.value },
                    }))
                  }
                  rows={3}
                  className="w-full bg-[#EAE8E3] rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] text-sm resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Plano de Uso dos Recursos
                </label>
                <textarea
                  value={form.financial.usePlan}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      financial: { ...f.financial, usePlan: e.target.value },
                    }))
                  }
                  rows={4}
                  className="w-full bg-[#EAE8E3] rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] text-sm resize-none"
                />
              </div>
              <FileUploadZone
                label="Documentos financeiros (opcional)"
                files={form.financialDocuments}
                onFilesChange={(financialDocuments) =>
                  setForm((f) => ({ ...f, financialDocuments }))
                }
                hint="Orçamentos, planilhas de custos ou propostas formais de fornecedores."
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#0A3D36]">4. Evidências da Urgência</h3>
              <p className="text-xs text-gray-500 mt-1">
                Comprovantes e documentos que validam a situação de crise.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <FileUploadZone
                label="Comprovantes e documentos de crise"
                files={form.evidenceFiles}
                onFilesChange={(evidenceFiles) => setForm((f) => ({ ...f, evidenceFiles }))}
                hint="Documentos obrigatórios: boletim de ocorrência, declaração do gestor, registros fotográficos da crise."
              />
            </div>
          </div>
        )}

        {currentStep === 5 && <ReviewStep form={form} onSubmit={handleSubmit} readOnly={false} />}
      </div>

      {currentStep < 5 && (
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s - 1)}
                className="flex items-center space-x-2 text-gray-500 hover:text-[#0A3D36] font-semibold text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleSaveDraft}
              className={`flex items-center space-x-2 font-semibold text-sm ${
                savedDraft ? 'text-teal-600' : 'text-[#0A3D36] hover:underline'
              }`}
            >
              <Save className="w-4 h-4" />
              <span>{savedDraft ? 'Rascunho salvo!' : 'Salvar Rascunho'}</span>
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="text-gray-400 hover:text-gray-600 text-sm font-semibold"
              >
                Cancelar
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setCurrentStep((s) => Math.min(s + 1, 5))}
            className="flex items-center space-x-2 bg-[#0A665C] hover:bg-[#08524a] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-md"
          >
            <span>{currentStep === 4 ? 'Revisar Solicitação' : 'Continuar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function ReviewStep({ form, onSubmit, readOnly }) {
  const crisisLabel = CRISIS_TYPES[form.crisis]?.label ?? '—';
  const rows = [
    { label: 'Natureza da Crise', value: crisisLabel },
    { label: 'População Afetada', value: form.impact.population || '—' },
    {
      label: 'Extensão Territorial',
      value: form.impact.territory ? `${form.impact.territory} KM²` : '—',
    },
    {
      label: 'Valor Solicitado',
      value: form.financial.amount
        ? `R$ ${parseFloat(form.financial.amount).toLocaleString('pt-BR')}`
        : '—',
    },
    { label: 'Prazo para Uso', value: form.financial.deadline || '—' },
    {
      label: 'Evidências anexadas',
      value: `${form.evidenceFiles.length} arquivo(s)`,
    },
    {
      label: 'Docs. financeiros',
      value: `${form.financialDocuments.length} arquivo(s)`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[#0A3D36]">5. Revisão e Envio</h3>
        <p className="text-xs text-gray-500 mt-1">
          Revise os dados antes de enviar ao conselho administrativo.
        </p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center px-6 py-4">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              {label}
            </span>
            <span className="text-sm font-bold text-gray-900">{value}</span>
          </div>
        ))}
      </div>
      {form.impact.riskSummary && (
        <div className="bg-[#F9FAF9] rounded-xl p-5 border border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Risco Operacional</p>
          <p className="text-sm text-gray-700">{form.impact.riskSummary}</p>
        </div>
      )}
      {form.financial.justification && (
        <div className="bg-[#F9FAF9] rounded-xl p-5 border border-gray-100">
          <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Justificativa</p>
          <p className="text-sm text-gray-700">{form.financial.justification}</p>
        </div>
      )}
      {!readOnly && (
        <>
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              Ao enviar, você confirma que todas as informações são verdadeiras. Declarações falsas
              implicam suspensão imediata da ONG na plataforma.
            </p>
          </div>
          <button
            type="button"
            onClick={onSubmit}
            className="w-full flex items-center justify-center space-x-2 bg-[#0A665C] hover:bg-[#08524a] text-white px-7 py-4 rounded-full font-bold text-sm shadow-md"
          >
            <FileText className="w-4 h-4" />
            <span>Enviar Solicitação ao Conselho</span>
          </button>
        </>
      )}
    </div>
  );
}
