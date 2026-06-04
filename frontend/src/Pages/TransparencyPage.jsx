import { Banknote, HandCoins, Building2, FileText, ShieldCheck, ChevronDown } from 'lucide-react';
import imagemGenerica from '../assets/imagem_generica.jpg';
import Footer from '../components/Footer';
import UrgencyPublicSection from '../components/urgency/UrgencyPublicSection';



const ImpactOverview = () => (
  <section className="bg-[#F9FAF9] rounded-[2.5rem] p-8 md:p-12 mb-16">
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Visão Geral de Impacto</h2>
        <p className="text-gray-500 text-sm">Métricas consolidadas de arrecadação e destinação de recursos.</p>
      </div>
      <div className="mt-4 md:mt-0">
        <button className="flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-5 py-2 text-sm font-bold text-teal-800 hover:bg-gray-50 transition shadow-sm">
          <span>Ano de 2023</span>
          <ChevronDown className="w-4 h-4 text-teal-800" />
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mb-4">
          <Banknote className="w-5 h-5 text-teal-600" />
        </div>
        <p className="text-[0.65rem] font-bold text-gray-500 tracking-wider mb-1 uppercase">Valor Arrecadado</p>
        <p className="text-2xl md:text-3xl font-extrabold text-teal-900">R$ 1.250.000,00</p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <HandCoins className="w-5 h-5 text-green-600" />
        </div>
        <p className="text-[0.65rem] font-bold text-gray-500 tracking-wider mb-1 uppercase">Valor Utilizado</p>
        <p className="text-2xl md:text-3xl font-extrabold text-gray-800">R$ 980.000,00</p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
          <Building2 className="w-5 h-5 text-blue-600" />
        </div>
        <p className="text-[0.65rem] font-bold text-gray-500 tracking-wider mb-1 uppercase">ONGs Ajudadas</p>
        <p className="text-2xl md:text-3xl font-extrabold text-gray-800">42 organizações</p>
      </div>
    </div>
  </section>
);

const TransactionsTable = () => {
  const rows = [
    {
      ong: 'Instituto Rebrota',
      valor: 'R$ 45.000,00',
      data: '14 Nov 2023',
      motivo: 'Reflorestação Urbana e Hortas Comunitárias',
      docType: 'receipt',
    },
    {
      ong: 'Mãos Que Alimentam',
      valor: 'R$ 120.000,00',
      data: '02 Nov 2023',
      motivo: 'Cozinhas Solidárias e Combate à Fome',
      docType: 'audit',
    },
    {
      ong: 'SOS Mata Viva',
      valor: 'R$ 82.500,00',
      data: '28 Out 2023',
      motivo: 'Preservação da Fauna em Áreas de Risco',
      docType: 'receipt',
    },
    {
      ong: 'Futuro Digital',
      valor: 'R$ 35.000,00',
      data: '15 Out 2023',
      motivo: 'Inclusão Digital para Jovens de Periferia',
      docType: 'receipt',
    },
  ];

  return (
    <section className="mb-20">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Transparência de Movimentações</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 bg-[#FCFBF9] rounded-t-xl">
              <th className="py-4 px-6 text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider rounded-tl-xl">ONG Beneficiada</th>
              <th className="py-4 px-6 text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Valor Repassado</th>
              <th className="py-4 px-6 text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Data da Operação</th>
              <th className="py-4 px-6 text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Motivo / Causa</th>
              <th className="py-4 px-6 text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider rounded-tr-xl">Documentos</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                <td className="py-5 px-6 font-bold text-gray-900 text-sm">{row.ong}</td>
                <td className="py-5 px-6 font-bold text-teal-700 text-sm">{row.valor}</td>
                <td className="py-5 px-6 text-gray-600 text-sm">{row.data}</td>
                <td className="py-5 px-6 text-gray-600 text-sm">{row.motivo}</td>
                <td className="py-5 px-6">
                  {row.docType === 'receipt' ? (
                    <a href="#" className="flex items-center space-x-1.5 text-teal-700 hover:text-teal-900 font-bold text-xs transition">
                      <FileText className="w-4 h-4" />
                      <span>Ver Recibo</span>
                    </a>
                  ) : (
                    <a href="#" className="flex items-center space-x-1.5 text-teal-700 hover:text-teal-900 font-bold text-xs transition">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Auditoria</span>
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8">
        <button className="border-2 border-teal-100 text-teal-700 font-bold text-sm px-6 py-2.5 rounded-full hover:bg-teal-50 transition">
          Carregar mais movimentações
        </button>
      </div>
    </section>
  );
};

const EmergencyFund = () => (
  <section className="bg-[#F5F9F8] rounded-[2.5rem] p-8 md:p-12 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    <div className="relative">
      {/* Placeholder for the graphic */}
      <img
        src={imagemGenerica}
        alt="Emergency Fund Graphic"
        className="w-full aspect-[4/3] object-cover rounded-[2rem] shadow-sm"
      />
      {/* We add an overlay just to simulate the SURPORT SAFE look if we want, but the generic image is fine */}
      <div className="absolute inset-0 bg-teal-900/40 rounded-[2rem] flex flex-col items-center justify-center text-white">
        <p className="text-3xl font-extrabold tracking-widest uppercase mb-2">Support</p>
        <p className="text-4xl font-extrabold tracking-widest uppercase text-teal-200">Safe</p>
      </div>
    </div>

    <div className="space-y-6">
      <div className="bg-teal-100 text-teal-800 text-[0.65rem] font-bold px-3 py-1 rounded-full w-max uppercase tracking-wider">
        Resiliência Coletiva
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-teal-900 leading-tight">
        Fundo de Reserva Emergencial
      </h2>
      <p className="text-gray-600 text-sm leading-relaxed max-w-md">
        A continuidade de nosso suporte não pode ser interrompida. Por isso, mantemos um <span className="font-bold">Fundo de Reserva Emergencial</span> robusto, destinado exclusivamente a situações extraordinárias.
      </p>

      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-600 font-medium leading-relaxed">
            Pronto atendimento para desastres naturais e crises humanitárias repentinas.
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-600 font-medium leading-relaxed">
            Garante o funcionamento operacional das ONGs parceiras mesmo em quedas sazonais de arrecadação.
          </p>
        </div>
      </div>

      <div>
        <button className="bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm px-8 py-3.5 rounded-full transition shadow-md">
          Saber mais sobre o fundo
        </button>
      </div>
    </div>
  </section>
);


export default function TransparencyPage({ onNavigate }) {
  return (
    <>
      <main className="flex-grow max-w-[1000px] mx-auto w-full px-6 pt-16 md:pt-24">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-teal-800 leading-[1.1] tracking-tight mb-6">
            Nossa Transparência é<br />Radical.
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Acreditamos que a confiança é o alicerce de qualquer mudança social. Aqui, você acompanha cada centavo investido e o impacto gerado em tempo real.
          </p>
        </div>

        <ImpactOverview />
        <TransactionsTable />

        <div className="mb-20">
          <UrgencyPublicSection
            title="Urgências Públicas na Plataforma"
            description="Pedidos de apoio emergencial aprovados pelas ONGs parceiras, visíveis para doadores e auditores."
          />
        </div>

        <EmergencyFund />
      </main>

      <Footer onNavigate={onNavigate} />
    </>
  );
}
