import { CreditCard, TrendingUp, DollarSign, Calendar, CheckCircle, Clock, AlertCircle, Download, Filter } from 'lucide-react';
import { useState } from 'react';

interface PaymentData {
  id: string;
  service: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  method: string;
}

export default function PaymentDashboard() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const payments: PaymentData[] = [
    { id: '001', service: 'Plano Premium', amount: 299.90, status: 'paid', date: '2024-11-01', method: 'Cartão de Crédito' },
    { id: '002', service: 'Consultoria Técnica', amount: 450.00, status: 'paid', date: '2024-11-05', method: 'PIX' },
    { id: '003', service: 'Suporte Adicional', amount: 150.00, status: 'pending', date: '2024-11-10', method: 'Boleto' },
    { id: '004', service: 'Integração API', amount: 800.00, status: 'paid', date: '2024-10-28', method: 'Transferência' },
    { id: '005', service: 'Treinamento Equipe', amount: 1200.00, status: 'overdue', date: '2024-10-15', method: 'Boleto' },
    { id: '006', service: 'Plano Básico', amount: 149.90, status: 'paid', date: '2024-11-02', method: 'PIX' },
    { id: '007', service: 'Suporte Premium', amount: 350.00, status: 'paid', date: '2024-11-07', method: 'Cartão de Crédito' },
    { id: '008', service: 'Migração de Dados', amount: 950.00, status: 'pending', date: '2024-11-12', method: 'Transferência' },
  ];

  const paymentMethods = ['all', 'Cartão de Crédito', 'PIX', 'Boleto', 'Transferência'];
  const statuses = ['all', 'paid', 'pending', 'overdue'];

  const filteredPayments = payments.filter(payment => {
    const statusMatch = filterStatus === 'all' || payment.status === filterStatus;
    const methodMatch = filterMethod === 'all' || payment.method === filterMethod;
    const searchMatch = searchTerm === '' || 
      payment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.includes(searchTerm);
    return statusMatch && methodMatch && searchMatch;
  });

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
            <CheckCircle size={14} />
            Pago
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Clock size={14} />
            Pendente
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <AlertCircle size={14} />
            Vencido
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Relatórios de Pagamentos</h2>
        <p className="text-primary-100">Acompanhe todos os pagamentos de serviços em um só lugar</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Pago */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <CheckCircle className="text-primary-600" size={24} />
            </div>
            <TrendingUp className="text-primary-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Pago</h3>
          <p className="text-3xl font-bold text-gray-900">
            R$ {totalPaid.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-xs text-primary-600 mt-2">
            {payments.filter(p => p.status === 'paid').length} pagamentos confirmados
          </p>
        </div>

        {/* Total Pendente */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <Calendar className="text-yellow-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Pendente</h3>
          <p className="text-3xl font-bold text-gray-900">
            R$ {totalPending.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-xs text-yellow-600 mt-2">
            {payments.filter(p => p.status === 'pending').length} pagamentos aguardando
          </p>
        </div>

        {/* Total Vencido */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <DollarSign className="text-red-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Vencido</h3>
          <p className="text-3xl font-bold text-gray-900">
            R$ {totalOverdue.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-xs text-red-600 mt-2">
            {payments.filter(p => p.status === 'overdue').length} pagamentos atrasados
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Filter className="text-primary-600" size={20} />
          Filtros e Busca
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ID ou serviço..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'Todos' : 
                   status === 'paid' ? 'Pago' :
                   status === 'pending' ? 'Pendente' : 'Vencido'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Método de Pagamento</label>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {paymentMethods.map(method => (
                <option key={method} value={method}>
                  {method === 'all' ? 'Todos' : method}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {filteredPayments.length} de {payments.length} pagamentos
          </p>
          <button
            onClick={() => {
              setFilterStatus('all');
              setFilterMethod('all');
              setSearchTerm('');
            }}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 px-6 py-4 border-b border-primary-100">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="text-primary-600" size={24} />
            Histórico de Pagamentos
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Serviço
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Método
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-primary-50/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {payment.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary-600">
                    R$ {payment.amount.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(payment.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {payment.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStatusBadge(payment.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors">
          <Download size={20} />
          Exportar Relatório
        </button>
        <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-medium hover:from-primary-700 hover:to-accent-700 transition-all shadow-md hover:shadow-lg">
          Novo Pagamento
        </button>
      </div>
    </div>
  );
}
