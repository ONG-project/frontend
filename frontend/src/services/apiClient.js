const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

async function parseResponse(res) {
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(text || 'Resposta inválida da API');
  }
  if (!res.ok) {
    const message = data?.error || data?.detail || `Erro ${res.status} na API`;
    throw new Error(message);
  }
  return data;
}

export async function apiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  return parseResponse(res);
}

export async function apiPost(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}
