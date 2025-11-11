import { Wrench, TrendingUp, Clock, CheckCircle, AlertCircle, Users, Calendar, BarChart3 } from 'lucide-react';
import { useState } from 'react';

interface ServiceData {
  id: string;
  name: string;
  client: string;
  status: 'completed' | 'in_progress' | 'pending' | 'cancelled';
  startDate: string;
  endDate?: string;
  value: number;
  technician: string;
  category: string;
}

export default function ServicesDashboard() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const services: ServiceData[] = [
    { id: 'S001', name: 'Manutenção Preventiva', client: 'Empresa ABC', status: 'completed', startDate: '2024-11-01', endDate: '2024-11-03', value: 1500.00, technician: 'João Silva', category: 'Manutenção' },
    { id: 'S002', name: 'Instalação de Sistema', client: 'Tech Solutions', status: 'in_progress', startDate: '2024-11-08', value: 3200.00, technician: 'Maria Santos', category: 'Instalação' },
    { id: 'S003', name: 'Consultoria Técnica', client: 'StartUp XYZ', status: 'completed', startDate: '2024-10-25', endDate: '2024-10-30', value: 2800.00, technician: 'Pedro Costa', category: 'Consultoria' },
    { id: 'S004', name: 'Suporte Emergencial', client: 'Indústria 123', status: 'pending', startDate: '2024-11-15', value: 800.00, technician: 'Ana Lima', category: 'Suporte' },
    { id: 'S005', name: 'Treinamento de Equipe', client: 'Empresa ABC', status: 'in_progress', startDate: '2024-11-10', value: 4500.00, technician: 'Carlos Mendes', category: 'Treinamento' },
    { id: 'S006', name: 'Upgrade de Hardware', client: 'Tech Solutions', status: 'completed', startDate: '2024-10-20', endDate: '2024-10-22', value: 5600.00, technician: 'João Silva', category: 'Instalação' },
    { id: 'S007', name: 'Auditoria de Segurança', client: 'Banco Digital', status: 'cancelled', startDate: '2024-10-15', value: 3000.00, technician: 'Maria Santos', category: 'Consultoria' },
  ];

  const categories = ['all', 'Manutenção', 'Instalação', 'Consultoria', 'Suporte', 'Treinamento'];
  const statuses = ['all', 'completed', 'in_progress', 'pending', 'cancelled'];

  const filteredServices = services.filter(service => {
    const statusMatch = filterStatus === 'all' || service.status === filterStatus;
    const categoryMatch = filterCategory === 'all' || service.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  const totalCompleted = services.filter(s => s.status === 'completed').reduce((sum, s) => sum + s.value, 0);
  const totalInProgress = services.filter(s => s.status === 'in_progress').reduce((sum, s) => sum + s.value, 0);
  const totalPending = services.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.value, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle size={14} />
            Concluído
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <Clock size={14} />
            Em Andamento
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <AlertCircle size={14} />
            Pendente
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <AlertCircle size={14} />
            Cancelado
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Relatórios de Serviços</h2>
        <p className="text-blue-100">Acompanhe todos os serviços prestados e seu desempenho</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total de Serviços */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Wrench className="text-blue-600" size={24} />
            </div>
            <BarChart3 className="text-blue-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total de Serviços</h3>
          <p className="text-3xl font-bold text-gray-900">{services.length}</p>
          <p className="text-xs text-blue-600 mt-2">Todos os períodos</p>
        </div>

        {/* Serviços Concluídos */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Concluídos</h3>
          <p className="text-3xl font-bold text-gray-900">
            R$ {totalCompleted.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-xs text-green-600 mt-2">
            {services.filter(s => s.status === 'completed').length} serviços finalizados
          </p>
        </div>

        {/* Em Andamento */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="text-blue-600" size={24} />
            </div>
            <Calendar className="text-blue-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Em Andamento</h3>
          <p className="text-3xl font-bold text-gray-900">
            R$ {totalInProgress.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-xs text-blue-600 mt-2">
            {services.filter(s => s.status === 'in_progress').length} serviços ativos
          </p>
        </div>

        {/* Pendentes */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle className="text-yellow-600" size={24} />
            </div>
            <Users className="text-yellow-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Pendentes</h3>
          <p className="text-3xl font-bold text-gray-900">
            R$ {totalPending.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-xs text-yellow-600 mt-2">
            {services.filter(s => s.status === 'pending').length} serviços aguardando
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'Todos' : 
                   status === 'completed' ? 'Concluído' :
                   status === 'in_progress' ? 'Em Andamento' :
                   status === 'pending' ? 'Pendente' : 'Cancelado'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Todas' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-blue-100">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Wrench className="text-blue-600" size={24} />
            Histórico de Serviços
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
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Técnico
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Data Início
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{service.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {service.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {service.technician}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                    R$ {service.value.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(service.startDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStatusBadge(service.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <button className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Exportar Relatório
        </button>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg">
          Novo Serviço
        </button>
      </div>
    </div>
  );
}
