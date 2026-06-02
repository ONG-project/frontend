import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import TransparencyPage from './Pages/TransparencyPage'
import AboutPage from './Pages/AboutPage'
import DonationPage from './Pages/DonationPage'
import UrgencyRequestPage from './Pages/UrgencyRequestPage'
import NgoManagementPage from './Pages/NgoManagementPage'
import CausesPage from './Pages/CausesPage'
import NgoProfilePage from './Pages/NgoProfilePage'
import DonorProfilePage from './Pages/DonorProfilePage'
import NgoTransparencyPage from './Pages/NgoTransparencyPage'
import Navbar from './components/Navbar'
import { User, Bell, Settings } from 'lucide-react'
import { useState } from 'react'

const ONG_CATALOG = [
  {
    id: 1,
    name: 'Instituto Rebrota',
    cnpj: '12.345.678/0001-90',
    description: 'Nossa missão é restaurar o equilíbrio ecológico através da biodiversidade urbana. Transformamos espaços cinzas em pulmões vivos, conectando comunidades à regeneração ativa da Floresta Amazônica em perímetros municipais.',
    cause: 'meio-ambiente',
    score: 96,
    location: 'Manaus, AM',
  },
  {
    id: 2,
    name: 'Águas Limpas Brasil',
    cnpj: '98.765.432/0001-10',
    description: 'Projetos de saneamento básico e acesso à água potável em comunidades ribeirinhas do Norte e Nordeste.',
    cause: 'saude',
    score: 92,
    location: 'Santarém, PA',
  },
  {
    id: 3,
    name: 'Educação Sem Fronteiras',
    cnpj: '45.123.890/0001-55',
    description: 'Promovemos acesso à educação de qualidade para jovens em situação de vulnerabilidade através de bolsas e mentoria educacional.',
    cause: 'educacao',
    score: 88,
    location: 'São Paulo, SP',
  },
  {
    id: 4,
    name: 'Vozes da Comunidade',
    cnpj: '11.222.333/0001-44',
    description: 'Defesa e fomento dos direitos humanos através de suporte legal, capacitação e denúncia de violações em áreas periféricas.',
    cause: 'direitos-humanos',
    score: 95,
    location: 'Rio de Janeiro, RJ',
  },
]

function resolveOngById(id) {
  return ONG_CATALOG.find((ong) => String(ong.id) === String(id)) || ONG_CATALOG[0]
}

function OngProfileRoute({ onNavigate }) {
  const { id } = useParams()
  const location = useLocation()
  const currentOng = location.state?.ong || resolveOngById(id)

  return <NgoProfilePage ong={currentOng} onNavigate={onNavigate} />
}

function OngTransparencyRoute({ onNavigate }) {
  const { id } = useParams()
  const location = useLocation()
  const currentOng = location.state?.ong || resolveOngById(id)

  return <NgoTransparencyPage ong={currentOng} onNavigate={onNavigate} />
}

function AppContent() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  const handleNavigate = (path, data = null) => {
    if (path === 'ong-profile' && data) {
      navigate(`/ong/${data.id}`, { state: { ong: data } })
      return
    }

    if (path === 'ong-transparency' && data) {
      navigate(`/ong/${data.id}/transparency`, { state: { ong: data } })
      return
    }

    navigate(path)
  }

  const navLinks = [
    { label: 'Nossa Missão', path: '/' },
    { label: 'Causas', path: '/causas' },
    { label: 'Transparência', path: '/transparency' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Urgência', path: '/urgencia' },
    { label: 'Gestão ONG', path: '/gestao-ong' },
  ]

  const rightContent = user ? (
    <div className="flex items-center space-x-6">
      <button 
        className="relative text-gray-500 hover:text-teal-800 transition cursor-pointer" 
        title="Notificações" 
        onClick={() => alert('Notificações: João Silva, você doou recentemente para o Instituto Rebrota.')}
      >
        <Bell className="w-5 h-5" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-teal-600 rounded-full"></span>
      </button>
      <button 
        className="text-gray-500 hover:text-teal-800 transition cursor-pointer" 
        title="Configurações" 
        onClick={() => alert('Abrir Configurações do Doador')}
      >
        <Settings className="w-5 h-5" />
      </button>
      <button 
        onClick={() => navigate('/doacao')}
        className="bg-[#0A665C] text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-teal-900 transition shadow-sm cursor-pointer"
      >
        Donate
      </button>
      <button
        onClick={() => navigate('/donor-profile')}
        className="w-9 h-9 rounded-full bg-[#F5F2EC] flex items-center justify-center border-2 border-white shadow-sm hover:scale-105 transition overflow-hidden cursor-pointer"
        title="Meu Perfil (João Silva)"
      >
        <svg className="w-6 h-6 text-[#8C8273] opacity-80 mt-1" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 50C58.2843 50 65 43.2843 65 35C65 26.7157 58.2843 20 50 20C41.7157 20 35 26.7157 35 35C35 43.2843 41.7157 50 50 50Z" fill="currentColor"/>
          <path d="M72 75C72 63.9543 62.1503 55 50 55C37.8497 55 28 63.9543 28 75" fill="currentColor"/>
        </svg>
      </button>
    </div>
  ) : (
    <div className="flex items-center space-x-4">
      <button 
        onClick={() => navigate('/doacao')}
        className="bg-teal-800 text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-teal-900 transition shadow-sm"
      >
        Doar Agora
      </button>
      <button
        onClick={() => navigate('/login')}
        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition focus:outline-none cursor-pointer"
        title="Login"
      >
        <User className="w-5 h-5" />
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar
        links={navLinks}
        onNavigate={handleNavigate}
        onBrandClick={() => navigate('/')}
        rightContent={rightContent}
        className="border-b border-gray-50"
      />

      <Routes>
        <Route path="/" element={<LandingPage onExploreCauses={() => navigate('/causas')} />} />
        <Route path="/register" element={<RegisterPage onLoginClick={() => navigate('/login')} />} />
        <Route path="/login" element={<LoginPage onRegisterClick={() => navigate('/register')} onLogin={() => { setUser({ name: 'João Silva', role: 'donor' }); navigate('/donor-profile'); }} />} />
        <Route path="/transparency" element={<TransparencyPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/doacao" element={<DonationPage onGoHome={() => navigate('/')} />} />
        <Route path="/urgencia" element={<UrgencyRequestPage />} />
        <Route path="/gestao-ong" element={<NgoManagementPage />} />
        <Route path="/causas" element={<CausesPage onNavigate={handleNavigate} />} />
        <Route path="/ong/:id" element={<OngProfileRoute onNavigate={handleNavigate} />} />
        <Route path="/ong/:id/transparency" element={<OngTransparencyRoute onNavigate={handleNavigate} />} />
        <Route path="/donor-profile" element={<DonorProfilePage onNavigate={handleNavigate} />} />
        <Route path="/ong-transparency" element={<OngTransparencyRoute onNavigate={handleNavigate} />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
