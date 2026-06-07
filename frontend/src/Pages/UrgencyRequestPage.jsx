import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UrgencyRequestWizard from '../components/urgency/UrgencyRequestWizard';

const DEFAULT_NGO = { id: 1, name: 'Instituto Rebrota' };

export default function UrgencyRequestPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const ngoId = user?.ngoId ?? DEFAULT_NGO.id;
  const ngoName = user?.ngoName ?? DEFAULT_NGO.name;

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans">
      <main className="w-full max-w-5xl mx-auto py-12 px-6 md:px-10">
        <h1 className="text-4xl font-bold text-[#0A3D36] mb-1">Solicitação de Urgência</h1>
        <h2 className="text-2xl text-gray-800 font-medium mb-6">Protocolo de Alívio Financeiro</h2>
        <p className="text-[#646A63] text-sm leading-relaxed mb-10 max-w-3xl">
          Formulário oficial para requisição de fundos de contingência. O preenchimento detalhado é
          obrigatório para avaliação acelerada pelo conselho diretor.
        </p>

        <UrgencyRequestWizard
          ngoId={ngoId}
          ngoName={ngoName}
          onComplete={() => navigate('/gestao-ong?tab=urgencia')}
          onCancel={() => navigate('/gestao-ong?tab=urgencia')}
        />
      </main>
    </div>
  );
}
