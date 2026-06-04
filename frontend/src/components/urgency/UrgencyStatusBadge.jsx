import { URGENCY_STATUS_LABELS } from '../../data/urgencyConstants';

const STATUS_STYLES = {
  rascunho: 'bg-gray-100 text-gray-600',
  enviada: 'bg-blue-50 text-blue-800',
  em_analise: 'bg-amber-50 text-amber-800',
  aprovada: 'bg-[#CBDDCD] text-[#0A3D36]',
  recusada: 'bg-red-50 text-red-700',
  concluida: 'bg-[#E4F2EE] text-[#0A665C]',
};

export default function UrgencyStatusBadge({ status, className = '' }) {
  const label = URGENCY_STATUS_LABELS[status] ?? status;
  const style = STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600';

  return (
    <span
      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${style} ${className}`}
    >
      ● {label}
    </span>
  );
}
