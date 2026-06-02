# Plano de entrega do MVP - 09/06/2026

Ultima atualizacao: 2026-06-02.

Este documento consolida o estado atual do codigo, o que ja foi realizado, o que ainda esta pendente e a prioridade de entrega do MVP ate **09/06/2026**.

## Diagnostico atual

O projeto ja possui uma base visual ampla no frontend, com navegacao por rotas, paginas publicas, perfil do doador, perfil publico de ONG, transparencia visual, doacao visual, gestao visual da ONG e solicitacao de urgencia. A maior parte dessas telas ainda usa dados mockados e nao possui persistencia real.

O backend esta em estagio inicial: existe um projeto Django configurado, apps de dominio criados e um modelo inicial de ONG em `verification`. Ainda nao ha API REST, serializers, views, endpoints versionados, autenticacao real ou integracao com o frontend.

Para o MVP de 09/06, a estrategia recomendada e reduzir o escopo para um fluxo demonstravel, consistente e navegavel, priorizando confiabilidade da experiencia e contratos basicos de API em vez de tentar implementar todos os dominios previstos.

## Escopo recomendado do MVP

O MVP deve entregar:

- Visitante consegue acessar home, causas, perfil publico de ONG, transparencia e sobre.
- Visitante consegue simular uma doacao para causa ou ONG com estados visuais claros.
- Usuario consegue realizar login/cadastro em fluxo funcional de interface, ainda que com autenticacao simplificada se necessario.
- Doador consegue acessar um perfil com historico/recibos mockados ou derivados de fixture.
- ONG consegue acessar painel de gestao com perfil, campanhas, doadores, relatorios e urgencia em estado demonstravel.
- Backend expoe ao menos endpoints basicos para ONGs/listagem/detalhe, dados de transparencia mockados por fixture e healthcheck.
- Documentacao deixa claro o que e real, o que e mockado e o que fica para pos-MVP.

## Ja realizado

### Frontend

- Estrutura React + Vite criada.
- Navegacao SPA com `react-router-dom` implementada em `App.jsx`.
- Paginas publicas criadas: home, causas, transparencia e sobre.
- Paginas de autenticacao visual criadas: login e cadastro.
- Perfil publico de ONG criado com rota dinamica.
- Pagina de transparencia de ONG criada com rota dinamica.
- Fluxo visual de doacao criado.
- Perfil visual do doador criado.
- Area visual de gestao da ONG criada.
- Tela visual de solicitacao de urgencia criada.
- Navbar, menu mobile e menu de perfil implementados.
- Catalogo local/mock de ONGs usado para navegacao e demonstracao.

### Backend

- Projeto Django criado.
- Apps de dominio criados: `authentication`, `financial`, `transparency`, `verification`, `ai_assistant` e `urgency_request`.
- Configuracao inicial de CORS para o Vite.
- Modelo inicial `NGO` criado em `backend/verification/models.py`.
- Migracao inicial de `NGO` criada.
- Admin padrao do Django disponivel em `/admin/`.

### Documentacao

- README principal com visao de produto e links de documentacao.
- Backlogs separados de frontend, backend e integracao/produto.
- User stories para doador, ONG e admin.
- Workflows de doador e ONG.
- Guia local de execucao.

## Pendencias criticas para MVP

Prioridade P0 significa necessario para uma entrega minimamente coerente em 09/06. P1 melhora a percepcao do MVP e deve ser feito se P0 estiver encaminhado. P2 deve ficar explicitamente como pos-MVP.

### P0 - Deve entrar no MVP

- Corrigir textos com caracteres quebrados nas principais telas e documentos visiveis.
- Definir a narrativa do MVP: quais fluxos sao reais, quais usam mock/fixture e quais sao demonstrativos.
- Criar endpoints backend basicos:
  - `GET /api/v1/health/`
  - `GET /api/v1/ngos/`
  - `GET /api/v1/ngos/:id/`
  - `GET /api/v1/ngos/:id/transparency/` ou endpoint equivalente de transparencia mockada.
- Conectar `CausesPage`, `NgoProfilePage` e `NgoTransparencyPage` a dados de API ou fixtures padronizadas.
- Garantir que `npm run build` execute sem erro.
- Garantir que o backend suba localmente com variaveis de ambiente documentadas.
- Criar `.env.example` coerente para backend e frontend, ou revisar os existentes.
- Manter `docs/how_to_run.md` alinhado com PostgreSQL, `.env` e comandos reais do projeto.
- Implementar tratamento basico de loading/erro nas paginas que consultarem API.
- Manter o checklist de validacao manual do MVP atualizado.

