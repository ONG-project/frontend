import { apiGet, apiPost } from './apiClient';
import { ngoService } from './ngoService';

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

  async getFinancialData(id) {
    return apiGet(`/v1/transparency/ngos/${id}/financial-data/`);
  },

  async getCampaignHistory(id) {
    return ngoService.getNgoCampaigns(id);
  },

  async getChangeHistory(id) {
    return apiGet(`/v1/transparency/ngos/${id}/change-history/`);
  },

  async getPendingRequests(id) {
    return apiGet(`/v1/transparency/ngos/${id}/pending-requests/`);
  },

  async submitChangeRequest(ongId, data) {
    return apiPost(`/v1/transparency/ngos/${ongId}/requests/`, data);
  },

  async approveChangeRequest(id) {
    return apiPost(`/v1/transparency/requests/${id}/approve/`, {});
  },

  async rejectChangeRequest(id) {
    return apiPost(`/v1/transparency/requests/${id}/reject/`, {});
  },
};

export async function getAllocationCriteria() {
  return apiGet('/v1/transparency/allocation-criteria/');
}
