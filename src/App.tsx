import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  MessageSquare, 
  Database, 
  Bell, 
  Settings, 
  Activity,
  BarChart3,
  Target,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Heart,
  Play,
  Building,
  ListTodo,
  ScrollText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Info,
  Lightbulb
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TutorialProvider, useTutorial } from './context/TutorialContext';
import TutorialTooltip from './components/TutorialTooltip';
import { 
  getClients,
  getCampaigns, 
  getFunnelData, 
  getCalendarEvents, 
  getAgentResponse, 
  getKanbanBoards, 
  getAgentMemory, 
  getAgentReasoning, 
  getAgentLogs, 
  getProactiveNotifications,
  submitAgentFeedback,
  getDashboardData
} from './services/mockApi';
import './App.css';

// Componente principal da aplicação
function AppContent() {
  const { activeTab, setActiveTab, startTutorial } = useTutorial();
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [clients, setClients] = useState<any[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [funnelData, setFunnelData] = useState<any>(null);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: 1,
      type: 'agent',
      message: 'Olá! Sou o MARGENT, seu agente cognitivo especializado em marketing digital para consultórios. Gerencio campanhas para múltiplos clientes e identifico oportunidades proativas. Como posso ajudar você hoje?',
      timestamp: '10:00'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [kanbanBoards, setKanbanBoards] = useState<any[]>([]);
  const [agentMemory, setAgentMemory] = useState<any>(null);
  const [agentReasoning, setAgentReasoning] = useState<any>(null);
  const [agentLogs, setAgentLogs] = useState<any[]>([]);
  const [proactiveNotifications, setProactiveNotifications] = useState<any[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  // Carregar dados iniciais
  useEffect(() => {
    loadAllData();
  }, []);

  // Recarregar dados quando cliente selecionado muda
  useEffect(() => {
    if (selectedClient !== 'all') {
      loadClientSpecificData();
    }
  }, [selectedClient]);

  const loadAllData = async () => {
    const [
      clientsData,
      dashboardDataResult,
      campaignsData,
      calendarData,
      kanbanData,
      memoryData,
      reasoningData,
      logsData,
      notificationsData
    ] = await Promise.all([
      getClients(),
      getDashboardData(),
      getCampaigns(),
      getCalendarEvents(),
      getKanbanBoards(),
      getAgentMemory(),
      getAgentReasoning(),
      getAgentLogs(),
      getProactiveNotifications()
    ]);

    setClients(clientsData);
    setDashboardData(dashboardDataResult);
    setCampaigns(campaignsData);
    setCalendarEvents(calendarData);
    setKanbanBoards(kanbanData);
    setAgentMemory(memoryData);
    setAgentReasoning(reasoningData);
    setAgentLogs(logsData);
    setProactiveNotifications(notificationsData);
  };

  const loadClientSpecificData = async () => {
    const [campaignsData, funnelDataResult, calendarData, kanbanData] = await Promise.all([
      getCampaigns(selectedClient),
      getFunnelData(selectedClient),
      getCalendarEvents(selectedClient),
      getKanbanBoards(selectedClient)
    ]);

    setCampaigns(campaignsData);
    setFunnelData(funnelDataResult);
    setCalendarEvents(calendarData);
    setKanbanBoards(kanbanData);
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: chatInput,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);
    
    const response = await getAgentResponse(chatInput);
    
    const agentMessage = {
      id: Date.now() + 1,
      type: 'agent',
      message: response,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { type: 'approve', label: 'Aplicar Sugestão' },
        { type: 'clarify', label: 'Mais Detalhes' }
      ]
    };
    
    setChatMessages(prev => [...prev, agentMessage]);
    setIsLoading(false);
  };

  const handleNotificationFeedback = async (notificationId: string, decision: string, feedback?: string) => {
    const feedbackData = {
      notificationId,
      decision,
      feedback
    };

    await submitAgentFeedback(feedbackData);
    
    // Recarregar notificações
    const updatedNotifications = await getProactiveNotifications();
    setProactiveNotifications(updatedNotifications);
    
    // Fechar modal
    setSelectedNotification(null);
    
    // Recarregar outros dados se ações foram implementadas
    if (decision === 'approve') {
      await loadAllData();
    }
  };

  // Componente Seletor de Cliente
  const ClientSelector = () => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Cliente Selecionado:</label>
      <select 
        value={selectedClient} 
        onChange={(e) => setSelectedClient(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">Todos os Clientes</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name} ({client.type})
          </option>
        ))}
      </select>
    </div>
  );

  // Componente Dashboard
  const DashboardPage = () => (
    <div className="space-y-6">
      <ClientSelector />
      
      {/* Métricas principais */}
      <div data-tutorial="dashboard-metrics" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardData?.metrics.map((metric: any, index: number) => {
          const IconComponent = metric.icon === 'users' ? Users :
                               metric.icon === 'trending-up' ? TrendingUp :
                               metric.icon === 'heart' ? Heart :
                               metric.icon === 'building' ? Building : DollarSign;
          
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    {metric.change !== 0 && (
                      <p className="text-xs text-green-600">+{metric.change}% vs mês anterior</p>
                    )}
                  </div>
                  <IconComponent className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alertas */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas Inteligentes</CardTitle>
          <CardDescription>Insights e recomendações do MARGENT</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dashboardData?.alerts.map((alert: any) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant={alert.type === 'success' ? 'default' : alert.type === 'warning' ? 'secondary' : 'outline'}>
                    {alert.type}
                  </Badge>
                  <span className="text-sm">{alert.message}</span>
                  {alert.clientId && (
                    <Badge variant="outline" className="text-xs">
                      {clients.find(c => c.id === alert.clientId)?.name || 'Cliente'}
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-gray-500">{alert.time} atrás</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Componente Campanhas
  const CampaignsPage = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Campanhas de Marketing</h2>
        <Button>Nova Campanha</Button>
      </div>
      
      <ClientSelector />
      
      <Card data-tutorial="campaigns-table">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campanha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leads</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversão</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criado por</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {campaigns.map((campaign) => {
                  const client = clients.find(c => c.id === campaign.clientId);
                  return (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.channel}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: client?.primaryColor || '#gray' }}
                          ></div>
                          <span className="text-sm">{client?.name || 'Cliente'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={campaign.status === 'Ativa' ? 'default' : campaign.status === 'Pausada' ? 'secondary' : 'outline'}>
                          {campaign.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-medium">{campaign.kpis.leads}</td>
                      <td className="px-6 py-4">{(campaign.kpis.convRate * 100).toFixed(1)}%</td>
                      <td className="px-6 py-4">
                        <Badge variant={campaign.createdBy === 'agent' ? 'default' : 'outline'}>
                          {campaign.createdBy === 'agent' ? 'Agente' : 'Humano'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Componente Notificações Proativas com Modal de Feedback
  const NotificationsPage = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Notificações Proativas</h2>
      <Card>
        <CardHeader>
          <CardTitle>Alertas e Sugestões do Agente</CardTitle>
          <CardDescription>O MARGENT identifica oportunidades e solicita sua aprovação</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {proactiveNotifications.map((notification: any) => (
            <div key={notification.id} className="p-4 border rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant={
                    notification.type === 'critical' ? 'destructive' : 
                    notification.type === 'warning' ? 'secondary' : 
                    notification.type === 'suggestion' ? 'default' : 'outline'
                  }>
                    {notification.type === 'suggestion' ? <Lightbulb className="w-3 h-3 mr-1" /> : 
                     notification.type === 'warning' ? <AlertTriangle className="w-3 h-3 mr-1" /> : 
                     <Info className="w-3 h-3 mr-1" />}
                    {notification.type}
                  </Badge>
                  <Badge variant="outline" className={
                    notification.status === 'pending' ? 'border-yellow-300 text-yellow-700' :
                    notification.status === 'approved' ? 'border-green-300 text-green-700' :
                    notification.status === 'implemented' ? 'border-blue-300 text-blue-700' :
                    'border-red-300 text-red-700'
                  }>
                    {notification.status === 'pending' ? <Clock className="w-3 h-3 mr-1" /> :
                     notification.status === 'approved' ? <CheckCircle className="w-3 h-3 mr-1" /> :
                     notification.status === 'implemented' ? <CheckCircle className="w-3 h-3 mr-1" /> :
                     <XCircle className="w-3 h-3 mr-1" />}
                    {notification.status}
                  </Badge>
                </div>
                <span className="text-xs text-gray-500">{notification.timestamp}</span>
              </div>
              
              <h3 className="font-semibold text-lg mb-2">{notification.message}</h3>
              
              {notification.triggerEvent && (
                <p className="text-sm text-blue-600 mb-2">
                  <strong>Evento Detectado:</strong> {notification.triggerEvent}
                </p>
              )}
              
              {notification.actionProposal && (
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Proposta:</strong> {notification.actionProposal}
                </p>
              )}
              
              {notification.justification && (
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Justificativa:</strong> {notification.justification}
                </p>
              )}
              
              {notification.estimatedImpact && (
                <div className="bg-blue-50 p-3 rounded-md mb-3">
                  <p className="text-sm font-medium text-blue-800 mb-1">Impacto Estimado:</p>
                  <div className="grid grid-cols-3 gap-2 text-xs text-blue-700">
                    {notification.estimatedImpact.potentialLeads && (
                      <div>Leads: +{notification.estimatedImpact.potentialLeads}</div>
                    )}
                    {notification.estimatedImpact.estimatedROI && (
                      <div>ROI: {notification.estimatedImpact.estimatedROI}x</div>
                    )}
                    {notification.estimatedImpact.timeToImplement && (
                      <div>Tempo: {notification.estimatedImpact.timeToImplement}</div>
                    )}
                  </div>
                </div>
              )}
              
              {notification.status === 'pending' && (
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    onClick={() => setSelectedNotification(notification)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Revisar e Aprovar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleNotificationFeedback(notification.id, 'reject')}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Rejeitar
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modal de Feedback Detalhado */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Revisar Proposta do Agente</h2>
            
            <div className="mb-4">
              <h3 className="font-semibold text-lg">{selectedNotification.message}</h3>
              <p className="text-gray-600 mt-2">{selectedNotification.justification}</p>
            </div>

            {selectedNotification.proposedActions && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Ações Propostas:</h4>
                <div className="space-y-3">
                  {selectedNotification.proposedActions.map((action: any) => (
                    <div key={action.id} className="border rounded-lg p-4">
                      <h5 className="font-medium">{action.title}</h5>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                      
                      {action.parameters && (
                        <div className="mt-2 text-xs text-gray-500">
                          <strong>Parâmetros:</strong>
                          {action.parameters.budget && <span> Orçamento: R$ {action.parameters.budget}</span>}
                          {action.parameters.duration && <span> • Duração: {action.parameters.duration}</span>}
                          {action.parameters.channels && <span> • Canais: {action.parameters.channels.join(', ')}</span>}
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-gray-500">
                          {action.estimatedCost && <span>Custo: R$ {action.estimatedCost}</span>}
                          {action.estimatedTime && <span> • Tempo: {action.estimatedTime}</span>}
                        </div>
                        <Badge variant="outline">{action.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <Button 
                onClick={() => handleNotificationFeedback(selectedNotification.id, 'approve')}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Aprovar e Implementar
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleNotificationFeedback(selectedNotification.id, 'reject')}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Rejeitar
              </Button>
              <Button 
                variant="outline"
                onClick={() => setSelectedNotification(null)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Outros componentes (Funil, Calendário, Chat, etc.) mantidos similares mas adaptados para clientes
  const FunnelPage = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Funil de Vendas</h2>
      <ClientSelector />
      
      {selectedClient !== 'all' && funnelData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card data-tutorial="funnel-visualization">
            <CardHeader>
              <CardTitle>Visualização do Funil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funnelData.stages.map((stage: any, index: number) => (
                  <div key={index} className="relative">
                    <div 
                      className="bg-blue-500 text-white p-4 rounded-lg"
                      style={{ width: `${stage.percentage}%`, minWidth: '200px' }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{stage.name}</span>
                        <span>{stage.leads} leads</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leads Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {funnelData.recentLeads.map((lead: any) => (
                  <div key={lead.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.source} • {lead.stage}</div>
                      {lead.interestedService && (
                        <div className="text-xs text-blue-600">Interesse: {lead.interestedService}</div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{lead.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {selectedClient === 'all' && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Selecione um cliente específico para visualizar o funil de vendas</p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const CalendarPage = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Calendário Editorial</h2>
        <Button>Novo Conteúdo</Button>
      </div>
      
      <ClientSelector />
      
      <Card data-tutorial="calendar-view">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {calendarEvents.map((event) => {
              const client = clients.find(c => c.id === event.clientId);
              return (
                <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{event.channel}</Badge>
                    <span className="text-xs text-gray-500">{event.date}</span>
                  </div>
                  <h3 className="font-medium mb-2">{event.title}</h3>
                  {client && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: client.primaryColor }}
                      ></div>
                      <span className="text-xs text-gray-600">{client.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <Badge variant={event.status === 'Agendado' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                    <div className="flex space-x-1">
                      <Badge variant="outline" className="text-xs">{event.type}</Badge>
                      <Badge variant={event.createdBy === 'agent' ? 'default' : 'outline'} className="text-xs">
                        {event.createdBy === 'agent' ? 'Agente' : 'Humano'}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ChatPage = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Interações do Agente</h2>
      <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
        {chatMessages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.type === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border shadow-sm'
            }`}>
              <p className="text-sm">{message.message}</p>
              <span className="text-xs opacity-70">{message.timestamp}</span>
              
              {message.actions && (
                <div className="mt-3 space-x-2">
                  {message.actions.map((action: any, idx: number) => (
                    <Button 
                      key={idx} 
                      size="sm" 
                      variant={action.type === 'approve' ? 'default' : 'outline'}
                      className="text-xs"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border shadow-sm px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span className="text-sm text-gray-500">MARGENT está pensando...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex space-x-2" data-tutorial="chat-input">
        <input 
          type="text" 
          placeholder="Digite sua mensagem em linguagem natural..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
        />
        <Button onClick={sendChatMessage}>Enviar</Button>
      </div>
    </div>
  );

  // Componentes Kanban, Raciocínio, Memória e Logs mantidos similares
  const KanbanPage = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Kanban de Tarefas</h2>
      <ClientSelector />
      {kanbanBoards.map((board: any) => (
        <Card key={board.id}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>{board.title}</span>
              {board.clientId && (
                <Badge variant="outline">
                  {clients.find(c => c.id === board.clientId)?.name}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 overflow-x-auto">
              {board.lists.map((list: any) => (
                <div key={list.id} className="flex-shrink-0 w-72 bg-gray-100 rounded-lg p-3">
                  <h3 className="font-semibold mb-3">{list.title}</h3>
                  <div className="space-y-2">
                    {list.cards.map((card: any) => (
                      <div key={card.id} className="bg-white p-3 rounded-md shadow-sm border border-gray-200">
                        <p className="font-medium">{card.title}</p>
                        {card.description && <p className="text-sm text-gray-600">{card.description}</p>}
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {card.priority && (
                            <Badge variant={card.priority === 'high' ? 'destructive' : card.priority === 'medium' ? 'secondary' : 'outline'} className="text-xs">
                              {card.priority}
                            </Badge>
                          )}
                          {card.estimatedHours && (
                            <Badge variant="outline" className="text-xs">
                              {card.estimatedHours}h
                            </Badge>
                          )}
                        </div>
                        
                        {card.members && (
                          <div className="flex space-x-1 mt-2">
                            {card.members.map((member: string) => (
                              <Badge key={member} variant="outline">{member}</Badge>
                            ))}
                          </div>
                        )}
                        {card.tags && (
                          <div className="flex space-x-1 mt-2">
                            {card.tags.map((tag: string) => (
                              <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        )}
                        {card.dueDate && <p className="text-xs text-gray-500 mt-2">Vencimento: {card.dueDate}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const ReasoningPage = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Raciocínio do Agente</h2>
      <Card>
        <CardHeader>
          <CardTitle>Processo de Tomada de Decisão</CardTitle>
          {agentReasoning?.triggerEvent && (
            <CardDescription>
              Evento Gatilho: {agentReasoning.triggerEvent}
              {agentReasoning.affectedClients && (
                <span> • Clientes Afetados: {agentReasoning.affectedClients.length}</span>
              )}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Percepção</h3>
            <ul className="list-disc pl-5 space-y-1">
              {agentReasoning?.perception.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Raciocínio/Planejamento</h3>
            <ul className="list-disc pl-5 space-y-1">
              {agentReasoning?.reasoningPlanning.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Ação Planejada</h3>
            <ul className="list-disc pl-5 space-y-1">
              {agentReasoning?.plannedAction.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Feedback/Reflexão</h3>
            <ul className="list-disc pl-5 space-y-1">
              {agentReasoning?.feedbackReflection.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const MemoryPage = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Memória do Agente</h2>
      <Card>
        <CardHeader>
          <CardTitle>Memória de Trabalho</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">Contexto Atual:</p>
            <p className="text-gray-700">{agentMemory?.workingMemory.context}</p>
          </div>
          <div>
            <p className="font-medium">Clientes Ativos:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {agentMemory?.workingMemory.activeClients.map((client: string, index: number) => (
                <Badge key={index} variant="outline">{client}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium">Tarefas Atuais:</p>
            <ul className="list-disc pl-5 space-y-1">
              {agentMemory?.workingMemory.tasks.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium">Problemas Identificados:</p>
            <ul className="list-disc pl-5 space-y-1">
              {agentMemory?.workingMemory.identifiedIssues.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Memória de Longo Prazo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">Preferências do Usuário:</p>
            <ul className="list-disc pl-5 space-y-1">
              {agentMemory?.longTermMemory.userPreferences.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium">Histórico do Trello:</p>
            <ul className="list-disc pl-5 space-y-1">
              {agentMemory?.longTermMemory.trelloHistory.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium">Padrões Identificados:</p>
            <ul className="list-disc pl-5 space-y-1">
              {agentMemory?.longTermMemory.patterns.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          {agentMemory?.longTermMemory.clientInsights && (
            <div>
              <p className="font-medium">Insights por Cliente:</p>
              <div className="space-y-3 mt-2">
                {Object.entries(agentMemory.longTermMemory.clientInsights).map(([clientId, insights]: [string, any]) => {
                  const client = clients.find(c => c.id === clientId);
                  return (
                    <div key={clientId} className="border rounded-lg p-3">
                      <h4 className="font-medium text-sm mb-2">{client?.name || clientId}</h4>
                      <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
                        {insights.map((insight: string, index: number) => (
                          <li key={index}>{insight}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const LogsPage = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Logs e Monitoramento</h2>
      <Card>
        <CardHeader>
          <CardTitle>Execuções do Agente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {agentLogs.map((log: any) => {
            const client = log.clientId ? clients.find(c => c.id === log.clientId) : null;
            return (
              <div key={log.id} className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{log.action}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant={log.status === 'success' ? 'default' : log.status === 'failed' ? 'destructive' : 'outline'}>
                      {log.status}
                    </Badge>
                    {client && (
                      <Badge variant="outline" className="text-xs">
                        {client.name}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Justificativa: {log.justification}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div>
                    <span>Tempo: {log.executionTimeMs}ms</span>
                    {log.estimatedCost && (
                      <span className="ml-4">
                        Custo:
                        {log.estimatedCost.tokens && <span> {log.estimatedCost.tokens} tokens</span>}
                        {log.estimatedCost.apiCalls && <span> • {log.estimatedCost.apiCalls} chamadas</span>}
                        {log.estimatedCost.usd && <span> • ${log.estimatedCost.usd.toFixed(2)}</span>}
                      </span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {log.actionType}
                  </Badge>
                </div>
                <span className="text-xs text-gray-400 mt-2 block">{log.timestamp}</span>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, component: DashboardPage },
    { id: 'campaigns', label: 'Campanhas', icon: Target, component: CampaignsPage },
    { id: 'funnel', label: 'Funil de Vendas', icon: TrendingUp, component: FunnelPage },
    { id: 'calendar', label: 'Calendário Editorial', icon: Calendar, component: CalendarPage },
    { id: 'kanban', label: 'Kanban', icon: ListTodo, component: KanbanPage },
    { id: 'chat', label: 'Interações do Agente', icon: MessageSquare, component: ChatPage },
    { id: 'reasoning', label: 'Raciocínio', icon: Brain, component: ReasoningPage },
    { id: 'memory', label: 'Memória', icon: Database, component: MemoryPage },
    { id: 'notifications', label: 'Notificações', icon: Bell, component: NotificationsPage },
    { id: 'logs', label: 'Logs', icon: ScrollText, component: LogsPage },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || DashboardPage;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b" data-tutorial="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">MARGENT</h1>
              <Badge variant="outline">Agente Cognitivo v1.0</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={startTutorial}
                variant="outline" 
                size="sm"
                className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar Exemplo
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const hasNotifications = tab.id === 'notifications' && 
                  proactiveNotifications.some((n: any) => n.status === 'pending');
                
                return (
                  <button
                    key={tab.id}
                    data-tutorial={`nav-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </div>
                    {hasNotifications && (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Panel */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {React.createElement(tabs.find(tab => tab.id === activeTab)?.icon || BarChart3, { className: "w-5 h-5" })}
                  <span>{tabs.find(tab => tab.id === activeTab)?.label}</span>
                </CardTitle>
                <CardDescription>
                  {activeTab === 'dashboard' && 'Visão geral das métricas de todos os clientes'}
                  {activeTab === 'campaigns' && 'Gerencie campanhas de marketing por cliente'}
                  {activeTab === 'funnel' && 'Analise funis de vendas específicos por cliente'}
                  {activeTab === 'calendar' && 'Planeje conteúdo editorial para cada cliente'}
                  {activeTab === 'kanban' && 'Visualize tarefas organizadas por cliente'}
                  {activeTab === 'chat' && 'Interaja com o agente sobre estratégias'}
                  {activeTab === 'reasoning' && 'Visualize o processo de tomada de decisão'}
                  {activeTab === 'memory' && 'Explore a memória e contexto do agente'}
                  {activeTab === 'notifications' && 'Revise sugestões proativas do agente'}
                  {activeTab === 'logs' && 'Monitore execuções e custos do agente'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ActiveComponent />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Tutorial Tooltip */}
      <TutorialTooltip />
    </div>
  );
}

// Componente principal com Provider
function App() {
  return (
    <TutorialProvider>
      <AppContent />
    </TutorialProvider>
  );
}

export default App;