### P1 - Importante, se houver tempo

- Melhorar cadastro com escolha clara entre doador e ONG.
- Persistir usuario autenticado em `localStorage` ou via endpoint simples de sessao.
- Criar guards simples para rotas de doador e ONG.
- Integrar a solicitacao de urgencia como aba/fluxo dentro da area de gestao da ONG.
- Criar fluxo visual completo de requisitos financeiros da urgencia.
- Criar tela/aba administrativa minima para revisao visual de ONGs e documentos.
- Exibir indicadores de score e verificacao de forma consistente entre listagem, perfil e transparencia.
- Adicionar fixtures/seeds para ONGs, causas, campanhas e transparencia.
- Criar testes basicos de smoke para frontend e backend.

### P2 - Pos-MVP

- Pagamentos reais via PIX, cartao ou boleto.
- Recibos reais e envio por e-mail.
- Matchfunding com regras contabilizadas.
- Bundles completos com rateio financeiro.
- Verificacao real de CNPJ em API externa.
- Score automatizado com pesos, auditoria e revisao admin.
- Upload real de documentos e evidencias.
- Painel administrativo completo.
- Relatorios financeiros reais e exportacao de PDF.
- Doacao recorrente, estorno, cancelamento e conciliacao.

## Plano de trabalho ate 09/06

### 02/06 - Consolidacao e foco

- Fechar escopo do MVP.
- Atualizar documentacao de prioridades.
- Corrigir divergencias obvias entre backlog e codigo.
- Identificar telas com texto quebrado e fluxos incompletos.

### 03/06 - Backend minimo

- Padronizar estrutura dos apps Django.
- Criar endpoints basicos de ONGs e transparencia.
- Criar fixtures ou seeds de desenvolvimento.
- Ajustar guia de execucao para PostgreSQL e variaveis obrigatorias.

### 04/06 - Integracao frontend/backend

- Conectar listagem de ONGs e perfil publico.
- Conectar transparencia de ONG.
- Adicionar estados de loading, erro e vazio.
- Manter fallback para fixture quando a API nao estiver disponivel, se isso for decisao do MVP.

### 05/06 - Fluxos de usuario

- Revisar login/cadastro e perfil do doador.
- Revisar area de gestao da ONG.
- Integrar urgencia ao painel ou documentar claramente como demonstracao separada.
- Corrigir textos quebrados nas telas principais.

### 06/06 - Qualidade e validacao

- Rodar `npm run build` e corrigir falhas.
- Rodar lint quando viavel.
- Rodar checks basicos do Django.
- Criar checklist manual do MVP com rotas e criterios de aceite.

### 07/06 - Ajustes finais de produto

- Revisar consistencia visual das paginas principais.
- Revisar copy de transparencia, score e verificacao.
- Garantir que todos os links principais funcionem.
- Atualizar README com status do MVP.

### 08/06 - Ensaios de entrega

- Executar o roteiro completo de demonstracao.
- Corrigir bugs bloqueantes.
- Registrar limitacoes conhecidas.
- Preparar evidencias: prints, comandos executados e checklist.

### 09/06 - Entrega

- Congelar escopo.
- Rodar validacao final.
- Entregar README, plano do MVP, checklist e aplicacao demonstravel.

## Riscos principais

- Backend ainda nao possui API REST; sem isso, a integracao real fica limitada.
- Frontend possui muitas telas mockadas; risco de parecer mais completo do que realmente esta.
- Textos quebrados reduzem a percepcao de qualidade da entrega.
- Backend depende de PostgreSQL e variaveis de ambiente; qualquer divergencia no ambiente local pode bloquear a validacao.
- Escopo completo de pagamentos, matchfunding, bundles e admin e grande demais para 09/06.

## Criterios de aceite do MVP

- Frontend abre localmente e permite navegar pelas rotas principais.
- Build do frontend passa.
- Backend sobe localmente com instrucoes corretas.
- Pelo menos uma fonte padronizada de dados alimenta causas, perfil de ONG e transparencia.
- A documentacao informa claramente escopo entregue, pendencias e prioridades.
- Fluxo de demonstracao pode ser executado sem depender de funcionalidades pos-MVP.
