// mock data for the transparency module

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockNgo = {
  id: 1,
  name: 'Instituto Terra Viva',
  logo: 'https://via.placeholder.com/150',
  description: 'Acreditamos na regeneração ambiental e social através de práticas sustentáveis e educação comunitária.',
  cnpj: '12.345.678/0001-90',
  cause: 'Meio Ambiente',
  city: 'São Paulo',
  state: 'SP',
  website: 'www.terraviva.org.br',
  socialLinks: { instagram: '@terraviva', facebook: '/terraviva' },
  yearsOperating: 16,
};

const mockVerification = {
  status: 'verified', // 'verified', 'analysis', 'pending', 'inconsistent'
  verifiedAt: '2023-12-15T00:00:00.000Z',
  lastUpdate: '2024-05-10T00:00:00.000Z',
  evidenceList: [
    { label: 'CNPJ validado', status: 'success' },
    { label: 'Dados conferidos em API pública (Receita)', status: 'success' },
    { label: 'Documentação aprovada', status: 'success' },
    { label: 'Relatório atualizado', status: 'success' },
  ],
  consistencyStatus: 'consistent', // 'consistent', 'warning', 'inconsistent'
};

const mockFinancial = {
  currentGoal: 50000,
  raisedAmount: 35000,
  donorsCount: 320,
};

const mockCampaigns = [
  { id: 1, title: 'Reflorestamento Urbano 2024', startDate: '2024-01-10', endDate: '2024-06-30', goal: 20000, raisedAmount: 18500, status: 'active' },
  { id: 2, title: 'Hortas Comunitárias', startDate: '2023-08-01', endDate: '2023-12-20', goal: 15000, raisedAmount: 15500, status: 'closed' },
  { id: 3, title: 'Educação Ambiental nas Escolas', startDate: '2024-03-01', endDate: '2024-11-30', goal: 30000, raisedAmount: 10000, status: 'active' },
];

const mockChangeHistory = [
  { id: 1, field: 'Endereço', oldValue: 'Rua das Flores, 123', newValue: 'Av. Paulista, 1000', changedAt: '2024-02-15T14:30:00.000Z', changedBy: 'Admin' },
  { id: 2, field: 'Telefone', oldValue: '(11) 98765-4321', newValue: '(11) 91234-5678', changedAt: '2023-11-05T09:15:00.000Z', changedBy: 'ONG' },
];

const mockPendingRequests = [
  { id: 1, field: 'Descrição', oldValue: 'Texto antigo...', newValue: 'Novo texto atualizado...', justification: 'Mudamos nosso foco de atuação.', status: 'pending', createdAt: '2024-06-01T10:00:00.000Z' }
];

export const transparencyService = {
  async getNGOProfile(id) {
    await delay(500);
    return { ...mockNgo, id: Number(id) };
  },

  async getVerificationData(id) {
    await delay(500);
    return { ...mockVerification };
  },

  async getFinancialData(id) {
    await delay(500);
    return { ...mockFinancial };
  },

  async getCampaignHistory(id) {
    await delay(500);
    return [...mockCampaigns];
  },

  async getChangeHistory(id) {
    await delay(500);
    return [...mockChangeHistory];
  },

  async getPendingRequests(id) {
    await delay(500);
    return [...mockPendingRequests];
  },

  async submitChangeRequest(data) {
    await delay(800);
    console.log('Change request submitted:', data);
    return { success: true };
  },

  async approveChangeRequest(id) {
    await delay(800);
    console.log('Change request approved:', id);
    return { success: true };
  },

  async rejectChangeRequest(id) {
    await delay(800);
    console.log('Change request rejected:', id);
    return { success: true };
  }
};
