# Backlog de Testes - Projeto ONG Plus

**Meta de Cobertura:** 90%+ em todo o código (Backend e Frontend)

Este backlog estabelece as etapas para a implementação gradual e contínua de testes em todo o projeto. A estratégia adota uma abordagem *bottom-up*, começando pelas configurações iniciais, seguindo para testes unitários fundamentais, integração e por fim fluxos E2E.

---

## Épico 1: Configuração do Ambiente de Testes

### Tarefas Backend (Django)
- [x] **Configuração Base:** Instalar `pytest`, `pytest-django`, e `pytest-cov`.
- [x] **Configuração do Pytest:** Criar arquivo `pytest.ini` e configurar para usar banco de dados de teste (ex: SQLite em memória para rapidez ou banco transacional otimizado).
- [x] **Geração de Dados:** Instalar e configurar ferramentas de factory/mocking como `model-bakery` ou `factory_boy`, junto com `faker`.
- [x] **Scripts de Cobertura:** Adicionar comando customizado para rodar pytest com o parâmetro `--cov=. --cov-report=html` garantindo a verificação local da meta de 90%.

### Tarefas Frontend (React + Vite)
- [x] **Configuração Base:** Instalar `vitest` no ecossistema Vite.
- [x] **DOM Testing:** Instalar `@testing-library/react` e `@testing-library/jest-dom`.
- [x] **Setup de Ambiente:** Criar arquivo `setupTests.js` para estender os matchers do Vitest com os do `jest-dom`.
- [x] **Relatórios de Cobertura:** Instalar `@vitest/coverage-v8` para gerar relatórios de cobertura (meta de 90%).
- [x] **Scripts do package.json:** Adicionar scripts `"test"`, `"test:ui"` e `"test:coverage"`.

---

## Épico 2: Testes Unitários e Integração - Backend

### App `authentication`
- [x] **Testes de Modelos e Managers:** Testar criação de usuários, senhas encriptadas e validações (ex: e-mail duplicado).
- [x] **Testes de Serializers:** Validar outputs e obrigatoriedade de campos em registro/login.
- [x] **Testes de Views/Endpoints:** Testar rotas de autenticação, JWT tokens, refresh e permissões de rotas protegidas.

### App `financial`
- [x] **Testes de Modelos:** Verificar cálculos de balanço, status de transações e constraints do banco de dados.
- [x] **Testes de Lógica de Negócio:** Isolar e testar serviços que processam doações ou pagamentos.
- [x] **Testes de API:** Assegurar que apenas usuários com permissões corretas (ex: admins da ONG) podem visualizar transações sensíveis.

### App `transparency`
- [x] **Testes de Relatórios:** Verificar se a geração de relatórios de transparência retorna os dados esperados.
- [x] **Testes de Upload/Documentos:** Mockar o sistema de storage para testar envio de PDFs/comprovantes.

### 4. App: `verification` (Prioridade 4)
- **Status Atual:** 91% (vistas), 84% (serviços)
- [x] **Testes de Fluxo de Verificação:** Validar mudanças de status (pendente -> em análise -> aprovado/rejeitado).
- [x] **Testes de Permissão:** Garantir que somente admins gerais podem aprovar ONGs.
- [x] **Integração com Serviços:** Mocar serviços externos (`cnpj_service`, `score_service`) para garantir o isolamento. `responses` ou `unittest.mock`) para as APIs de LLM.

### 5. App: `ai_assistant` (Prioridade 5)
- [ ] **Mocks de API Externa:** Mockar as chamadas HTTP (usando `responses` ou `unittest.mock`) para as APIs de LLM.
- [ ] **Lógica de Processamento:** Testar o parseamento do prompt e a limpeza/formatação da resposta.

---

## Épico 3: Testes Unitários e Integração - Frontend

### Serviços e Hooks (`services/` e `hooks/`)
- [x] **API Mocking:** Configurar `msw` (Mock Service Worker) para interceptar requisições do axios/fetch.
- [x] **Testes de Hooks de Estado:** Garantir que hooks customizados gerenciam `loading`, `error`, e `data` adequadamente.
- [x] **Contextos:** Testar os Providers (ex: AuthContext) garantindo que as mudanças de estado se propaguem aos consumidores.

### Componentes de UI (`components/`)
- [x] **Testes de Renderização:** Garantir que botões, modais, inputs e cards renderizem as props corretamente.
- [x] **Testes de Eventos:** Validar `onClick`, `onChange` e submissões de formulário sem fazer chamadas reais.

### Páginas e Fluxos (`Pages/`)
- [x] **Navegação (React Router):** Testar renderização condicional baseada na rota (ex: redirecionar para login se não autenticado).
- [x] **Fluxos Principais:** Testar renderização das páginas (Home, Dashboard da ONG, Perfil), simulando dados vindo do servidor.

---

## Épico 4: Testes End-to-End (E2E)

- [x] **Configuração do Cypress/Playwright:** Instalar ferramenta E2E no projeto frontend.
- [x] **Fluxo Crítico de Doação:** Simulando o usuário: login, visualização da ONG, clique em doar, e finalização.
- [x] **Fluxo de Aprovação de ONG:** (Pulado) Fluxo inexistente no frontend (Regra: se não existir código, não faça nada).

---

## Épico 5: Integração Contínua (CI) e Qualidade

- [x] **Pipelines GitHub Actions:** Criar `.github/workflows/test.yml` para rodar os testes de backend e frontend em cada Push/Pull Request.
- [x] **Quality Gate:** Bloquear merge se a cobertura total no coverage report for inferior a 90% ou se houver falha de testes.

---

## Épico 6: Documentação e Conclusão

- [x] **Atualizar o README.md:** Adicionar uma seção detalhada com as instruções sobre como configurar o ambiente de testes, instalar dependências de dev, e comandos para executar as suítes no Frontend e no Backend.
