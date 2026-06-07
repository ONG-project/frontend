import { apiGet } from './apiClient';
import { ngoService } from './ngoService';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    return {};
  },

  async getCampaignHistory(id) {
    return ngoService.getNgoCampaigns(id);
  },

  async getChangeHistory() {
    return [];
  },

  async getPendingRequests() {
    return [];
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
