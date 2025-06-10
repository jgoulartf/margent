import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TutorialStep {
  id: string;
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: () => void;
}

interface TutorialContextType {
  isActive: boolean;
  currentStep: number;
  steps: TutorialStep[];
  startTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  endTutorial: () => void;
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    target: 'app-header',
    title: '👋 Bem-vindo ao MARGENT!',
    content: 'Sou seu agente cognitivo especializado em marketing digital para consultórios. Vou te mostrar como posso revolucionar sua estratégia de marketing!',
    position: 'bottom'
  },
  {
    id: 'dashboard',
    target: 'dashboard-metrics',
    title: '📊 Dashboard Inteligente',
    content: 'Aqui você vê métricas em tempo real: leads, conversões, engajamento e ROI. Tudo calculado automaticamente com insights acionáveis.',
    position: 'bottom'
  },
  {
    id: 'campaigns-nav',
    target: 'nav-campaigns',
    title: '🎯 Gestão de Campanhas',
    content: 'Vamos ver como gerencio suas campanhas de marketing digital. Clique aqui para explorar!',
    position: 'right',
    action: () => {} // Será definida no componente
  },
  {
    id: 'campaigns-list',
    target: 'campaigns-table',
    title: '📈 Campanhas Otimizadas',
    content: 'Analiso performance de cada campanha e sugiro otimizações automáticas. Veja como suas campanhas estão performando!',
    position: 'top'
  },
  {
    id: 'funnel-nav',
    target: 'nav-funnel',
    title: '🔄 Funil de Vendas',
    content: 'Agora vou mostrar como otimizo seu funil de vendas. Clique para ver a mágica acontecer!',
    position: 'right',
    action: () => {} // Será definida no componente
  },
  {
    id: 'funnel-chart',
    target: 'funnel-visualization',
    title: '🎯 Funil Inteligente',
    content: 'Identifico gargalos no seu funil e sugiro ações específicas para cada etapa. Veja onde seus leads estão "travando"!',
    position: 'left'
  },
  {
    id: 'calendar-nav',
    target: 'nav-calendar',
    title: '📅 Calendário Editorial',
    content: 'Crio e gerencio seu calendário de conteúdo automaticamente. Vamos ver!',
    position: 'right',
    action: () => {} // Será definida no componente
  },
  {
    id: 'calendar-content',
    target: 'calendar-view',
    title: '✨ Conteúdo Automatizado',
    content: 'Gero ideias de posts, horários otimizados e até mesmo o copy completo baseado no seu nicho e audiência!',
    position: 'top'
  },
  {
    id: 'chat-nav',
    target: 'nav-chat',
    title: '💬 Chat Inteligente',
    content: 'Aqui você conversa comigo em linguagem natural. Posso responder dúvidas, criar estratégias e dar insights!',
    position: 'right',
    action: () => {} // Será definida no componente
  },
  {
    id: 'chat-demo',
    target: 'chat-input',
    title: '🤖 Inteligência Conversacional',
    content: 'Experimente perguntar: "Como melhorar meu engajamento no Instagram?" ou "Crie uma campanha para meu consultório"',
    position: 'top'
  },
  {
    id: 'conclusion',
    target: 'app-header',
    title: '🚀 Pronto para Decolar!',
    content: 'Agora você conhece o poder do MARGENT! Posso automatizar 80% do seu marketing digital enquanto você foca no que faz de melhor: cuidar dos seus pacientes.',
    position: 'bottom'
  }
];

interface TutorialProviderProps {
  children: ReactNode;
}

export const TutorialProvider: React.FC<TutorialProviderProps> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');

  const startTutorial = () => {
    setIsActive(true);
    setCurrentStep(0);
    setActiveTab('dashboard');
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      const nextStepData = tutorialSteps[currentStep + 1];
      
      // Executar ação específica do step se existir
      if (nextStepData.action) {
        nextStepData.action();
      }
      
      // Navegar para a aba correta baseada no step
      if (nextStepData.id.includes('campaigns')) {
        setActiveTab('campaigns');
      } else if (nextStepData.id.includes('funnel')) {
        setActiveTab('funnel');
      } else if (nextStepData.id.includes('calendar')) {
        setActiveTab('calendar');
      } else if (nextStepData.id.includes('chat')) {
        setActiveTab('chat');
      }
      
      setCurrentStep(currentStep + 1);
    } else {
      endTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const endTutorial = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  return (
    <TutorialContext.Provider
      value={{
        isActive,
        currentStep,
        steps: tutorialSteps,
        startTutorial,
        nextStep,
        prevStep,
        endTutorial,
        setActiveTab,
        activeTab
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};

