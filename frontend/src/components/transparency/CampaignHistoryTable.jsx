import React from 'react';

export default function CampaignHistoryTable({ campaigns }) {
  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] text-center">
        <h3 className="text-xl font-extrabold text-[#0A3D36] tracking-tight mb-2">Histórico de Campanhas</h3>
        <p className="text-gray-500 text-sm">Nenhuma campanha registrada.</p>
      </div>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Ativa</span>;
      case 'closed':
        return <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Encerrada</span>;
      case 'cancelled':
        return <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Cancelada</span>;
      default:
        return <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-[#0A3D36] tracking-tight">Histórico de Campanhas</h3>
        <p className="text-sm text-gray-500 mt-1">Visão geral das iniciativas e resultados alcançados.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 bg-[#FAF8F5] rounded-t-xl">
              <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest rounded-tl-xl">Nome</th>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Início / Fim</th>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Meta</th>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Arrecadado</th>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center rounded-tr-xl">Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((camp) => {
              const start = new Date(camp.startDate).toLocaleDateString('pt-BR');
              const end = new Date(camp.endDate).toLocaleDateString('pt-BR');
              
              return (
                <tr key={camp.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                  <td className="py-5 px-6 font-bold text-gray-900 text-sm">{camp.title}</td>
                  <td className="py-5 px-6 text-gray-500 text-xs font-medium">
                    {start} <span className="text-gray-300 mx-1">-</span> {end}
                  </td>
                  <td className="py-5 px-6 text-gray-600 text-sm font-semibold text-right">{formatCurrency(camp.goal)}</td>
                  <td className="py-5 px-6 font-bold text-teal-700 text-sm text-right">{formatCurrency(camp.raisedAmount)}</td>
                  <td className="py-5 px-6 text-center">
                    {getStatusBadge(camp.status)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
