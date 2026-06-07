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
};
