export interface Client {
  id: string;
  name: string;
  type: 'clinic' | 'dentist' | 'aesthetics' | 'physiotherapy' | 'psychology' | 'other';
  logo?: string;
  primaryColor: string;
  location: string;
  contactPerson: string;
  email: string;
  phone: string;
  services: string[];
  targetAudience: string[];
  monthlyBudget: number;
  activeChannels: string[];
  joinDate: string;
  status: 'active' | 'paused' | 'trial';
  preferences: {
    notificationFrequency: 'daily' | 'weekly' | 'monthly';
    autoApproveActions: boolean;
    preferredPostingTimes: string[];
    contentStyle: 'professional' | 'casual' | 'educational';
  };
}

export interface Campaign {
  id: string;
  clientId: string;
  name: string;
  status: string;
  start: string;
  end: string;
  budget: number;
  kpis: {
    leads: number;
    convRate: number;
    engagement: number;
  };
  channel: string;
  targetAudience?: string[];
  createdBy: 'agent' | 'human';
}

export interface FunnelStage {
  name: string;
  leads: number;
  percentage: number;
}

export interface Lead {
  id: number;
  clientId: string;
  name: string;
  source: string;
  stage: string;
  date: string;
  phone: string;
  email?: string;
  interestedService?: string;
}

export interface FunnelData {
  clientId: string;
  stages: FunnelStage[];
  recentLeads: Lead[];
}

export interface CalendarEvent {
  id: string;
  clientId: string;
  title: string;
  date: string;
  channel: string;
  status: string;
  type: string;
  content?: string;
  createdBy: 'agent' | 'human';
}

export interface AnalyticsOverview {
  totalLeads: number;
  conversionRate: number;
  avgEngagement: number;
  roi: number;
}

export interface ChartDataPoint {
  month: string;
  value: number;
}

export interface AnalyticsData {
  clientId: string;
  overview: AnalyticsOverview;
  chartData: {
    engagement: ChartDataPoint[];
    leads: ChartDataPoint[];
  };
}

export interface ChatMessage {
  id: number;
  type: 'user' | 'agent';
  message: string;
  timestamp: string;
  clientId?: string;
  actions?: {
    type: string;
    label: string;
  }[];
}

export interface DashboardMetric {
  title: string;
  value: string | number;
  change: number;
  icon: string;
}

export interface DashboardAlert {
  id: number;
  type: 'info' | 'warning' | 'success';
  message: string;
  time: string;
  clientId?: string;
}

export interface DashboardData {
  metrics: DashboardMetric[];
  alerts: DashboardAlert[];
}

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  members?: string[];
  tags?: string[];
  dueDate?: string;
  clientId?: string;
  priority?: 'low' | 'medium' | 'high';
  estimatedHours?: number;
}

export interface KanbanList {
  id: string;
  title: string;
  cards: KanbanCard[];
}

export interface KanbanBoard {
  id: string;
  title: string;
  clientId?: string;
  lists: KanbanList[];
  isTemplate?: boolean;
}

export interface AgentMemory {
  workingMemory: {
    context: string;
    tasks: string[];
    identifiedIssues: string[];
    activeClients: string[];
  };
  longTermMemory: {
    userPreferences: string[];
    trelloHistory: string[];
    patterns: string[];
    clientInsights: { [clientId: string]: string[] };
  };
}

export interface AgentReasoning {
  perception: string[];
  reasoningPlanning: string[];
  plannedAction: string[];
  feedbackReflection: string[];
  triggerEvent?: string;
  affectedClients?: string[];
}

export interface AgentLogEntry {
  id: string;
  timestamp: string;
  action: string;
  justification: string;
  executionTimeMs: number;
  estimatedCost: {
    tokens?: number;
    apiCalls?: number;
    usd?: number;
  };
  status: 'success' | 'failed' | 'pending' | 'info';
  clientId?: string;
  actionType: 'campaign_creation' | 'content_generation' | 'lead_management' | 'optimization' | 'notification';
}

export interface ProactiveNotification {
  id: string;
  type: 'info' | 'warning' | 'critical' | 'suggestion';
  message: string;
  timestamp: string;
  actionProposal?: string;
  justification?: string;
  clientId?: string;
  triggerEvent?: string;
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
  estimatedImpact?: {
    potentialLeads?: number;
    estimatedROI?: number;
    timeToImplement?: string;
  };
  proposedActions?: ProposedAction[];
}

export interface ProposedAction {
  id: string;
  type: 'create_campaign' | 'create_content' | 'move_card' | 'send_notification' | 'schedule_post';
  title: string;
  description: string;
  parameters: any;
  estimatedCost?: number;
  estimatedTime?: string;
}

export interface AgentFeedback {
  notificationId: string;
  actionId?: string;
  decision: 'approve' | 'reject' | 'modify';
  feedback?: string;
  modifications?: any;
  timestamp: string;
}


