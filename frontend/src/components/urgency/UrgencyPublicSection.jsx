import { AlertTriangle } from 'lucide-react';
import { getPublicRequestsByNgo, getAllPublicRequests } from '../../services/urgencyRequestService';
import UrgencyPublicCard from './UrgencyPublicCard';

export default function UrgencyPublicSection({ ngoId = null, title, description }) {
  const requests = ngoId != null ? getPublicRequestsByNgo(ngoId) : getAllPublicRequests();

  if (requests.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[#0A3D36] tracking-tight">
            {title ?? 'Apoio Emergencial'}
          </h2>
          <p className="text-gray-500 text-sm mt-1 max-w-2xl">
            {description ??
              'Solicitações de urgência aprovadas e publicadas pela plataforma, com transparência sobre a crise e o uso dos recursos.'}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requests.map((req) => (
          <UrgencyPublicCard key={req.id} request={req} />
        ))}
      </div>
    </section>
  );
}
