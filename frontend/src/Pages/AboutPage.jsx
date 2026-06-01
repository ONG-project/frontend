import { Clock, Globe, Target, Eye, Gem, Phone, Mail, MapPin, Send } from 'lucide-react';
import Footer from '../components/Footer';
import aboutImage from '../assets/about_us.png';

const StatCard = ({ icon: Icon, title, subtitle }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
    <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
      <Icon className="w-6 h-6 text-teal-600" />
    </div>
    <div>
      <p className="text-xl font-bold text-gray-900">{title}</p>
      <p className="text-xs text-gray-500 font-medium">{subtitle}</p>
    </div>
  </div>
);

const PillarCard = ({ icon: Icon, title, description, items }) => (
  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50 flex flex-col h-full">
    <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-teal-600" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    {description && <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>}
    {items && (
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center space-x-2 text-gray-600 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default function AboutPage({ onNavigate }) {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="max-w-[1000px] mx-auto px-6 pt-16 md:pt-24 mb-20">
        <div className="max-w-2xl">
          <p className="text-teal-600 font-bold text-xs uppercase tracking-widest mb-4">/ Quem somos nós</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
            Sobre a ONG+.
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Sua jornada conosco é a peça que faltava para transformar realidades. Unimos tecnologia e empatia para potencializar o impacto de causas sociais em todo o Brasil.
          </p>
        </div>
      </section>

      {/* History & Stats Section */}
      <section className="bg-[#F9FAF9] py-20 px-6">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Nossa História</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
              <p>
                A ONG+ nasceu para simplificar a ponte entre doadores e organizações sérias. Nossa proposta é tornar o ato de ajudar mais claro, seguro e acompanhado de resultados concretos.
              </p>
              <p>
                Evoluímos com foco em melhoria contínua: fortalecemos critérios de curadoria, ampliamos mecanismos de transparência e priorizamos relações de confiança com comunidades e parceiros.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl aspect-video bg-gray-200">
               <img 
                src={aboutImage} 
                alt="História da ONG" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard 
                icon={Clock} 
                title="Atuação Contínua" 
                subtitle="Compromisso diário com impacto social" 
              />
              <StatCard 
                icon={Globe} 
                title="Foco Internacional" 
                subtitle="Iniciativas em diferentes regiões do Brasil" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="max-w-[1000px] mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Pilares da Nossa Atuação</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PillarCard 
            icon={Target}
            title="A Missão"
            description="Conectar pessoas a causas transformadoras através de uma plataforma segura e transparente, garantindo que cada doação chegue ao seu destino."
          />
          <PillarCard 
            icon={Eye}
            title="A Visão"
            description="Ser a maior rede de solidariedade do país, reconhecida pela excelência tecnológica e pelo compromisso inabalável com a transparência social."
          />
          <PillarCard 
            icon={Gem}
            title="Os Valores"
            items={[
              "Transparência Radical",
              "Inovação Social",
              "Ética e Compromisso",
              "Empatia e Respeito"
            ]}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-24 px-6 border-t border-gray-50">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Mantenha a Conexão</h2>
              <p className="text-gray-600 leading-relaxed">
                A transparência e o diálogo são fundamentais para nós. Se você tem dúvidas, sugestões ou quer se tornar um parceiro, estamos à disposição.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition">
                  <Mail className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">E-mail</p>
                  <p className="text-gray-900 font-medium">contato@ongmais.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition">
                  <Phone className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Telefone</p>
                  <p className="text-gray-900 font-medium">+55 (11) 4002-8922</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition">
                  <MapPin className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Localização</p>
                  <p className="text-gray-900 font-medium">São Paulo, SP - Brasil</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAF9] p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-8">Envie uma Mensagem</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  placeholder="Seu nome aqui..." 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">E-mail Pessoal</label>
                <input 
                  type="email" 
                  placeholder="exemplo@email.com" 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sua Mensagem</label>
                <textarea 
                  rows="4"
                  placeholder="Como podemos ajudar?" 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-teal-800 hover:bg-teal-900 text-white font-bold py-4 rounded-xl transition shadow-md flex items-center justify-center space-x-2">
                <span>Enviar Mensagem</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
