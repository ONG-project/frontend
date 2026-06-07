import { getAllocationCriteria as fetchAllocationCriteria } from './transparencyService';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Repasses recentes com critérios que embasaram a decisão
const mockTransfers = [
  {
    id: 1,
    ong: 'Instituto Rebrota',
    cnpj: '12.345.678/0001-90',
    cause: 'Meio Ambiente',
    amount: 45000,
    date: '2024-05-30T10:00:00.000Z',
    period: 'week', // pertence à semana E ao mês
    reason: 'Reflorestamento Urbano e Hortas Comunitárias',
    docType: 'receipt',
    docLabel: 'Recibo #00821',
    criteria: {
      score: 96,
      yearsActive: 16,
      addressConsistency: true,
      cnpjValidated: true,
      lastAudit: 'Dez/2023',
      auditStatus: 'Sem Ressalvas',
      documentationComplete: true,
    },
  },
  {
    id: 2,
    ong: 'Mãos Que Alimentam',
    cnpj: '98.765.432/0001-10',
    cause: 'Alimentação',
    amount: 120000,
    date: '2024-05-28T14:00:00.000Z',
    period: 'week',
    reason: 'Cozinhas Solidárias e Combate à Fome',
    docType: 'audit',
    docLabel: 'Auditoria #00204',
    criteria: {
      score: 92,
      yearsActive: 12,
      addressConsistency: true,
      cnpjValidated: true,
      lastAudit: 'Mar/2024',
      auditStatus: 'Sem Ressalvas',
      documentationComplete: true,
    },
  },
  {
    id: 3,
    ong: 'SOS Mata Viva',
    cnpj: '45.123.890/0001-55',
    cause: 'Meio Ambiente',
    amount: 82500,
    date: '2024-05-20T09:30:00.000Z',
    period: 'month',
    reason: 'Preservação da Fauna em Áreas de Risco',
    docType: 'receipt',
    docLabel: 'Recibo #00819',
    criteria: {
      score: 88,
      yearsActive: 9,
      addressConsistency: true,
      cnpjValidated: true,
      lastAudit: 'Jan/2024',
      auditStatus: 'Sem Ressalvas',
      documentationComplete: true,
    },
  },
  {
    id: 4,
    ong: 'Futuro Digital',
    cnpj: '11.222.333/0001-44',
    cause: 'Educação',
    amount: 35000,
    date: '2024-05-15T11:00:00.000Z',
    period: 'month',
    reason: 'Inclusão Digital para Jovens de Periferia',
    docType: 'receipt',
    docLabel: 'Recibo #00817',
    criteria: {
      score: 95,
      yearsActive: 14,
      addressConsistency: true,
      cnpjValidated: true,
      lastAudit: 'Abr/2024',
      auditStatus: 'Sem Ressalvas',
      documentationComplete: true,
    },
  },
  {
    id: 5,
    ong: 'Vozes da Comunidade',
    cnpj: '11.222.333/0001-44',
    cause: 'Direitos Humanos',
    amount: 60000,
    date: '2024-05-08T16:00:00.000Z',
    period: 'month',
    reason: 'Suporte Jurídico e Capacitação em Áreas Periféricas',
    docType: 'audit',
    docLabel: 'Auditoria #00201',
    criteria: {
      score: 91,
      yearsActive: 11,
      addressConsistency: false,
      cnpjValidated: true,
      lastAudit: 'Fev/2024',
      auditStatus: 'Com Observação',
      documentationComplete: true,
    },
  },
];

const weekTransfers = mockTransfers.filter((t) => t.period === 'week');
const monthTransfers = mockTransfers;

const weekTotal = weekTransfers.reduce((sum, t) => sum + t.amount, 0);
const weekRaised = 220000;

const monthTotal = monthTransfers.reduce((sum, t) => sum + t.amount, 0);
const monthRaised = 1250000;

export const globalTransparencyService = {
  async getGlobalMetrics() {
    await delay(400);
    return {
      week: {
        raised: weekRaised,
        distributed: weekTotal,
        ongsCount: weekTransfers.length,
        compatibility: Math.round((weekTotal / weekRaised) * 100),
      },
      month: {
        raised: monthRaised,
        distributed: monthTotal,
        ongsCount: monthTransfers.length,
        compatibility: Math.round((monthTotal / monthRaised) * 100),
      },
    };
  },

  async getRecentTransfers() {
    await delay(600);
    return mockTransfers;
  },

  async getAllocationCriteria() {
    try {
      return await fetchAllocationCriteria();
    } catch {
      await delay(300);
      return [
        {
          key: 'cnpj',
          label: 'CNPJ Ativo e Validado',
          description:
            'Verificação automática junto à API pública de CNPJ. CNPJs com situação ATIVA recebem 50 pontos no score de confiança.',
          weight: 50,
          icon: 'file-check',
        },
        {
          key: 'address',
          label: 'Consistência de Endereço',
          description:
            'O endereço cadastral é cruzado com a base de CEP oficial (ViaCEP/Correios). Endereços consistentes recebem 25 pontos adicionais.',
          weight: 25,
          icon: 'map-pin',
        },
        {
          key: 'years',
          label: 'Tempo de Atividade (> 5 anos)',
          description:
            'ONGs com mais de 5 anos de operação comprovada pela data de abertura do CNPJ recebem 25 pontos adicionais, totalizando até 100 pontos.',
          weight: 25,
          icon: 'clock',
        },
      ];
    }
  },
};
