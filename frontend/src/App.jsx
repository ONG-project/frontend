import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import TransparencyPage from './Pages/TransparencyPage'
import AboutPage from './Pages/AboutPage'
import DonationPage from './Pages/DonationPage'
import UrgencyRequestPage from './Pages/UrgencyRequestPage'
import NgoManagementPage from './Pages/NgoManagementPage'
import CausesPage from './Pages/CausesPage'
import BundleDetailPage from './Pages/BundleDetailPage'
import NgoProfilePage from './Pages/NgoProfilePage'
import DonorProfilePage from './Pages/DonorProfilePage'
import NgoTransparencyPage from './Pages/NgoTransparencyPage'
import Navbar from './components/Navbar'
import { User, Bell, Settings, LogOut, Menu, X, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import RequireAuth from './components/guards/RequireAuth'
import RequireRole from './components/guards/RequireRole'
import RequireGuest from './components/guards/RequireGuest'
import SettingsPage from './Pages/SettingsPage'
import { ONG_CATALOG } from './data/ongs'



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

function ProfileDropdown({ user, onLogout, onNavigate }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        id="profile-menu-btn"
        onClick={() => setOpen(o => !o)}
        className="flex items-center space-x-2 group cursor-pointer"
        title="Menu do perfil"
      >
        <div className="w-9 h-9 rounded-full bg-[#F5F2EC] flex items-center justify-center border-2 border-white shadow-sm hover:scale-105 transition overflow-hidden">
          <svg className="w-6 h-6 text-[#8C8273] opacity-80 mt-1" viewBox="0 0 100 100" fill="none">
            <path d="M50 50C58.2843 50 65 43.2843 65 35C65 26.7157 58.2843 20 50 20C41.7157 20 35 26.7157 35 35C35 43.2843 41.7157 50 50 50Z" fill="currentColor"/>
            <path d="M72 75C72 63.9543 62.1503 55 50 55C37.8497 55 28 63.9543 28 75" fill="currentColor"/>
          </svg>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-50">
            <p className="text-sm font-bold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user.role === 'donor' ? 'Doador' : 'ONG'}</p>
          </div>
          <button
            id="goto-profile-btn"
            onClick={() => { setOpen(false); onNavigate(user.role === 'ong' ? '/gestao-ong' : '/donor-profile'); }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition text-left"
          >
            <User className="w-4 h-4 text-gray-400" />
            <span>{user.role === 'ong' ? 'Minha ONG' : 'Meu Perfil'}</span>
          </button>
          <button
            id="goto-settings-btn"
            onClick={() => { setOpen(false); onNavigate('/configuracoes'); }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition text-left"
          >
            <Settings className="w-4 h-4 text-gray-400" />
            <span>Configurações</span>
          </button>
          <div className="border-t border-gray-50 mt-1 pt-1">
            <button
              id="logout-btn"
              onClick={() => { setOpen(false); onLogout(); }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function MobileMenu({ links, user, onNavigate, onLogin, onLogout }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        id="mobile-menu-btn"
        onClick={() => setOpen(o => !o)}
        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
        aria-label="Abrir menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-50 py-4 px-6 space-y-1">
          {links.map(link => (
            <button
              key={link.path}
              onClick={() => { setOpen(false); onNavigate(link.path); }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            {user ? (
              <>
                <button onClick={() => { setOpen(false); onNavigate(user.role === 'ong' ? '/gestao-ong' : '/donor-profile'); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                  {user.role === 'ong' ? 'Minha ONG' : 'Meu Perfil'}
                </button>
                <button onClick={() => { setOpen(false); onLogout(); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition">
                  Sair
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setOpen(false); onNavigate('/login'); }}
                  className="w-full bg-[#0A665C] text-white font-bold py-3 rounded-xl text-sm">
                  Login
                </button>
                <button onClick={() => { setOpen(false); onNavigate('/doacao'); }}
                  className="w-full border border-[#0A665C] text-[#0A665C] font-bold py-3 rounded-xl text-sm">
                  Doar Agora
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function AppContent() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Doação confirmada', text: 'João Silva, você doou recentemente para o Instituto Rebrota.', time: 'Há 2 horas', read: false, path: '/donor-profile' },
    { id: 2, title: 'Campanha em Destaque', text: 'A campanha "Aliança Amazônia Viva" atingiu 65% da meta com matchfunding!', time: 'Ontem', read: false, path: '/causas' }
  ])
  const notificationsRef = useRef(null)

  const hasUnread = notifications.some(n => !n.read)

  const handleMarkAllAsRead = () => {
    setNotifications([])
  }

  const handleMarkAsRead = (id, path) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    if (path) {
      navigate(path)
      setShowNotifications(false)
    }
  }

  useEffect(() => {
    const handler = (e) => {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

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

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinks = [
    { label: 'Nossa Missão', path: '/' },
    { label: 'Causas', path: '/causas' },
    { label: 'Transparência', path: '/transparency' },
    { label: 'Sobre', path: '/sobre' },
  ]

  const rightContent = user ? (
    <div className="flex items-center space-x-5">
      <div className="relative" ref={notificationsRef}>
        <button
          id="notifications-btn"
          className="relative text-gray-500 hover:text-teal-800 transition cursor-pointer"
          title="Notificações"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="w-5 h-5" />
          {hasUnread && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>}
        </button>
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 text-left">
            <div className="px-4 pb-2 border-b border-gray-50 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-900">Notificações</span>
              {hasUnread && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-[10px] text-teal-600 font-bold hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  Marcar todas como lidas
                </button>
              )}
            </div>
            <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleMarkAsRead(n.id, n.path)}
                    className="px-4 py-3 transition cursor-pointer hover:bg-gray-50 relative bg-teal-50/10"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-xs text-gray-700 font-bold">
                        {n.title}
                      </p>
                      <span className="w-1.5 h-1.5 bg-teal-600 rounded-full shrink-0 mt-1"></span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">{n.text}</p>
                    <span className="text-[9px] text-gray-400 block mt-1">{n.time}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-400 text-xs font-medium">
                  Nenhuma notificação pendente
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <button
        id="donate-btn"
        onClick={() => navigate('/doacao')}
        className="bg-[#0A665C] text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-teal-900 transition shadow-sm cursor-pointer hidden md:block"
      >
        Doar Agora
      </button>
      <ProfileDropdown user={user} onLogout={handleLogout} onNavigate={handleNavigate} />
    </div>
  ) : (
    <div className="hidden md:flex items-center space-x-4">
      <button
        id="donate-now-btn"
        onClick={() => handleNavigate('/doacao')}
        className="bg-teal-800 text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-teal-900 transition shadow-sm"
      >
        Doar Agora
      </button>
      <button
        id="login-btn"
        onClick={() => handleNavigate('/login')}
        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition focus:outline-none cursor-pointer"
        title="Login"
      >
        <User className="w-5 h-5" />
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <div className="relative">
        <nav className="flex justify-between items-center py-6 px-8 md:px-16 bg-white border-b border-gray-50">
          <div
            className="text-2xl font-bold text-teal-800 tracking-tight cursor-pointer"
            onClick={() => handleNavigate('/')}
          >
            ONG<span className="text-teal-600">+</span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex space-x-10 text-gray-500 font-medium text-sm">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => handleNavigate(link.path)}
                className="hover:text-teal-700 transition"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {rightContent}
            <MobileMenu
              links={navLinks}
              user={user}
              onNavigate={handleNavigate}
              onLogin={() => handleNavigate('/login')}
              onLogout={handleLogout}
            />
          </div>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<LandingPage onExploreCauses={() => navigate('/causas')} onNavigate={navigate} />} />
        
        {/* Guest Routes */}
        <Route path="/register" element={
          <RequireGuest><RegisterPage onLoginClick={() => navigate('/login')} /></RequireGuest>
        } />
        <Route path="/login" element={
          <RequireGuest><LoginPage onRegisterClick={() => navigate('/register')} /></RequireGuest>
        } />
        
        {/* Public Routes */}
        <Route path="/transparency" element={<TransparencyPage onNavigate={navigate} />} />
        <Route path="/sobre" element={<AboutPage onNavigate={navigate} />} />
        <Route path="/causas" element={<CausesPage onNavigate={handleNavigate} />} />
        <Route path="/bundle/:id" element={<BundleDetailPage />} />
        <Route path="/ong/:id" element={<OngProfileRoute onNavigate={handleNavigate} />} />
        <Route path="/ong/:id/transparency" element={<OngTransparencyRoute onNavigate={handleNavigate} />} />
        <Route path="/ong-transparency" element={<Navigate to="/ong/1/transparency" replace />} />

        {/* Protected Area */}
        <Route path="/doacao" element={<RequireAuth><DonationPage onGoHome={() => navigate('/')} /></RequireAuth>} />
        <Route
          path="/urgencia"
          element={
            <RequireRole allowedRoles={['ong']}>
              <Navigate to="/gestao-ong?tab=urgencia&action=nova" replace />
            </RequireRole>
          }
        />
        <Route
          path="/urgencia/nova"
          element={<RequireRole allowedRoles={['ong']}><UrgencyRequestPage /></RequireRole>}
        />
        <Route path="/configuracoes" element={<RequireAuth><SettingsPage /></RequireAuth>} />
        
        {/* Role Specific */}
        <Route path="/donor-profile" element={<RequireRole allowedRoles={['donor']}><DonorProfilePage onNavigate={handleNavigate} /></RequireRole>} />
        <Route path="/gestao-ong" element={<RequireRole allowedRoles={['ong']}><NgoManagementPage /></RequireRole>} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}
