// Helper function to get data from localStorage
const getFromLocalStorage = (key: string, defaultValue: any) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Helper function to set data to localStorage
const setToLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item ${key} to localStorage:`, error);
  }
};

// Mock API para simular dados do agente MARGENT
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Dados mockados para clientes da agência
export async function getClients() {
  await sleep(300);
  const defaultClients = [
    {
      id: 'client-1',
      name: 'Clínica Dermatologia ABC',
      type: 'aesthetics',
      primaryColor: '#3B82F6',
      location: 'São Paulo, SP',
      contactPerson: 'Dra. Maria Silva',
      email: 'contato@dermaabc.com.br',
      phone: '(11) 99999-1234',
      services: ['Dermatologia Clínica', 'Estética Facial', 'Tratamentos a Laser'],
      targetAudience: ['Mulheres 25-45 anos', 'Classe A/B', 'Interessadas em estética'],
      monthlyBudget: 5000,
      activeChannels: ['Instagram', 'Facebook', 'Google Ads'],
      joinDate: '2024-01-15',
      status: 'active',
      preferences: {
        notificationFrequency: 'daily',
        autoApproveActions: false,
        preferredPostingTimes: ['19:00', '21:00'],
        contentStyle: 'professional'
      }
    },
    {
      id: 'client-2',
      name: 'Consultório Odontológico Sorriso',
      type: 'dentist',
      primaryColor: '#10B981',
      location: 'Rio de Janeiro, RJ',
      contactPerson: 'Dr. João Santos',
      email: 'contato@sorriso.com.br',
      phone: '(21) 99999-5678',
      services: ['Ortodontia', 'Implantes', 'Clareamento Dental', 'Limpeza'],
      targetAudience: ['Famílias', 'Adultos 30-60 anos', 'Crianças e adolescentes'],
      monthlyBudget: 3000,
      activeChannels: ['Facebook', 'Google Ads', 'WhatsApp'],
      joinDate: '2024-03-10',
      status: 'active',
      preferences: {
        notificationFrequency: 'weekly',
        autoApproveActions: true,
        preferredPostingTimes: ['18:00', '20:00'],
        contentStyle: 'educational'
      }
    },
    {
      id: 'client-3',
      name: 'Fisioterapia Movimento',
      type: 'physiotherapy',
      primaryColor: '#F59E0B',
      location: 'Belo Horizonte, MG',
      contactPerson: 'Ft. Ana Costa',
      email: 'contato@movimento.com.br',
      phone: '(31) 99999-9012',
      services: ['Fisioterapia Ortopédica', 'RPG', 'Pilates Clínico'],
      targetAudience: ['Atletas', 'Idosos', 'Pessoas com dores crônicas'],
      monthlyBudget: 2000,
      activeChannels: ['Instagram', 'Facebook'],
      joinDate: '2024-02-20',
      status: 'trial',
      preferences: {
        notificationFrequency: 'weekly',
        autoApproveActions: false,
        preferredPostingTimes: ['17:00', '19:00'],
        contentStyle: 'educational'
      }
    }
  ];
  return getFromLocalStorage('clients', defaultClients);
}

export async function saveClients(clients: any[]) {
  await sleep(100);
  setToLocalStorage('clients', clients);
  return { success: true };
}

// Dados mockados para campanhas (agora por cliente)
export async function getCampaigns(clientId?: string) {
  await sleep(500);
  const defaultCampaigns = [
    {
      id: '1',
      clientId: 'client-1',
      name: 'Campanha Verão - Tratamentos Faciais',
      status: 'Ativa',
      start: '2025-05-01',
      end: '2025-06-30',
      budget: 2500,
      kpis: { leads: 85, convRate: 0.18, engagement: 0.12 },
      channel: 'Instagram + Facebook',
      targetAudience: ['Mulheres 25-40 anos'],
      createdBy: 'agent'
    },
    {
      id: '2',
      clientId: 'client-1',
      name: 'Promoção Limpeza de Pele',
      status: 'Pausada',
      start: '2025-04-15',
      end: '2025-05-15',
      budget: 800,
      kpis: { leads: 42, convRate: 0.25, engagement: 0.08 },
      channel: 'Facebook',
      targetAudience: ['Mulheres 20-35 anos'],
      createdBy: 'human'
    },
    {
      id: '3',
      clientId: 'client-2',
      name: 'Campanha Ortodontia Invisível',
      status: 'Ativa',
      start: '2025-05-10',
      end: '2025-07-10',
      budget: 1800,
      kpis: { leads: 34, convRate: 0.15, engagement: 0.09 },
      channel: 'Google Ads + Facebook',
      targetAudience: ['Adultos 25-45 anos'],
      createdBy: 'agent'
    },
    {
      id: '4',
      clientId: 'client-3',
      name: 'Pilates Clínico - Dores nas Costas',
      status: 'Ativa',
      start: '2025-04-20',
      end: '2025-06-20',
      budget: 1200,
      kpis: { leads: 28, convRate: 0.22, engagement: 0.14 },
      channel: 'Instagram + Facebook',
      targetAudience: ['Adultos 30-60 anos'],
      createdBy: 'agent'
    }
  ];
  
  const campaigns = getFromLocalStorage('campaigns', defaultCampaigns);
  return clientId ? campaigns.filter((c: any) => c.clientId === clientId) : campaigns;
}

export async function saveCampaigns(campaigns: any[]) {
  await sleep(100);
  setToLocalStorage('campaigns', campaigns);
  return { success: true };
}

// Dados mockados para funil de vendas (por cliente)
export async function getFunnelData(clientId: string) {
  await sleep(400);
  const defaultFunnelData = {
    'client-1': {
      clientId: 'client-1',
      stages: [
        { name: 'Descoberta', leads: 245, percentage: 100 },
        { name: 'Interesse', leads: 156, percentage: 64 },
        { name: 'Consideração', leads: 89, percentage: 36 },
        { name: 'Decisão', leads: 34, percentage: 14 },
        { name: 'Conversão', leads: 18, percentage: 7 }
      ],
      recentLeads: [
        { id: 1, clientId: 'client-1', name: 'Maria Silva', source: 'Instagram', stage: 'Interesse', date: '2025-06-08', phone: '(11) 99999-1234', email: 'maria@email.com', interestedService: 'Botox' },
        { id: 2, clientId: 'client-1', name: 'Ana Costa', source: 'Facebook', stage: 'Consideração', date: '2025-06-07', phone: '(11) 99999-5678', email: 'ana@email.com', interestedService: 'Limpeza de Pele' }
      ]
    },
    'client-2': {
      clientId: 'client-2',
      stages: [
        { name: 'Descoberta', leads: 180, percentage: 100 },
        { name: 'Interesse', leads: 120, percentage: 67 },
        { name: 'Consideração', leads: 65, percentage: 36 },
        { name: 'Decisão', leads: 25, percentage: 14 },
        { name: 'Conversão', leads: 12, percentage: 7 }
      ],
      recentLeads: [
        { id: 3, clientId: 'client-2', name: 'João Santos', source: 'Google Ads', stage: 'Decisão', date: '2025-06-06', phone: '(21) 99999-9012', email: 'joao@email.com', interestedService: 'Ortodontia' }
      ]
    },
    'client-3': {
      clientId: 'client-3',
      stages: [
        { name: 'Descoberta', leads: 95, percentage: 100 },
        { name: 'Interesse', leads: 68, percentage: 72 },
        { name: 'Consideração', leads: 42, percentage: 44 },
        { name: 'Decisão', leads: 18, percentage: 19 },
        { name: 'Conversão', leads: 8, percentage: 8 }
      ],
      recentLeads: [
        { id: 4, clientId: 'client-3', name: 'Pedro Lima', source: 'Instagram', stage: 'Conversão', date: '2025-06-05', phone: '(31) 99999-3456', email: 'pedro@email.com', interestedService: 'Pilates' }
      ]
    }
  };
  
  const allFunnelData = getFromLocalStorage('funnelData', defaultFunnelData);
  return allFunnelData[clientId] || { clientId, stages: [], recentLeads: [] };
}

export async function saveFunnelData(clientId: string, funnelData: any) {
  await sleep(100);
  const allFunnelData = getFromLocalStorage('funnelData', {});
  allFunnelData[clientId] = funnelData;
  setToLocalStorage('funnelData', allFunnelData);
  return { success: true };
}

// Dados mockados para notificações proativas (incluindo Dia das Mães)
export async function getProactiveNotifications() {
  await sleep(300);
  const defaultNotifications = [
    {
      id: 'notif-mothers-day',
      type: 'suggestion',
      message: 'Oportunidade: Dia das Mães se aproximando',
      timestamp: '2025-06-10 08:00:00',
      actionProposal: 'Criar campanhas personalizadas para o Dia das Mães para todos os clientes ativos',
      justification: 'Detectado evento sazonal "Dia das Mães" (12/05/2025) se aproximando. Análise histórica mostra aumento de 40% em conversões durante esta data para clínicas de estética e 25% para consultórios odontológicos.',
      triggerEvent: 'seasonal_event_detected',
      status: 'pending',
      estimatedImpact: {
        potentialLeads: 150,
        estimatedROI: 3.2,
        timeToImplement: '2-3 dias'
      },
      proposedActions: [
        {
          id: 'action-1',
          type: 'create_campaign',
          title: 'Campanha Dia das Mães - Clínica Dermatologia ABC',
          description: 'Campanha focada em tratamentos de rejuvenescimento para presentear mães',
          parameters: {
            clientId: 'client-1',
            budget: 1500,
            duration: '7 dias',
            channels: ['Instagram', 'Facebook'],
            targetAudience: ['Filhos/filhas 25-45 anos', 'Mulheres 45-65 anos']
          },
          estimatedCost: 1500,
          estimatedTime: '1 dia'
        },
        {
          id: 'action-2',
          type: 'create_campaign',
          title: 'Campanha Dia das Mães - Consultório Sorriso',
          description: 'Promoção especial de clareamento dental para mães',
          parameters: {
            clientId: 'client-2',
            budget: 800,
            duration: '5 dias',
            channels: ['Facebook', 'Google Ads'],
            targetAudience: ['Famílias', 'Mulheres 35-55 anos']
          },
          estimatedCost: 800,
          estimatedTime: '1 dia'
        },
        {
          id: 'action-3',
          type: 'create_content',
          title: 'Conteúdo Educativo - Cuidados com a Postura',
          description: 'Posts sobre cuidados posturais para mães que trabalham',
          parameters: {
            clientId: 'client-3',
            contentType: 'carousel',
            quantity: 5,
            channels: ['Instagram', 'Facebook']
          },
          estimatedCost: 0,
          estimatedTime: '2 horas'
        }
      ]
    },
    {
      id: 'notif-2',
      type: 'warning',
      message: 'Carga de trabalho desequilibrada - Cliente Dermatologia ABC',
      timestamp: '2025-06-09 17:00:00',
      actionProposal: 'Redistribuir tarefas entre membros da equipe para evitar sobrecarga.',
      justification: 'Cliente "Dermatologia ABC" com 8 tarefas "Em Andamento" e 3 "A Fazer" com prazo curto.',
      clientId: 'client-1',
      status: 'pending'
    },
    {
      id: 'notif-3',
      type: 'info',
      message: 'Novo lead qualificado - Consultório Sorriso',
      timestamp: '2025-06-10 09:30:00',
      actionProposal: 'Entrar em contato com o lead "Carlos" para agendar consulta.',
      justification: 'Lead "Carlos" preencheu formulário de "Agendamento de Consulta" no site.',
      clientId: 'client-2',
      status: 'pending'
    }
  ];
  return getFromLocalStorage('proactiveNotifications', defaultNotifications);
}

export async function saveProactiveNotifications(notifications: any[]) {
  await sleep(100);
  setToLocalStorage('proactiveNotifications', notifications);
  return { success: true };
}

// Função para processar feedback do usuário sobre notificações
export async function submitAgentFeedback(feedback: any) {
  await sleep(200);
  
  // Buscar notificações existentes
  const notifications = await getProactiveNotifications();
  
  // Atualizar status da notificação
  const updatedNotifications = notifications.map((notif: any) => {
    if (notif.id === feedback.notificationId) {
      return {
        ...notif,
        status: feedback.decision === 'approve' ? 'approved' : 
                feedback.decision === 'reject' ? 'rejected' : 'pending'
      };
    }
    return notif;
  });
  
  // Salvar notificações atualizadas
  await saveProactiveNotifications(updatedNotifications);
  
  // Salvar feedback
  const existingFeedbacks = getFromLocalStorage('agentFeedbacks', []);
  const newFeedback = {
    ...feedback,
    timestamp: new Date().toISOString()
  };
  existingFeedbacks.push(newFeedback);
  setToLocalStorage('agentFeedbacks', existingFeedbacks);
  
  // Se aprovado, simular implementação das ações
  if (feedback.decision === 'approve') {
    await implementApprovedActions(feedback.notificationId);
  }
  
  return { success: true, feedback: newFeedback };
}

// Função para implementar ações aprovadas
async function implementApprovedActions(notificationId: string) {
  const notifications = await getProactiveNotifications();
  const notification = notifications.find((n: any) => n.id === notificationId);
  
  if (!notification || !notification.proposedActions) return;
  
  // Simular implementação das ações
  for (const action of notification.proposedActions) {
    if (action.type === 'create_campaign') {
      // Criar nova campanha
      const campaigns = await getCampaigns();
      const newCampaign = {
        id: `campaign-${Date.now()}`,
        clientId: action.parameters.clientId,
        name: action.title,
        status: 'Ativa',
        start: new Date().toISOString().split('T')[0],
        end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        budget: action.parameters.budget,
        kpis: { leads: 0, convRate: 0, engagement: 0 },
        channel: action.parameters.channels.join(' + '),
        targetAudience: action.parameters.targetAudience,
        createdBy: 'agent'
      };
      campaigns.push(newCampaign);
      await saveCampaigns(campaigns);
    }
    
    // Adicionar log da ação implementada
    const logs = getFromLocalStorage('agentLogs', []);
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: `Implementação: ${action.title}`,
      justification: `Ação aprovada pelo usuário para notificação ${notificationId}`,
      executionTimeMs: 500,
      estimatedCost: { tokens: 200, usd: 0.02 },
      status: 'success',
      clientId: action.parameters?.clientId,
      actionType: action.type
    };
    logs.push(newLog);
    setToLocalStorage('agentLogs', logs);
  }
  
  // Atualizar status da notificação para implementada
  const updatedNotifications = notifications.map((notif: any) => {
    if (notif.id === notificationId) {
      return { ...notif, status: 'implemented' };
    }
    return notif;
  });
  await saveProactiveNotifications(updatedNotifications);
}

// Dados mockados para dashboard (agregado de todos os clientes)
export async function getDashboardData() {
  await sleep(400);
  const clients = await getClients();
  const campaigns = await getCampaigns();
  
  // Calcular métricas agregadas
  const totalLeads = campaigns.reduce((sum: number, campaign: any) => sum + campaign.kpis.leads, 0);
  const avgConversion = campaigns.reduce((sum: number, campaign: any) => sum + campaign.kpis.convRate, 0) / campaigns.length;
  const avgEngagement = campaigns.reduce((sum: number, campaign: any) => sum + campaign.kpis.engagement, 0) / campaigns.length;
  
  const defaultDashboardData = {
    metrics: [
      { title: 'Total de Leads', value: totalLeads, change: 12, icon: 'users' },
      { title: 'Taxa de Conversão Média', value: `${(avgConversion * 100).toFixed(1)}%`, change: 3, icon: 'trending-up' },
      { title: 'Engajamento Médio', value: `${(avgEngagement * 100).toFixed(1)}%`, change: 8, icon: 'heart' },
      { title: 'Clientes Ativos', value: clients.filter((c: any) => c.status === 'active').length, change: 0, icon: 'building' }
    ],
    alerts: [
      { id: 1, type: 'info', message: `${totalLeads} novos leads aguardando contato`, time: '2h', clientId: 'client-1' },
      { id: 2, type: 'warning', message: 'Campanha "Botox" com baixo CTR (1.2%)', time: '4h', clientId: 'client-1' },
      { id: 3, type: 'success', message: 'Meta mensal de leads atingida', time: '1d' }
    ]
  };
  return getFromLocalStorage('dashboardData', defaultDashboardData);
}

export async function saveDashboardData(data: any) {
  await sleep(100);
  setToLocalStorage('dashboardData', data);
  return { success: true };
}

// Outras funções existentes (mantidas para compatibilidade)
export async function getCalendarEvents(clientId?: string) {
  await sleep(300);
  const defaultCalendarEvents = [
    {
      id: '1',
      clientId: 'client-1',
      title: 'Dicas de Skincare Matinal',
      date: '2025-06-10',
      channel: 'Instagram',
      status: 'Agendado',
      type: 'Post',
      content: 'Post educativo sobre rotina matinal de cuidados com a pele',
      createdBy: 'agent'
    },
    {
      id: '2',
      clientId: 'client-1',
      title: 'Depoimento Cliente - Tratamento Acne',
      date: '2025-06-11',
      channel: 'Facebook',
      status: 'Rascunho',
      type: 'Story',
      content: 'Story com depoimento de cliente satisfeita',
      createdBy: 'human'
    },
    {
      id: '3',
      clientId: 'client-2',
      title: 'Dicas de Higiene Bucal',
      date: '2025-06-12',
      channel: 'Instagram',
      status: 'Planejado',
      type: 'Post',
      content: 'Post educativo sobre escovação correta',
      createdBy: 'agent'
    }
  ];
  
  const events = getFromLocalStorage('calendarEvents', defaultCalendarEvents);
  return clientId ? events.filter((e: any) => e.clientId === clientId) : events;
}

export async function saveCalendarEvents(events: any[]) {
  await sleep(100);
  setToLocalStorage('calendarEvents', events);
  return { success: true };
}

export async function getAgentResponse(input: string): Promise<string> {
  await sleep(1000);
  
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('dia das mães') || lowerInput.includes('dia das maes')) {
    return 'Detectei que o Dia das Mães está se aproximando! Baseado na análise dos nossos clientes, sugiro criar campanhas personalizadas: para a Clínica Dermatologia ABC, uma campanha de rejuvenescimento; para o Consultório Sorriso, promoção de clareamento dental; e para a Fisioterapia Movimento, conteúdo sobre cuidados posturais para mães. Posso implementar essas campanhas automaticamente?';
  }
  
  if (lowerInput.includes('cliente') || lowerInput.includes('clientes')) {
    return 'Atualmente gerencio 3 clientes ativos: Clínica Dermatologia ABC (estética), Consultório Sorriso (odontologia) e Fisioterapia Movimento (fisioterapia). Cada cliente tem estratégias personalizadas baseadas em seu público-alvo e orçamento. Sobre qual cliente gostaria de saber mais?';
  }
  
  if (lowerInput.includes('funil') || lowerInput.includes('leads')) {
    return 'Analisando os funis de todos os clientes... A Dermatologia ABC tem 245 leads no topo do funil com 7% de conversão, o Consultório Sorriso tem 180 leads com melhor taxa de conversão (7%), e a Fisioterapia tem 95 leads mas com boa qualificação (8% de conversão). Sugiro otimizar o meio do funil para a Dermatologia ABC.';
  }
  
  return 'Como especialista em marketing para múltiplos clientes da área da saúde, posso ajudar com estratégias personalizadas para cada consultório. Sobre qual cliente ou estratégia gostaria de conversar?';
}

// Funções para Kanban, Memória, Raciocínio e Logs (mantidas com adaptações para clientes)
export async function getKanbanBoards(clientId?: string) {
  await sleep(500);
  const defaultBoards = [
    {
      id: 'board-1',
      title: 'Marketing Digital - Clínica Dermatologia ABC',
      clientId: 'client-1',
      lists: [
        {
          id: 'list-1',
          title: 'A Fazer',
          cards: [
            { 
              id: 'card-1', 
              title: 'Criar conteúdo para Dia das Mães', 
              description: 'Post para Instagram e Facebook sobre tratamentos para presentear mães', 
              tags: ['Conteúdo', 'Social Media'], 
              dueDate: '2025-05-05',
              clientId: 'client-1',
              priority: 'high',
              estimatedHours: 3
            }
          ]
        },
        {
          id: 'list-2',
          title: 'Em Andamento',
          cards: [
            { 
              id: 'card-2', 
              title: 'Otimizar campanha de verão', 
              description: 'Ajustar segmentação e criativos da campanha atual', 
              tags: ['Campanha', 'Tráfego Pago'], 
              members: ['Ana'],
              clientId: 'client-1',
              priority: 'medium',
              estimatedHours: 5
            }
          ]
        }
      ]
    },
    {
      id: 'board-2',
      title: 'Marketing Digital - Consultório Sorriso',
      clientId: 'client-2',
      lists: [
        {
          id: 'list-3',
          title: 'Planejamento',
          cards: [
            { 
              id: 'card-3', 
              title: 'Campanha ortodontia invisível', 
              description: 'Planejar campanha para público jovem adulto',
              tags: ['Campanha', 'Planejamento'],
              clientId: 'client-2',
              priority: 'medium',
              estimatedHours: 4
            }
          ]
        }
      ]
    }
  ];
  
  const boards = getFromLocalStorage('kanbanBoards', defaultBoards);
  return clientId ? boards.filter((b: any) => b.clientId === clientId) : boards;
}

export async function saveKanbanBoards(boards: any[]) {
  await sleep(100);
  setToLocalStorage('kanbanBoards', boards);
  return { success: true };
}

export async function getAgentMemory() {
  await sleep(300);
  const clients = await getClients();
  const defaultMemory = {
    workingMemory: {
      context: 'Gestão de Marketing para Múltiplos Clientes - Foco em Campanhas Sazonais',
      tasks: [
        'Criar campanhas do Dia das Mães para todos os clientes',
        'Otimizar funil de conversão da Clínica Dermatologia ABC',
        'Analisar performance das campanhas do Consultório Sorriso'
      ],
      identifiedIssues: [
        'Taxa de conversão baixa no meio do funil - Dermatologia ABC',
        'Necessidade de mais conteúdo educativo - Fisioterapia Movimento'
      ],
      activeClients: clients.filter((c: any) => c.status === 'active').map((c: any) => c.name)
    },
    longTermMemory: {
      userPreferences: [
        'Notificações detalhadas sobre oportunidades sazonais',
        'Aprovação manual para campanhas acima de R$ 2.000',
        'Relatórios semanais por cliente'
      ],
      trelloHistory: [
        'Cartão "Campanha Páscoa - Dermatologia ABC" concluído em 2025-04-20',
        'Board "Consultório Sorriso" criado em 2025-03-10',
        'Campanha "Ortodontia Invisível" aprovada em 2025-05-15'
      ],
      patterns: [
        'Campanhas sazonais têm 40% mais engajamento',
        'Clientes de estética respondem melhor a conteúdo visual',
        'Consultórios odontológicos preferem conteúdo educativo'
      ],
      clientInsights: {
        'client-1': [
          'Público responde bem a antes/depois',
          'Melhor horário de postagem: 19h-21h',
          'Instagram gera mais leads que Facebook'
        ],
        'client-2': [
          'Conteúdo educativo tem alta taxa de engajamento',
          'Famílias são o público principal',
          'Google Ads converte melhor que redes sociais'
        ],
        'client-3': [
          'Público busca soluções para dores específicas',
          'Depoimentos de pacientes são muito eficazes',
          'Instagram Stories funcionam bem para dicas rápidas'
        ]
      }
    }
  };
  return getFromLocalStorage('agentMemory', defaultMemory);
}

export async function saveAgentMemory(memory: any) {
  await sleep(100);
  setToLocalStorage('agentMemory', memory);
  return { success: true };
}

export async function getAgentReasoning() {
  await sleep(400);
  const defaultReasoning = {
    perception: [
      'Detectado evento sazonal: Dia das Mães (12/05/2025) em 2 dias',
      'Análise histórica: aumento de 40% em buscas por "presente para mãe" + "estética"',
      'Cliente Dermatologia ABC: orçamento disponível R$ 2.500',
      'Cliente Consultório Sorriso: preferência por campanhas educativas',
      'Cliente Fisioterapia Movimento: status trial, orçamento limitado'
    ],
    reasoningPlanning: [
      'Priorizar clientes com maior potencial de ROI para campanhas do Dia das Mães',
      'Personalizar abordagem: estética (rejuvenescimento), odonto (clareamento), fisio (cuidados posturais)',
      'Considerar orçamentos e preferências de cada cliente',
      'Criar timeline de implementação: 2 dias para aprovação + 1 dia para execução'
    ],
    plannedAction: [
      'Criar notificação proativa detalhando oportunidade do Dia das Mães',
      'Propor 3 ações específicas: campanha estética, campanha odonto, conteúdo fisio',
      'Incluir estimativas de ROI e impacto para cada cliente',
      'Aguardar feedback do usuário antes de implementar'
    ],
    feedbackReflection: [
      'Monitorar taxa de aprovação das sugestões sazonais',
      'Avaliar performance das campanhas implementadas vs. estimativas',
      'Ajustar algoritmo de detecção de oportunidades baseado no feedback'
    ],
    triggerEvent: 'seasonal_event_mothers_day',
    affectedClients: ['client-1', 'client-2', 'client-3']
  };
  return getFromLocalStorage('agentReasoning', defaultReasoning);
}

export async function saveAgentReasoning(reasoning: any) {
  await sleep(100);
  setToLocalStorage('agentReasoning', reasoning);
  return { success: true };
}

export async function getAgentLogs() {
  await sleep(600);
  const defaultLogs = [
    {
      id: 'log-1',
      timestamp: '2025-06-10 08:00:00',
      action: 'Detecção de oportunidade sazonal: Dia das Mães',
      justification: 'Sistema detectou proximidade do Dia das Mães e analisou potencial de campanhas para todos os clientes.',
      executionTimeMs: 2500,
      estimatedCost: { tokens: 800, apiCalls: 3, usd: 0.08 },
      status: 'success',
      actionType: 'notification'
    },
    {
      id: 'log-2',
      timestamp: '2025-06-09 14:30:00',
      action: 'Otimização de campanha - Dermatologia ABC',
      justification: 'Identificado baixo CTR (1.2%) na campanha "Tratamentos Faciais". Sugerindo ajustes na segmentação.',
      executionTimeMs: 1200,
      estimatedCost: { tokens: 500, apiCalls: 2, usd: 0.05 },
      status: 'success',
      clientId: 'client-1',
      actionType: 'optimization'
    },
    {
      id: 'log-3',
      timestamp: '2025-06-09 10:15:00',
      action: 'Criação de conteúdo educativo - Consultório Sorriso',
      justification: 'Geradas 5 ideias de posts sobre higiene bucal baseadas nas preferências do cliente.',
      executionTimeMs: 800,
      estimatedCost: { tokens: 300, usd: 0.03 },
      status: 'success',
      clientId: 'client-2',
      actionType: 'content_generation'
    },
    {
      id: 'log-4',
      timestamp: '2025-06-08 16:45:00',
      action: 'Análise de leads - Fisioterapia Movimento',
      justification: 'Analisados 15 novos leads. Identificados 3 leads qualificados para pilates clínico.',
      executionTimeMs: 600,
      estimatedCost: { tokens: 200, usd: 0.02 },
      status: 'success',
      clientId: 'client-3',
      actionType: 'lead_management'
    }
  ];
  return getFromLocalStorage('agentLogs', defaultLogs);
}

export async function saveAgentLogs(logs: any[]) {
  await sleep(100);
  setToLocalStorage('agentLogs', logs);
  return { success: true };
}

