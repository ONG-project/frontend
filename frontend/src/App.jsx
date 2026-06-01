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
import NgoTransparencyPage from './Pages/NgoTransparencyPage'
import Navbar from './components/Navbar'
import { User } from 'lucide-react'
import { useState } from 'react'

function App() {
  const [activePage, setActivePage] = useState('landing')
  const [selectedNgo, setSelectedNgo] = useState(null)

  // Handler genérico que aceita dados extras (ex: a ONG selecionada)
  const handleNavigate = (page, data = null) => {
    if (page === 'ong-profile' && data) {
      setSelectedNgo(data)
    }
    setActivePage(page)
  }

  const navLinks = [
    { label: 'Nossa Missão', id: 'landing' },
    { label: 'Causas', id: 'causas' },
    { label: 'Transparência', id: 'transparency' },
    { label: 'Sobre', id: 'sobre' },
    { label: 'Portal ReliefCore', id: 'relief-core' },
    { label: 'Gestão ONG', id: 'gestao-ong' },
  ]

  const rightContent = (
    <div className="flex items-center space-x-4">
      <button 
        onClick={() => setActivePage('donation')}
        className="bg-teal-800 text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-teal-900 transition shadow-sm"
      >
        Doar Agora
      </button>
      <button
        onClick={() => setActivePage('register')}
        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition focus:outline-none"
        title="Cadastro"
      >
        <User className="w-5 h-5" />
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar
        links={navLinks}
        activePage={activePage}
        onNavigate={handleNavigate}
        onBrandClick={() => setActivePage('landing')}
        rightContent={rightContent}
        className="border-b border-gray-50"
      />

      {activePage === 'landing' && <LandingPage onExploreCauses={() => setActivePage('causas')} />}
      {activePage === 'register' && <RegisterPage onLoginClick={() => setActivePage('login')} />}
      {activePage === 'login' && <LoginPage onRegisterClick={() => setActivePage('register')} />}
      {activePage === 'transparency' && <TransparencyPage />}
      {activePage === 'sobre' && <AboutPage />}
      {activePage === 'donation' && <DonationPage onGoHome={() => setActivePage('landing')} />}
      {activePage === 'relief-core' && <UrgencyRequestPage />}
      {activePage === 'gestao-ong' && <NgoManagementPage />}
      {activePage === 'causas' && <CausesPage onNavigate={handleNavigate} />}
      {activePage === 'ong-profile' && <NgoProfilePage ong={selectedNgo} onNavigate={handleNavigate} />}
      {activePage === 'ong-transparency' && <NgoTransparencyPage ong={selectedNgo} onNavigate={handleNavigate} />}
    </div>
  )
}

export default App
