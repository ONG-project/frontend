import {
  URGENCY_STATUS,
  PUBLIC_URGENCY_STATUSES,
} from '../data/urgencyConstants';

const STORAGE_KEY = '@ongplus:urgency_requests';

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(requests) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

function generateProtocol() {
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `#UR-${Date.now().toString().slice(-4)}-${suffix}`;
}

function seedIfEmpty() {
  return loadAll();
}

export function listUrgencyRequests() {
  return seedIfEmpty();
}

export function getRequestsByNgo(ngoId) {
  return listUrgencyRequests().filter((r) => String(r.ngoId) === String(ngoId));
}

export function getRequestById(id) {
  return listUrgencyRequests().find((r) => r.id === id) ?? null;
}

export function getPublicRequestsByNgo(ngoId) {
  return getRequestsByNgo(ngoId).filter(
    (r) => r.isPublic && PUBLIC_URGENCY_STATUSES.includes(r.status)
  );
}

export function getAllPublicRequests() {
  return listUrgencyRequests().filter(
    (r) => r.isPublic && PUBLIC_URGENCY_STATUSES.includes(r.status)
  );
}

export function upsertUrgencyRequest({ ngoId, ngoName, payload, status, existingId }) {
  const all = listUrgencyRequests();
  const now = new Date().toISOString();
  const isPublic = PUBLIC_URGENCY_STATUSES.includes(status);

  if (existingId) {
    const idx = all.findIndex((r) => r.id === existingId);
    if (idx === -1) return null;
    const updated = {
      ...all[idx],
      ...payload,
      status,
      isPublic,
      ngoId,
      ngoName,
      updatedAt: now,
      submittedAt:
        status === URGENCY_STATUS.SENT && !all[idx].submittedAt ? now : all[idx].submittedAt,
    };
    all[idx] = updated;
    saveAll(all);
    return updated;
  }

  const created = {
    id: `urg-${Date.now()}`,
    protocol: generateProtocol(),
    ngoId,
    ngoName,
    status,
    isPublic,
    createdAt: now,
    updatedAt: now,
    submittedAt: status === URGENCY_STATUS.SENT ? now : null,
    ...payload,
  };
  all.push(created);
  saveAll(all);
  return created;
}

export function saveDraft(ngoId, ngoName, formData, existingId) {
  return upsertUrgencyRequest({
    ngoId,
    ngoName,
    existingId,
    status: URGENCY_STATUS.DRAFT,
    payload: formData,
  });
}

export function submitUrgencyRequest(ngoId, ngoName, formData, existingId) {
  return upsertUrgencyRequest({
    ngoId,
    ngoName,
    existingId,
    status: URGENCY_STATUS.SENT,
    payload: formData,
  });
}

export { URGENCY_STATUS, generateProtocol };
