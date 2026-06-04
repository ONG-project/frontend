import {
  URGENCY_STATUS,
  PUBLIC_URGENCY_STATUSES,
} from '../data/urgencyConstants';

const STORAGE_KEY = '@ongplus:urgency_requests';

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(requests) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

function generateProtocol() {
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `#UR-${Date.now().toString().slice(-4)}-${suffix}`;
}

function seedIfEmpty() {
  const existing = loadAll();
  if (existing.length > 0) return existing;

  const now = new Date().toISOString();
  const seeds = [
    {
      id: 'urg-seed-1',
      protocol: '#UR-7821-BR',
      ngoId: 1,
      ngoName: 'Instituto Rebrota',
      status: URGENCY_STATUS.APPROVED,
      isPublic: true,
      crisis: 'natural',
      impact: {
        population: '8200',
        territory: '120',
        riskSummary:
          'Enchentes severas afetaram hortas comunitárias e estoques de sementes. Equipes de campo com acesso restrito.',
      },
      financial: {
        amount: '85000',
        deadline: '2026-07-15',
        justification:
          'Recursos emergenciais para recomposição de infraestrutura hídrica e kits de sobrevivência para famílias atingidas.',
        usePlan:
          '40% materiais de reconstrução, 35% logística e transporte, 25% equipe técnica e coordenação local.',
      },
      evidenceFiles: [
        { name: 'boletim_ocorrencia.pdf', size: 245000 },
        { name: 'registro_fotografico_crise.zip', size: 4200000 },
      ],
      financialDocuments: [{ name: 'orcamento_detalhado.xlsx', size: 89000 }],
      createdAt: '2026-05-20T10:00:00.000Z',
      updatedAt: '2026-05-22T14:30:00.000Z',
      submittedAt: '2026-05-20T11:00:00.000Z',
    },
    {
      id: 'urg-seed-2',
      protocol: '#UR-8103-BR',
      ngoId: 1,
      ngoName: 'Instituto Rebrota',
      status: URGENCY_STATUS.IN_REVIEW,
      isPublic: false,
      crisis: 'economic',
      impact: {
        population: '2100',
        territory: '35',
        riskSummary: 'Queda abrupta de doações mensais comprometeu folha de campo por 60 dias.',
      },
      financial: {
        amount: '42000',
        deadline: '2026-08-01',
        justification: 'Manutenção operacional mínima até retomada da arrecadação regular.',
        usePlan: 'Pagamento de equipe essencial, combustível e manutenção de viveiros.',
      },
      evidenceFiles: [{ name: 'declaracao_gestor.pdf', size: 156000 }],
      financialDocuments: [],
      createdAt: '2026-06-01T09:00:00.000Z',
      updatedAt: '2026-06-02T16:00:00.000Z',
      submittedAt: '2026-06-01T10:30:00.000Z',
    },
    {
      id: 'urg-seed-3',
      protocol: '#UR-6540-AM',
      ngoId: 2,
      ngoName: 'Águas Limpas Brasil',
      status: URGENCY_STATUS.COMPLETED,
      isPublic: true,
      crisis: 'natural',
      impact: {
        population: '15000',
        territory: '200',
        riskSummary: 'Seca prolongada reduziu reservatórios comunitários em comunidades ribeirinhas.',
      },
      financial: {
        amount: '120000',
        deadline: '2025-12-31',
        justification: 'Instalação emergencial de sistemas de captação e distribuição de água potável.',
        usePlan: 'Equipamentos, frete fluvial, instalação e monitoramento por 90 dias.',
      },
      evidenceFiles: [
        { name: 'laudo_tecnico.pdf', size: 512000 },
        { name: 'fotos_comunidades.jpg', size: 1800000 },
      ],
      financialDocuments: [{ name: 'prestacao_contas_final.pdf', size: 920000 }],
      createdAt: '2025-10-10T08:00:00.000Z',
      updatedAt: '2026-01-15T12:00:00.000Z',
      submittedAt: '2025-10-10T09:00:00.000Z',
    },
  ];

  saveAll(seeds);
  return seeds;
}

export function listUrgencyRequests() {
  return seedIfEmpty();
}

export function getRequestsByNgo(ngoId) {
  return listUrgencyRequests().filter((r) => String(r.ngoId) === String(ngoId));
}

export function getRequestById(id) {
  return listUrgencyRequests().find((r) => r.id === id) ?? null;
}

export function getPublicRequestsByNgo(ngoId) {
  return getRequestsByNgo(ngoId).filter(
    (r) => r.isPublic && PUBLIC_URGENCY_STATUSES.includes(r.status)
  );
}

export function getAllPublicRequests() {
  return listUrgencyRequests().filter(
    (r) => r.isPublic && PUBLIC_URGENCY_STATUSES.includes(r.status)
  );
}

export function upsertUrgencyRequest({ ngoId, ngoName, payload, status, existingId }) {
  const all = listUrgencyRequests();
  const now = new Date().toISOString();
  const isPublic = PUBLIC_URGENCY_STATUSES.includes(status);

  if (existingId) {
    const idx = all.findIndex((r) => r.id === existingId);
    if (idx === -1) return null;
    const updated = {
      ...all[idx],
      ...payload,
      status,
      isPublic,
      ngoId,
      ngoName,
      updatedAt: now,
      submittedAt:
        status === URGENCY_STATUS.SENT && !all[idx].submittedAt ? now : all[idx].submittedAt,
    };
    all[idx] = updated;
    saveAll(all);
    return updated;
  }

  const created = {
    id: `urg-${Date.now()}`,
    protocol: generateProtocol(),
    ngoId,
    ngoName,
    status,
    isPublic,
    createdAt: now,
    updatedAt: now,
    submittedAt: status === URGENCY_STATUS.SENT ? now : null,
    ...payload,
  };
  all.push(created);
  saveAll(all);
  return created;
}

export function saveDraft(ngoId, ngoName, formData, existingId) {
  return upsertUrgencyRequest({
    ngoId,
    ngoName,
    existingId,
    status: URGENCY_STATUS.DRAFT,
    payload: formData,
  });
}

export function submitUrgencyRequest(ngoId, ngoName, formData, existingId) {
  return upsertUrgencyRequest({
    ngoId,
    ngoName,
    existingId,
    status: URGENCY_STATUS.SENT,
    payload: formData,
  });
}

export { URGENCY_STATUS, generateProtocol };
