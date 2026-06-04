import { AlertTriangle, Users, MapPin, Calendar } from 'lucide-react';
import { CRISIS_TYPES } from '../../data/urgencyConstants';
import UrgencyStatusBadge from './UrgencyStatusBadge';

export default function UrgencyPublicCard({ request, compact = false }) {
  const crisisLabel = CRISIS_TYPES[request.crisis]?.label ?? 'Emergência';
  const amount = request.financial?.amount
    ? parseFloat(request.financial.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    : '—';

  if (compact) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            {request.protocol}
          </span>
          <UrgencyStatusBadge status={request.status} />
        </div>
        <h4 className="font-bold text-gray-900 text-sm">{crisisLabel}</h4>
        <p className="text-xs text-gray-500 line-clamp-2">{request.impact?.riskSummary}</p>
        <div className="flex justify-between text-xs font-bold text-[#0A665C]">
          <span>{amount}</span>
          <span className="text-gray-400 font-semibold">{request.ngoName}</span>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-[1.5rem] border border-gray-100 p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {request.protocol}
            </p>
            <h3 className="font-bold text-[#0A3D36] text-base">{crisisLabel}</h3>
          </div>
        </div>
        <UrgencyStatusBadge status={request.status} />
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{request.impact?.riskSummary}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-gray-500">
          <Users className="w-3.5 h-3.5 shrink-0" />
          <span>
            <strong className="text-gray-800">{request.impact?.population || '—'}</strong> afetados
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>
            <strong className="text-gray-800">{request.impact?.territory || '—'}</strong> km²
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 col-span-2 sm:col-span-1">
          <span className="font-bold text-[#0A665C] text-sm">{amount}</span>
        </div>
        {request.financial?.deadline && (
          <div className="flex items-center gap-1.5 text-gray-500 col-span-2 sm:col-span-1">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>Prazo: {new Date(request.financial.deadline).toLocaleDateString('pt-BR')}</span>
          </div>
        )}
      </div>

      {request.financial?.usePlan && (
        <div className="bg-[#FAF8F5] rounded-xl p-4 border border-gray-50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            Plano de uso
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">{request.financial.usePlan}</p>
        </div>
      )}
    </article>
  );
}
