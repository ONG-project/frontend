import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UrgencyRequestWizard from '../components/urgency/UrgencyRequestWizard';

export default function UrgencyRequestPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const ngoId = user?.ngoId;
  const ngoName = user?.ngoName || user?.name || 'Sua ONG';

  if (!ngoId) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] font-sans flex items-center justify-center px-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 max-w-md text-center shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">ONG não vinculada</h2>
          <p className="text-gray-500 text-sm mb-6">
            Sua conta de gestão ainda não está associada a uma ONG na plataforma.
          </p>
          <button
            type="button"
            onClick={() => navigate('/gestao-ong')}
            className="bg-[#0A665C] text-white font-bold px-6 py-2.5 rounded-full text-sm"
          >
            Ir para Gestão
          </button>
        </div>
      </div>
    );
  }

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
