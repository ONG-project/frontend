import React, { useState } from 'react';
import { 
  Heart, 
  Network, 
  Download, 
  Globe, 
  BookOpen, 
  AlertTriangle, 
  Wind, 
  Plus, 
  ArrowRight,
  Check
} from 'lucide-react';
import Footer from '../components/Footer';

export default function DonorProfilePage({ onNavigate }) {
  const [downloadingId, setDownloadingId] = useState(null);
  const [causes, setCauses] = useState([
    { id: 'env', label: 'Environment', active: true, icon: Globe, bg: 'bg-teal-800 text-white', iconColor: 'text-white' },
    { id: 'edu', label: 'Education', active: true, icon: BookOpen, bg: 'bg-[#CBDDCD] text-[#0A3D36]', iconColor: 'text-[#0A3D36]' },
    { id: 'urg', label: 'Urgent Requests', active: true, icon: AlertTriangle, bg: 'bg-red-100 text-red-800', iconColor: 'text-red-600' },
    { id: 'cli', label: 'Climate Action', active: true, icon: Wind, bg: 'bg-slate-700 text-white', iconColor: 'text-white' }
  ]);
  const [showAddCause, setShowAddCause] = useState(false);
  const [newCauseText, setNewCauseText] = useState('');

  const donations = [
    {
      id: 1,
      date: '12 Oct 2024',
      ngo: 'Instituto Rebrota',
      cause: 'Meio Ambiente',
      value: 'R$ 150,00',
      iconBg: 'bg-[#CBDDCD]',
      iconColor: 'text-[#0A3D36]',
      icon: Globe
    },
    {
      id: 2,
      date: '05 Sep 2024',
      ngo: 'Educar para o Futuro',
      cause: 'Educação',
      value: 'R$ 200,00',
      iconBg: 'bg-[#CBD9ED]',
      iconColor: 'text-[#2F6196]',
      icon: BookOpen
    },
    {
      id: 3,
      date: '20 Aug 2024',
      ngo: 'Instituto Rebrota',
      cause: 'Meio Ambiente',
      value: 'R$ 100,00',
      iconBg: 'bg-[#E4F2EE]',
      iconColor: 'text-[#0A665C]',
      icon: Globe
    }
  ];

  const handleDownloadReceipt = (id) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert('Recibo de Impacto baixado com sucesso!');
    }, 1500);
  };

  const handleAddCause = (e) => {
    e.preventDefault();
    if (!newCauseText.trim()) return;
    const newId = `custom-${Date.now()}`;
    setCauses([
      ...causes,
      {
        id: newId,
        label: newCauseText.trim(),
        active: true,
        icon: Globe,
        bg: 'bg-teal-700 text-white',
        iconColor: 'text-white'
      }
    ]);
    setNewCauseText('');
    setShowAddCause(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      <main className="flex-grow max-w-6xl w-full mx-auto px-6 md:px-12 py-10 space-y-12">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar Container */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-36 h-36 rounded-full bg-[#EAE8E3] flex items-center justify-center p-1.5 border border-dashed border-gray-300">
              <div className="w-full h-full rounded-full bg-[#F5F2EC] flex items-center justify-center relative overflow-hidden border-2 border-white shadow-inner">
                {/* SVG Avatar matching the sketch */}
                <svg className="w-24 h-24 text-[#8C8273] opacity-80 mt-4" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 50C58.2843 50 65 43.2843 65 35C65 26.7157 58.2843 20 50 20C41.7157 20 35 26.7157 35 35C35 43.2843 41.7157 50 50 50Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M72 75C72 63.9543 62.1503 55 50 55C37.8497 55 28 63.9543 28 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-gray-300"/>
                </svg>
                {/* Micro Heart Badge on the neck/chest area */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#B55A48] p-1 rounded-full text-white">
                  <Heart className="w-2.5 h-2.5 fill-white" />
                </div>
              </div>
            </div>
            {/* Donor since badge */}
            <span className="mt-3 bg-[#0A3D36] text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              DONOR SINCE 2022
            </span>
          </div>

          {/* User Bio */}
          <div className="text-center md:text-left space-y-4 pt-4 max-w-2xl">
            <h1 className="text-4xl font-extrabold text-[#0A3D36] tracking-tight">
              João Silva
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed font-normal">
              Your contribution has helped restore <span className="text-[#0A665C] font-semibold">15 hectares</span> of forest and supported <span className="text-[#0A665C] font-semibold">3 local NGOs</span>.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Total Donated */}
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100/80 shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[160px] space-y-8">
            <div className="flex items-center space-x-2 text-teal-800">
              <div className="w-10 h-10 rounded-full bg-[#E4F2EE] flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#0A665C] fill-[#0A665C]/10" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                TOTAL DONATED
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#0A3D36] tracking-tight">
                R$ 450,00
              </h2>
            </div>
          </div>

          {/* Card NGOs Supported */}
          <div className="bg-[#F5F2EC] rounded-[2rem] p-8 border border-transparent shadow-[0_4px_25px_rgba(0,0,0,0.005)] flex flex-col justify-between min-h-[160px] space-y-8">
            <div className="flex items-center space-x-2 text-gray-700">
              <div className="w-10 h-10 rounded-full bg-[#EAE8E3] flex items-center justify-center">
                <Network className="w-5 h-5 text-gray-500" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                NGOS SUPPORTED
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#0A3D36] tracking-tight">
                3 Organizations
              </h2>
            </div>
          </div>
        </div>

        {/* Bottom Columns: Donation History & Side widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-12 pt-4">
          
          {/* Donation History */}
          <div className="space-y-6">
            <h3 className="text-xl font-extrabold text-[#0A3D36] tracking-tight">
              Donation History
            </h3>
            
            <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.01)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <th className="py-5 px-6">Date</th>
                      <th className="py-5 px-6">Organization / Cause</th>
                      <th className="py-5 px-6">Value</th>
                      <th className="py-5 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {donations.map((d) => {
                      const IconComponent = d.icon;
                      return (
                        <tr key={d.id} className="text-xs font-semibold text-gray-700 hover:bg-[#FAF8F5]/50 transition">
                          <td className="py-5 px-6 text-gray-400 font-normal">{d.date}</td>
                          <td className="py-5 px-6">
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-full ${d.iconBg} flex items-center justify-center shrink-0`}>
                                <IconComponent className={`w-4 h-4 ${d.iconColor}`} />
                              </div>
                              <span className="font-bold text-gray-900">{d.ngo}</span>
                            </div>
                          </td>
                          <td className="py-5 px-6 text-[#0A665C] font-extrabold">{d.value}</td>
                          <td className="py-5 px-6 text-right">
                            <button
                              onClick={() => handleDownloadReceipt(d.id)}
                              disabled={downloadingId === d.id}
                              className="text-[#0A665C] hover:text-[#08524a] hover:underline transition flex items-center space-x-1.5 ml-auto cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>{downloadingId === d.id ? 'Baixando...' : 'Impact Receipt'}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Side Widgets */}
          <div className="space-y-8">
            
            {/* My Causes */}
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-[#0A3D36] tracking-tight">
                My Causes
              </h3>
              
              <div className="flex flex-wrap gap-2.5">
                {causes.map((cause) => {
                  const Icon = cause.icon;
                  return (
                    <span 
                      key={cause.id}
                      className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-bold shadow-sm transition ${cause.bg}`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${cause.iconColor}`} />
                      <span>{cause.label}</span>
                    </span>
                  );
                })}
                
                {/* Add More button */}
                {!showAddCause ? (
                  <button
                    onClick={() => setShowAddCause(true)}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-bold border border-gray-300 text-gray-500 hover:bg-[#EAE8E3]/60 transition bg-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-gray-400" />
                    <span>Add More</span>
                  </button>
                ) : (
                  <form onSubmit={handleAddCause} className="flex items-center space-x-2 w-full mt-2">
                    <input
                      type="text"
                      placeholder="Nova causa..."
                      value={newCauseText}
                      onChange={(e) => setNewCauseText(e.target.value)}
                      className="bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#0A665C] flex-grow"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-[#0A665C] text-white p-2 rounded-xl hover:bg-teal-800 transition"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddCause(false)}
                      className="text-gray-400 hover:text-gray-600 text-xs px-1"
                    >
                      Cancelar
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Next Steps Recommendation Card */}
            <div className="bg-[#EAF2EE] rounded-[2rem] p-8 border border-transparent shadow-[0_4px_25px_rgba(0,0,0,0.005)] relative overflow-hidden space-y-6">
              {/* Soft decorative background circles */}
              <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#D4E8E1] opacity-60 pointer-events-none" />
              
              <div className="relative space-y-4">
                <h4 className="text-xs font-extrabold text-[#0A3D36] uppercase tracking-widest">
                  Next Steps
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed font-semibold">
                  Based on your interest in Education and Climate Action, we suggest checking out the "Amazonia Digital Literacy" campaign or our current urgent requests.
                </p>
              </div>

              <div className="relative space-y-3 pt-2">
                <button
                  onClick={() => onNavigate && onNavigate('causas')}
                  className="w-full bg-[#0A665C] hover:bg-[#08524a] text-white py-3.5 px-6 rounded-full font-bold text-xs flex items-center justify-center space-x-2.5 shadow-md transition-colors cursor-pointer"
                >
                  <span>Explore Campaigns</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => alert('Agendamento de chamada iniciado! Entraremos em contato.')}
                  className="w-full bg-white hover:bg-gray-50 text-gray-800 py-3.5 px-6 rounded-full font-bold text-xs flex items-center justify-center shadow-sm transition-colors border border-gray-100 cursor-pointer"
                >
                  Schedule a Call
                </button>
              </div>
            </div>

            {/* Decorative Vector Abstract Shape Card */}
            <div className="rounded-[2rem] h-[140px] overflow-hidden relative shadow-[0_4px_25px_rgba(0,0,0,0.015)] bg-gradient-to-br from-[#E8DEC9] to-[#0A3D36]">
              {/* Organic Wavy Layers with SVGs */}
              <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M-20 160 C100 110, 180 150, 320 100 L320 160 L-20 160 Z" fill="#147B72" opacity="0.6"/>
                <path d="M-20 160 C80 90, 200 130, 320 70 L320 160 L-20 160 Z" fill="#0A3D36" opacity="0.9"/>
                <path d="M-20 160 C120 70, 160 120, 320 40 L320 160 L-20 160 Z" fill="#E8DEC9" opacity="0.15"/>
              </svg>
            </div>

          </div>

        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
