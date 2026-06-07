const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

function getAuthHeaders(customHeaders = {}) {
  const token = localStorage.getItem('@ongplus:token');
  const headers = { 'Content-Type': 'application/json', ...customHeaders };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function parseResponse(res) {
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(text || 'Resposta inválida da API');
  }
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('@ongplus:token');
      localStorage.removeItem('@ongplus:refresh_token');
      localStorage.removeItem('@ongplus:user');
    }
    const message = data?.error || data?.detail || `Erro ${res.status} na API`;
    throw new Error(message);
  }
  return data;
}

export async function apiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: getAuthHeaders(),
  });
  return parseResponse(res);
}

export async function apiPost(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}

export async function apiPut(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}

export async function apiPatch(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}
