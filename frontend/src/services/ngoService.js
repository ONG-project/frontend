import { apiGet, apiPost } from './apiClient';

export const ngoService = {
  async list() {
    return apiGet('/v1/ngos/');
  },

  async getById(id) {
    return apiGet(`/v1/ngos/${id}/`);
  },

  async getVerification(id) {
    return apiGet(`/v1/ngos/${id}/verification/`);
  },

  async validateCnpj(cnpj) {
    return apiPost('/ong-validation/', { cnpj });
  },

  async listCampaigns() {
    return apiGet('/v1/campaigns/');
  },

  async listBundles() {
    return apiGet('/v1/bundles/');
  },

  async getBundleById(id) {
    return apiGet(`/v1/bundles/${id}/`);
  },
};
