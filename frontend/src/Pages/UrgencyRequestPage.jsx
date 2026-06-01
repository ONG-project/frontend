import React, { useState } from 'react';
import { 
  Wind, 
  TrendingDown, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function UrgencyRequestPage() {
  const [selectedCrisis, setSelectedCrisis] = useState('natural'); // 'natural', 'economic', 'political'
  
  // Form states
  const [affectedPopulation, setAffectedPopulation] = useState('');
  const [territorialExtension, setTerritorialExtension] = useState('');
  const [operationalRiskSummary, setOperationalRiskSummary] = useState('');

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans">
      {/* Main Content Area */}
      <main className="w-full max-w-5xl mx-auto py-12 px-6 md:px-10">
        {/* Status Badge & Protocol ID */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="bg-[#CBDDCD] text-[#0A3D36] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ● Em Preenchimento
          </span>
          <span className="text-sm font-semibold text-gray-500">
            Protocolo #UR-8924-BR
          </span>
        </div>

        {/* Header Titles */}
        <h1 className="text-4xl font-bold text-[#0A3D36] mb-1">
          Solicitação de Urgência
        </h1>
        <h2 className="text-2xl text-gray-800 font-medium mb-6">
          Protocolo de Alívio Financeiro
        </h2>
        <p className="text-[#646A63] text-sm leading-relaxed mb-10 max-w-3xl">
          Formulário oficial para requisição de fundos de contingência. O preenchimento detalhado e a precisão dos dados são obrigatórios para a avaliação acelerada pelo conselho diretor.
        </p>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          {/* Section 1: Natureza da Crise */}
          <div className="bg-[#FAF8F5] border border-[#E5E2D9]/80 rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#0A3D36]">1. Natureza da Crise</h3>
              <p className="text-xs text-gray-500 mt-1">Classifique o evento primário que motiva esta solicitação de fundos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Desastre Natural */}
              <div 
                onClick={() => setSelectedCrisis('natural')}
                className={`cursor-pointer bg-white p-6 rounded-xl border transition-all flex flex-col justify-between h-48 relative ${
                  selectedCrisis === 'natural'
                    ? 'border-[#0A3D36] shadow-md ring-1 ring-[#0A3D36]'
                    : 'border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start">
                  <Wind className={`w-6 h-6 ${selectedCrisis === 'natural' ? 'text-[#0A3D36]' : 'text-gray-500'}`} />
                  <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                    selectedCrisis === 'natural' 
                      ? 'border-[#0A3D36] bg-[#0A3D36]' 
                      : 'border-gray-300 bg-white'
                  }`}>
                    {selectedCrisis === 'natural' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-bold text-gray-900 text-sm mb-1.5">Desastre Natural</h4>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Eventos climáticos extremos, tremores sísmicos ou falhas geológicas.
                  </p>
                </div>
              </div>

              {/* Card 2: Crise Econômica */}
              <div 
                onClick={() => setSelectedCrisis('economic')}
                className={`cursor-pointer bg-white p-6 rounded-xl border transition-all flex flex-col justify-between h-48 relative ${
                  selectedCrisis === 'economic'
                    ? 'border-[#0A3D36] shadow-md ring-1 ring-[#0A3D36]'
                    : 'border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start">
                  <TrendingDown className={`w-6 h-6 ${selectedCrisis === 'economic' ? 'text-[#0A3D36]' : 'text-gray-500'}`} />
                  <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                    selectedCrisis === 'economic' 
                      ? 'border-[#0A3D36] bg-[#0A3D36]' 
                      : 'border-gray-300 bg-white'
                  }`}>
                    {selectedCrisis === 'economic' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-bold text-gray-900 text-sm mb-1.5">Crise Econômica</h4>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Colapso de infraestrutura financeira local ou inflação hiper-acelerada.
                  </p>
                </div>
              </div>

              {/* Card 3: Instabilidade Política */}
              <div 
                onClick={() => setSelectedCrisis('political')}
                className={`cursor-pointer bg-white p-6 rounded-xl border transition-all flex flex-col justify-between h-48 relative ${
                  selectedCrisis === 'political'
                    ? 'border-[#0A3D36] shadow-md ring-1 ring-[#0A3D36]'
                    : 'border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start">
                  <ShieldAlert className={`w-6 h-6 ${selectedCrisis === 'political' ? 'text-[#0A3D36]' : 'text-gray-500'}`} />
                  <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                    selectedCrisis === 'political' 
                      ? 'border-[#0A3D36] bg-[#0A3D36]' 
                      : 'border-gray-300 bg-white'
                  }`}>
                    {selectedCrisis === 'political' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-bold text-gray-900 text-sm mb-1.5">Instabilidade Política</h4>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Conflitos civis, deslocamento forçado ou falha de governança.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Avaliação de Impacto */}
          <div className="bg-[#FAF8F5] border border-[#E5E2D9]/80 rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#0A3D36]">2. Avaliação de Impacto</h3>
              <p className="text-xs text-gray-500 mt-1">Métricas quantificáveis da população e território afetados.</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* População diretamente afetada */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                    População Diretamente Afetada
                  </label>
                  <input
                    type="text"
                    value={affectedPopulation}
                    onChange={(e) => setAffectedPopulation(e.target.value)}
                    placeholder="Ex: 15000"
                    className="w-full bg-[#EAE8E3] text-gray-800 placeholder-gray-500 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] transition text-sm"
                  />
                </div>

                {/* Extensão territorial */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                    Extensão Territorial (KM²)
                  </label>
                  <input
                    type="text"
                    value={territorialExtension}
                    onChange={(e) => setTerritorialExtension(e.target.value)}
                    placeholder="Ex: 450"
                    className="w-full bg-[#EAE8E3] text-gray-800 placeholder-gray-500 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] transition text-sm"
                  />
                </div>
              </div>

              {/* Resumo do risco operacional atual */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Resumo do Risco Operacional Atual
                </label>
                <textarea
                  value={operationalRiskSummary}
                  onChange={(e) => setOperationalRiskSummary(e.target.value)}
                  placeholder="Descreva os gargalos imediatos na entrega de assistência e riscos à segurança da equipe no local..."
                  rows={4}
                  className="w-full bg-[#EAE8E3] text-gray-800 placeholder-gray-500 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D36] transition text-sm resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-6 pt-4">
            <button 
              type="button" 
              className="text-[#0A3D36] font-semibold text-sm hover:underline hover:text-[#005e54] transition-colors"
            >
              Salvar Rascunho
            </button>
            <button 
              type="submit" 
              className="flex items-center space-x-2 bg-[#0A665C] hover:bg-[#08524a] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-colors shadow-md cursor-pointer"
            >
              <span>Continuar para Requisitos Financeiros</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </main>

    </div>
  );
}
