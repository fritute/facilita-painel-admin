import { BarChart3, TrendingUp, DollarSign, Users, Calendar, Download, FileText, PieChart } from 'lucide-react';
import { useState } from 'react';

interface MonthlyData {
  month: string;
  revenue: number;
  services: number;
  clients: number;
}

export default function ReportsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');

  const monthlyData: MonthlyData[] = [
    { month: 'Jan', revenue: 45000, services: 12, clients: 8 },
    { month: 'Fev', revenue: 52000, services: 15, clients: 10 },
    { month: 'Mar', revenue: 48000, services: 13, clients: 9 },
    { month: 'Abr', revenue: 61000, services: 18, clients: 12 },
    { month: 'Mai', revenue: 58000, services: 16, clients: 11 },
    { month: 'Jun', revenue: 67000, services: 20, clients: 14 },
    { month: 'Jul', revenue: 72000, services: 22, clients: 15 },
    { month: 'Ago', revenue: 69000, services: 21, clients: 13 },
    { month: 'Set', revenue: 75000, services: 24, clients: 16 },
    { month: 'Out', revenue: 81000, services: 26, clients: 18 },
    { month: 'Nov', revenue: 78000, services: 25, clients: 17 },
  ];

  const totalRevenue = monthlyData.reduce((sum, data) => sum + data.revenue, 0);
  const totalServices = monthlyData.reduce((sum, data) => sum + data.services, 0);
  const totalClients = monthlyData.reduce((sum, data) => sum + data.clients, 0);
  const avgRevenuePerService = totalRevenue / totalServices;

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  const servicesByCategory = [
    { category: 'Manutenção', count: 45, percentage: 25, color: 'bg-blue-500' },
    { category: 'Instalação', count: 38, percentage: 21, color: 'bg-green-500' },
    { category: 'Consultoria', count: 52, percentage: 29, color: 'bg-purple-500' },
    { category: 'Suporte', count: 28, percentage: 16, color: 'bg-yellow-500' },
    { category: 'Treinamento', count: 17, percentage: 9, color: 'bg-red-500' },
  ];

  const topClients = [
    { name: 'Empresa ABC', services: 15, revenue: 28500 },
    { name: 'Tech Solutions', services: 12, revenue: 24800 },
    { name: 'StartUp XYZ', services: 10, revenue: 19200 },
    { name: 'Indústria 123', services: 8, revenue: 16400 },
    { name: 'Banco Digital', services: 7, revenue: 14900 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Relatórios e Análises</h2>
        <p className="text-purple-100">Visão completa do desempenho do seu negócio</p>
      </div>

      {/* Period Filter */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Período de Análise</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPeriod === 'week'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPeriod === 'month'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Mês
            </button>
            <button
              onClick={() => setSelectedPeriod('year')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPeriod === 'year'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Ano
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Receita Total</h3>
          <p className="text-3xl font-bold text-gray-900">
            R$ {(totalRevenue / 1000).toFixed(0)}k
          </p>
          <p className="text-xs text-green-600 mt-2">+12.5% vs período anterior</p>
        </div>

        {/* Total Services */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="text-blue-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total de Serviços</h3>
          <p className="text-3xl font-bold text-gray-900">{totalServices}</p>
          <p className="text-xs text-green-600 mt-2">+8.3% vs período anterior</p>
        </div>

        {/* Total Clients */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="text-green-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Clientes Ativos</h3>
          <p className="text-3xl font-bold text-gray-900">{totalClients}</p>
          <p className="text-xs text-green-600 mt-2">+15.2% vs período anterior</p>
        </div>

        {/* Average per Service */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pink-100 rounded-lg">
              <Calendar className="text-pink-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Ticket Médio</h3>
          <p className="text-3xl font-bold text-gray-900">
            R$ {(avgRevenuePerService / 1000).toFixed(1)}k
          </p>
          <p className="text-xs text-green-600 mt-2">+3.8% vs período anterior</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="text-purple-600" size={24} />
              Receita Mensal
            </h3>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Ver detalhes
            </button>
          </div>
          <div className="space-y-3">
            {monthlyData.slice(-6).map((data) => (
              <div key={data.month} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{data.month}</span>
                  <span className="font-bold text-purple-600">
                    R$ {(data.revenue / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                    style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services by Category */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <PieChart className="text-purple-600" size={24} />
              Serviços por Categoria
            </h3>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Ver detalhes
            </button>
          </div>
          <div className="space-y-4">
            {servicesByCategory.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{item.category}</span>
                  <span className="text-gray-600">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${item.percentage * 3}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Clients */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-purple-100">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="text-purple-600" size={24} />
            Top 5 Clientes
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Posição
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Serviços
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Receita Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ticket Médio
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topClients.map((client, index) => (
                <tr key={client.name} className="hover:bg-purple-50/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-purple-600">
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {client.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {client.services} serviços
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-purple-600">
                    R$ {client.revenue.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    R$ {(client.revenue / client.services).toFixed(2).replace('.', ',')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="text-purple-600" size={20} />
          Exportar Relatórios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
            <Download size={20} />
            Exportar PDF
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
            <Download size={20} />
            Exportar Excel
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg">
            <Download size={20} />
            Relatório Completo
          </button>
        </div>
      </div>
    </div>
  );
}
