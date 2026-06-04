export const URGENCY_STATUS = {
  DRAFT: 'rascunho',
  SENT: 'enviada',
  IN_REVIEW: 'em_analise',
  APPROVED: 'aprovada',
  REJECTED: 'recusada',
  COMPLETED: 'concluida',
};

export const PUBLIC_URGENCY_STATUSES = [
  URGENCY_STATUS.APPROVED,
  URGENCY_STATUS.COMPLETED,
];

export const URGENCY_STATUS_LABELS = {
  [URGENCY_STATUS.DRAFT]: 'Rascunho',
  [URGENCY_STATUS.SENT]: 'Enviada',
  [URGENCY_STATUS.IN_REVIEW]: 'Em análise',
  [URGENCY_STATUS.APPROVED]: 'Aprovada',
  [URGENCY_STATUS.REJECTED]: 'Recusada',
  [URGENCY_STATUS.COMPLETED]: 'Concluída',
};

export const CRISIS_TYPES = {
  natural: { label: 'Desastre Natural', icon: 'Wind' },
  economic: { label: 'Crise Econômica', icon: 'TrendingDown' },
  political: { label: 'Instabilidade Política', icon: 'ShieldAlert' },
};

export const WIZARD_STEPS = [
  { id: 1, label: 'Natureza da Crise' },
  { id: 2, label: 'Avaliação de Impacto' },
  { id: 3, label: 'Requisitos Financeiros' },
  { id: 4, label: 'Evidências' },
  { id: 5, label: 'Revisão e Envio' },
];
