import React, { useState } from 'react';
import { PlusCircle, FileText, Eye, Pencil } from 'lucide-react';
import { getRequestsByNgo } from '../../services/urgencyRequestService';
import { URGENCY_STATUS, URGENCY_STATUS_LABELS } from '../../data/urgencyConstants';
import { CRISIS_TYPES } from '../../data/urgencyConstants';
import UrgencyStatusBadge from './UrgencyStatusBadge';

const FILTER_OPTIONS = [
  { id: 'ativas', label: 'Ativas', statuses: [URGENCY_STATUS.SENT, URGENCY_STATUS.IN_REVIEW, URGENCY_STATUS.APPROVED] },
  { id: 'rascunhos', label: 'Rascunhos', statuses: [URGENCY_STATUS.DRAFT] },
  { id: 'historico', label: 'Histórico', statuses: [URGENCY_STATUS.REJECTED, URGENCY_STATUS.COMPLETED] },
  { id: 'todas', label: 'Todas', statuses: null },
];

export default function UrgencyRequestsDashboard({ ngoId, onCreateNew, onEditRequest, onViewRequest }) {
  const all = getRequestsByNgo(ngoId);
  const [filter, setFilter] = useState('ativas');

  const activeFilter = FILTER_OPTIONS.find((f) => f.id === filter);
  const filtered = activeFilter?.statuses
    ? all.filter((r) => activeFilter.statuses.includes(r.status))
    : all;

  const stats = {
    ativas: all.filter((r) =>
      [URGENCY_STATUS.SENT, URGENCY_STATUS.IN_REVIEW, URGENCY_STATUS.APPROVED].includes(r.status)
    ).length,
    rascunhos: all.filter((r) => r.status === URGENCY_STATUS.DRAFT).length,
    publicas: all.filter((r) => r.isPublic).length,
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0A3D36]">Solicitações de Urgência</h2>
          <p className="text-gray-500 text-xs mt-1.5 max-w-xl">
            Acompanhe pedidos de apoio emergencial, rascunhos e status de análise do conselho administrativo.
          </p>
        </div>
        <button
          type="button"
          onClick={onCreateNew}
          className="bg-[#0A665C] hover:bg-[#08524a] text-white font-bold px-6 py-3 rounded-full flex items-center space-x-2 text-sm shadow-md transition-colors cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4.5 h-4.5" />
          <span>Nova Solicitação</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Solicitações ativas', value: stats.ativas },
          { label: 'Rascunhos', value: stats.rascunhos },
          { label: 'Públicas (aprovadas/concluídas)', value: stats.publicas },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="text-3xl font-extrabold text-[#0A665C] mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setFilter(opt.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
              filter === opt.id
                ? 'bg-[#0A665C] text-white'
                : 'bg-[#EAE8E3]/60 text-gray-600 hover:bg-[#EAE8E3]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
          <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-bold text-gray-700">Nenhuma solicitação neste filtro</p>
          <p className="text-xs text-gray-500 mt-1 mb-4">
            Crie uma nova solicitação ou altere o filtro para ver outros registros.
          </p>
          <button
            type="button"
            onClick={onCreateNew}
            className="text-[#0A665C] text-xs font-bold hover:underline"
          >
            Iniciar solicitação de urgência
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold text-[10px] uppercase tracking-wider bg-gray-50/50">
                  <th className="py-4 px-6">Protocolo</th>
                  <th className="py-4 px-6">Crise</th>
                  <th className="py-4 px-6">Valor</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Atualização</th>
                  <th className="py-4 px-6 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filtered.map((req) => {
                  const amount = req.financial?.amount
                    ? `R$ ${parseFloat(req.financial.amount).toLocaleString('pt-BR')}`
                    : '—';
                  const updated = req.updatedAt
                    ? new Date(req.updatedAt).toLocaleDateString('pt-BR')
                    : '—';
                  return (
                    <tr key={req.id}>
                      <td className="py-4 px-6 font-bold text-gray-900">{req.protocol}</td>
                      <td className="py-4 px-6 text-gray-600">
                        {CRISIS_TYPES[req.crisis]?.label ?? '—'}
                      </td>
                      <td className="py-4 px-6 font-bold text-[#0A665C]">{amount}</td>
                      <td className="py-4 px-6">
                        <UrgencyStatusBadge status={req.status} />
                        {req.isPublic && (
                          <span className="block text-[9px] text-teal-600 font-bold mt-1 uppercase">
                            Visível publicamente
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-gray-500">{updated}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => onViewRequest(req.id)}
                            className="p-2 text-[#0A665C] hover:bg-[#EAE8E3] rounded-lg transition cursor-pointer"
                            title="Visualizar"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {req.status === URGENCY_STATUS.DRAFT && (
                            <button
                              type="button"
                              onClick={() => onEditRequest(req.id)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition cursor-pointer"
                              title="Continuar rascunho"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-[10px] text-gray-400">
        Status possíveis:{' '}
        {Object.values(URGENCY_STATUS_LABELS).join(', ')}. Dados mockados em localStorage até integração com API.
      </p>
    </div>
  );
}