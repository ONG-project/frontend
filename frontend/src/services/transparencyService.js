import { apiGet } from './apiClient';
import { ngoService } from './ngoService';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  { id: 1, field: 'Descrição', oldValue: 'Texto antigo...', newValue: 'Novo texto atualizado...', justification: 'Mudamos nosso foco de atuação.', status: 'pending', createdAt: '2024-06-01T10:00:00.000Z' },
];

function mapProfile(detail) {
  return {
    id: detail.id,
    name: detail.name,
    logo: detail.logo || '',
    description: detail.description,
    cnpj: detail.cnpj,
    cause: detail.causeLabel || detail.cause,
    city: detail.city,
    state: detail.state,
    location: detail.location,
    website: detail.website || '',
    socialLinks: detail.socialLinks || {},
    yearsOperating: detail.yearsOperating,
    score: detail.score,
    verified: detail.verified,
    lastUpdated: detail.lastUpdated,
  };
}

export const transparencyService = {
  async getNGOProfile(id) {
    const detail = await ngoService.getById(id);
    return mapProfile(detail);
  },

  async getVerificationData(id) {
    return ngoService.getVerification(id);
  },

  async getFinancialData() {
    await delay(300);
    return { ...mockFinancial };
  },

  async getCampaignHistory() {
    await delay(300);
    return [...mockCampaigns];
  },

  async getChangeHistory() {
    await delay(300);
    return [...mockChangeHistory];
  },

  async getPendingRequests() {
    await delay(300);
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
  },
};

export async function getAllocationCriteria() {
  return apiGet('/v1/transparency/allocation-criteria/');
}
