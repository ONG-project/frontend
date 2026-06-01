import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
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

function AppContent() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

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
        onNavigate={(path) => navigate(path)}
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
        <Route path="/causas" element={<CausesPage onNavigate={(path) => navigate(path)} />} />
        <Route path="/ong/:id" element={<NgoProfilePage onNavigate={(path) => navigate(path)} />} />
        <Route path="/donor-profile" element={<DonorProfilePage onNavigate={(path) => navigate(path)} />} />
        <Route path="/ong-transparency" element={<NgoTransparencyPage onNavigate={(path) => navigate(path)} />} />
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
