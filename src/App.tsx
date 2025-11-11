import { useState } from 'react';
import { BookOpen, CreditCard, Settings, Users, FileText, Phone } from 'lucide-react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryCard from './components/CategoryCard';
import FAQItem from './components/FAQItem';
import ContactForm from './components/ContactForm';
import Login from './components/Login';
import PaymentDashboard from './components/PaymentDashboard';
import ServicesDashboard from './components/ServicesDashboard';
import ReportsDashboard from './components/ReportsDashboard';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuthenticated, login, error } = useAuth();
  const [activeSection, setActiveSection] = useState<'home' | 'contact' | 'payments' | 'services' | 'reports'>('home');

  // Se não estiver autenticado, mostrar tela de login
  if (!isAuthenticated) {
    return <Login onLogin={login} error={error || undefined} />;
  }

  const categories = [
    {
      icon: BookOpen,
      title: 'Primeiros Passos',
      description: 'Aprenda o básico para começar a usar o Facilita',
      articleCount: 12,
    },
    {
      icon: CreditCard,
      title: 'Pagamentos e Faturas',
      description: 'Informações sobre pagamentos, cobranças e faturas',
      articleCount: 8,
    },
    {
      icon: Settings,
      title: 'Configurações',
      description: 'Configure sua conta e preferências',
      articleCount: 15,
    },
    {
      icon: Users,
      title: 'Gerenciamento de Usuários',
      description: 'Adicione e gerencie usuários da sua equipe',
      articleCount: 6,
    },
    {
      icon: FileText,
      title: 'Relatórios e Análises',
      description: 'Entenda seus dados e gere relatórios',
      articleCount: 10,
    },
    {
      icon: Phone,
      title: 'Integrações',
      description: 'Conecte o Facilita com outras ferramentas',
      articleCount: 7,
    },
  ];

  const faqs = [
    {
      question: 'Como faço para criar uma nova conta?',
      answer: 'Para criar uma nova conta, clique no botão "Cadastrar" no topo da página inicial e preencha o formulário com suas informações. Você receberá um e-mail de confirmação para ativar sua conta.',
    },
    {
      question: 'Quais são os métodos de pagamento aceitos?',
      answer: 'Aceitamos cartões de crédito (Visa, Mastercard, American Express), débito automático, boleto bancário e PIX. Você pode gerenciar seus métodos de pagamento na seção "Pagamentos" do seu perfil.',
    },
    {
      question: 'Como posso redefinir minha senha?',
      answer: 'Na página de login, clique em "Esqueci minha senha" e siga as instruções. Você receberá um e-mail com um link para criar uma nova senha.',
    },
    {
      question: 'O Facilita oferece suporte técnico?',
      answer: 'Sim! Oferecemos suporte técnico por e-mail, chat ao vivo (horário comercial) e telefone. Você também pode consultar nossa base de conhecimento com tutoriais e guias detalhados.',
    },
    {
      question: 'Como adiciono novos usuários à minha conta?',
      answer: 'Acesse "Configurações" > "Gerenciamento de Usuários" e clique em "Adicionar Usuário". Preencha as informações necessárias e defina as permissões apropriadas para cada usuário.',
    },
    {
      question: 'Posso cancelar minha assinatura a qualquer momento?',
      answer: 'Sim, você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento. Acesse "Configurações" > "Assinatura" e clique em "Cancelar Assinatura". Seus dados permanecerão disponíveis até o fim do período pago.',
    },
  ];

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />

        {/* Navigation Tabs */}
        <div className="flex gap-4 my-8 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveSection('home')}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeSection === 'home'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Central de Ajuda
          </button>
          <button
            onClick={() => setActiveSection('reports')}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeSection === 'reports'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Análises e Relatórios
          </button>
          <button
            onClick={() => setActiveSection('payments')}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeSection === 'payments'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pagamentos
          </button>
          <button
            onClick={() => setActiveSection('services')}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeSection === 'services'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Serviços
          </button>
          <button
            onClick={() => setActiveSection('contact')}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeSection === 'contact'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Contato
          </button>
        </div>

        {activeSection === 'home' ? (
          <>
            {/* Categories Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Categorias</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                  <CategoryCard
                    key={index}
                    icon={category.icon}
                    title={category.title}
                    description={category.description}
                    articleCount={category.articleCount}
                    onClick={() => console.log(`Clicked on ${category.title}`)}
                  />
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </section>

            {/* Quick Contact Section */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Ainda precisa de ajuda?</h2>
              <p className="mb-6 text-primary-100">
                Nossa equipe está pronta para ajudar você. Entre em contato conosco!
              </p>
              <button
                onClick={() => setActiveSection('contact')}
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
              >
                Falar com Suporte
              </button>
            </section>
          </>
        ) : activeSection === 'reports' ? (
          <section>
            <ReportsDashboard />
          </section>
        ) : activeSection === 'payments' ? (
          <section>
            <PaymentDashboard />
          </section>
        ) : activeSection === 'services' ? (
          <section>
            <ServicesDashboard />
          </section>
        ) : (
          <section>
            <ContactForm />
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Facilita. Todos os direitos reservados.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
