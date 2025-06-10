# MARGENT - Agente Cognitivo para Marketing Digital

## 🤖 Sobre o Projeto

MARGENT é um agente cognitivo especializado em marketing digital para consultórios médicos e clínicas. O sistema oferece uma interface de monitoramento e controle para um backend agentivo que utiliza LLMs, RAG e MCP para automatizar estratégias de marketing.

## ✨ Funcionalidades Principais

### 🧠 Sistema Agentivo Proativo
- **Detecção automática** de oportunidades sazonais (ex: Dia das Mães)
- **Notificações proativas** com propostas detalhadas
- **Sistema de aprovação** humana (Human-in-the-Loop)
- **Implementação automática** após aprovação

### 🏢 Gestão Multi-Cliente
- **Múltiplos clientes** com perfis únicos
- **Diferenciação visual** por tipo de negócio
- **Dados específicos** por cliente (campanhas, funil, calendário)
- **Seletor de cliente** em todas as seções

### 📊 Interface de Monitoramento
- **Dashboard agregado** com métricas de todos os clientes
- **Campanhas por cliente** com criação automática
- **Funil de vendas** específico por cliente
- **Kanban configurável** com tarefas organizadas
- **Logs detalhados** com custos e justificativas

### 🧠 Transparência Agentiva
- **Raciocínio explicável** (Percepção → Planejamento → Ação → Reflexão)
- **Memória contextual** (trabalho + longo prazo + insights)
- **Justificativas detalhadas** para cada ação
- **Monitoramento de custos** (tokens, API calls, USD)

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript + TailwindCSS
- **Backend**: FastAPI (preparado para integração)
- **Persistência**: localStorage (para prototipagem)
- **Integração Futura**: API do Trello
- **Deploy**: Vercel

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+
- pnpm (recomendado) ou npm

### Instalação
```bash
# Clone o repositório
git clone https://github.com/jgoulartf/margent.git
cd margent

# Instale as dependências
pnpm install

# Execute em modo de desenvolvimento
pnpm dev
```

### Build para Produção
```bash
# Build otimizado
pnpm build

# Preview do build
pnpm preview
```

## 🎯 Casos de Uso

### Exemplo: Detecção do Dia das Mães
1. **Agente detecta** proximidade do Dia das Mães
2. **Analisa histórico** de conversões sazonais
3. **Propõe campanhas específicas** para cada cliente:
   - Dermatologia: Tratamentos de rejuvenescimento
   - Odontologia: Clareamento dental para mães
   - Fisioterapia: Conteúdo sobre cuidados posturais
4. **Usuário revisa** propostas no modal detalhado
5. **Após aprovação**: Campanhas são criadas automaticamente

## 🏗️ Arquitetura

### Frontend (Interface de Monitoramento)
- **React + TypeScript** para tipagem segura
- **TailwindCSS** para design moderno e responsivo
- **Componentes reutilizáveis** para escalabilidade
- **Persistência local** via localStorage

### Backend (Preparado para Integração)
- **FastAPI** para APIs RESTful
- **Estrutura modular** para serviços
- **Preparado para LLMs + RAG + MCP**
- **Integração futura** com API do Trello

## 📱 Interface

### Páginas Principais
- **Dashboard**: Métricas agregadas de todos os clientes
- **Campanhas**: Gestão de campanhas por cliente
- **Funil de Vendas**: Análise de conversão por cliente
- **Calendário Editorial**: Planejamento de conteúdo
- **Kanban**: Tarefas organizadas por cliente
- **Chat**: Interações com o agente
- **Raciocínio**: Processo de tomada de decisão
- **Memória**: Contexto e insights do agente
- **Notificações**: Sugestões proativas
- **Logs**: Monitoramento de execuções

## 🎨 Design System

### Cores por Tipo de Cliente
- **Dermatologia/Estética**: Azul (#3B82F6)
- **Odontologia**: Verde (#10B981)
- **Fisioterapia**: Laranja (#F59E0B)

### Componentes
- **Cards responsivos** para métricas
- **Badges coloridos** para status
- **Modais detalhados** para aprovações
- **Tooltips explicativos** para tutorial

## 🔮 Roadmap

### Próximas Funcionalidades
- [ ] Integração completa com API do Trello
- [ ] Backend com LLMs (OpenAI/Anthropic)
- [ ] Sistema RAG para conhecimento específico
- [ ] Integração MCP para automações
- [ ] Autenticação e multi-tenancy
- [ ] Relatórios avançados
- [ ] Integração com redes sociais
- [ ] Sistema de templates de campanha

### Integrações Planejadas
- [ ] Trello API (boards, cards, automações)
- [ ] Meta Business API (Facebook/Instagram)
- [ ] Google Ads API
- [ ] WhatsApp Business API
- [ ] Analytics e métricas avançadas

## 👥 Contribuição

Este é um projeto em desenvolvimento ativo. Contribuições são bem-vindas!

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contato

João Goulart - [@jgoulartf](https://github.com/jgoulartf)

Link do Projeto: [https://github.com/jgoulartf/margent](https://github.com/jgoulartf/margent)

---

**MARGENT** - Transformando marketing digital através de inteligência artificial cognitiva 🚀

