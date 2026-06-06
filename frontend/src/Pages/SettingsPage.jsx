import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings, Shield, Bell, User, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Configurações da Conta</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-100 flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 text-2xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-500 capitalize">Perfil: {user?.role === 'donor' ? 'Doador' : user?.role === 'ong' ? 'ONG' : user?.role}</p>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {user?.role !== 'ong' && (
              <>
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-gray-400" />
                    Dados Pessoais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                      <input type="text" className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600" value={user?.name || ''} readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600" value={user?.email || 'email@exemplo.com'} readOnly />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-gray-400" />
                    Notificações
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-teal-600 rounded" defaultChecked />
                      <span className="text-gray-700">Receber atualizações de campanhas</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-teal-600 rounded" defaultChecked />
                      <span className="text-gray-700">Receber relatórios de transparência</span>
                    </label>
                  </div>
                </section>
              </>
            )}

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-gray-400" />
                Segurança
              </h3>
              <button className="text-teal-700 hover:text-teal-900 font-medium text-sm transition">
                Alterar senha
              </button>
            </section>

            {user?.role !== 'ong' && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-gray-400" />
                  Métodos de Pagamento
                </h3>
                <div className="bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gray-50 rounded flex items-center justify-center border border-gray-200">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Cartão de Crédito final 4242</p>
                      <p className="text-xs text-gray-500">Expira em 12/28</p>
                    </div>
                  </div>
                  <button className="text-teal-700 hover:text-teal-900 font-medium text-sm transition">
                    Atualizar
                  </button>
                </div>
              </section>
            )}
          </div>
          
          <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button className="bg-teal-800 text-white px-6 py-2 rounded-xl font-bold hover:bg-teal-900 transition">
              Salvar Alterações
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
