# Backlog frontend

Tasks relacionadas a paginas, navegacao, formularios, estados de interface e experiencia do usuario. Este backlog foi montado a partir dos documentos em `README.md`, `docs/user_stories`, `docs/workflow` e das paginas ja implementadas em `frontend/src/Pages`.

Ultima atualizacao: 2026-06-01.

Observacao: telas e fluxos mockados continuam como pendentes quando ainda nao possuem integracao real, persistencia, validacao completa ou contrato com backend.

## Paginas ja implementadas ou parcialmente implementadas

- `LandingPage`: home / nossa missao.
- `AboutPage`: pagina sobre e formulario de contato visual.
- `CausesPage`: listagem de ONGs com filtros por causa e busca local.
- `NgoProfilePage`: perfil publico de uma ONG e fluxo visual de doacao para ONG especifica.
- `DonationPage`: fluxo visual de doacao para fundo/causa.
- `TransparencyPage`: pagina publica de transparencia e impacto.
- `RegisterPage`: cadastro visual.
- `LoginPage`: login visual.
- `UrgencyRequestPage`: portal ReliefCore / solicitacao de apoio emergencial.
- `NgoManagementPage`: area de gestao da ONG com visao geral, campanhas, doadores e relatorios.
- `DonorProfilePage`: perfil visual do doador com resumo, historico mockado, recibos mockados e preferencias de causas.
- `NgoTransparencyPage`: pagina visual de transparencia de uma ONG com dados, certificados e arquivos mockados.

## Navegacao e estrutura

- [ ] Criar pagina de configuracoes do usuario, citada nos workflows como `Configuracoes`.
- [ ] Criar pagina de suporte, hoje exibida como botao na sidebar de causas sem fluxo implementado.
- [ ] Criar pagina dedicada de relatorio publico completo para doadores, citada no fluxo como `Pagina do Relatorio`, ou formalizar `NgoTransparencyPage` como esse destino no fluxo.
- [ ] Trocar a navegacao por `useState` por um roteador de SPA, como `react-router`, preservando links diretos para cada pagina.
- [ ] Adicionar menu de perfil com opcoes reais de sair, configuracoes e dados da conta.
- [ ] Padronizar nomes e idioma do portal ReliefCore para combinar com o restante da experiencia em portugues.
- [ ] Criar estados de rota/tela para visitante, doador, ONG e admin.
- [ ] Exibir bloqueios e mensagens adequadas quando uma acao nao estiver disponivel para o perfil logado.

## Autenticacao e cadastro

- [ ] Adicionar validacao, submit e feedback real ao formulario visual de cadastro de doador.
- [ ] Criar formulario de cadastro de ONG com campos obrigatorios, incluindo CNPJ.
- [ ] Diferenciar o fluxo de cadastro de doador e ONG alem da tela visual atual focada em doador.
- [ ] Criar tela ou etapa de onboarding da ONG para completar perfil, documentos e dados bancarios.
- [ ] Implementar tela/fluxo real de recuperacao de senha; hoje existe apenas link visual no login.
- [ ] Adicionar mensagens de erro, sucesso e estados de carregamento nos fluxos de login/cadastro.
- [ ] Persistir estado autenticado apos login; hoje o usuario e mantido apenas em memoria no `App.jsx`.

## ONGs e causas

- [ ] Conectar a listagem de ONGs da `CausesPage` a dados da API.
- [ ] Implementar filtro por causa usando dados reais.
- [ ] Implementar busca real por nome, causa, localidade e CNPJ.
- [ ] Adicionar paginacao ou carregamento incremental na listagem de ONGs.
- [ ] Exibir status de verificacao de cada ONG de forma consistente na listagem e no perfil.
- [ ] Exibir fonte dos dados, data da ultima atualizacao e indicador de consistencia.
- [ ] Adicionar historico de campanhas no perfil publico da ONG.
- [ ] Adicionar metas, arrecadacao atual e progresso por campanha no perfil publico.
- [ ] Criar formulario de solicitacao de alteracoes cadastrais da ONG.
- [ ] Criar feedback visual para alteracoes solicitadas, aprovadas ou recusadas.

## Transparencia e verificacao

- [ ] Criar pagina ou secao de evidencias de confiabilidade acessivel ao doador.
- [ ] Conectar relatorios publicos de prestacao de contas a dados reais com data de atualizacao.
- [ ] Conectar historico de relatorios e arquivos publicos a dados reais e downloads funcionais.
- [ ] Exibir mudancas detectadas desde a ultima verificacao.
- [ ] Exibir dados inconsistentes com alertas claros antes da exibicao publica completa.
- [ ] Criar UI para upload de evidencias/documentos de confiabilidade.

## Doacoes

- [ ] Conectar o fluxo de doacao ao backend.
- [ ] Implementar validacao de valor minimo e valor customizado.
- [ ] Implementar estados visuais de pagamento pendente, aprovado, recusado, cancelado e estornado.
- [ ] Exibir QR Code real para pagamento PIX.
- [ ] Exibir link/documento de boleto quando gerado.
- [ ] Gerar e exibir recibo real apos confirmacao de pagamento; hoje ha apenas confirmacao visual.
- [ ] Conectar historico de doacoes do doador a dados reais; hoje `DonorProfilePage` usa dados mockados.
- [ ] Exibir historico de transacoes para a ONG.
- [ ] Atualizar progresso de meta na interface apos pagamento confirmado.

## Area de gestao da ONG

- [ ] Conectar dados do painel de gestao da ONG ao backend.
- [ ] Implementar edicao de perfil institucional.
- [ ] Implementar upload de nova auditoria com feedback de status.
- [ ] Implementar fluxo de criacao de campanha.
- [ ] Implementar edicao, publicacao, encerramento e arquivamento de campanhas.
- [ ] Implementar rascunhos de campanha.
- [ ] Implementar historico completo de campanhas encerradas.
- [ ] Implementar base real de doadores.
- [ ] Implementar filtros reais de doadores mensais, eventuais, pendentes e ativos.
- [ ] Implementar UI de envio de mensagens para doadores.
- [ ] Implementar exportacao de relatorio mensal de doadores.
- [ ] Implementar download real de PDFs no painel de relatorios.
- [ ] Implementar historico real de arquivos gerados com download.
- [ ] Implementar configuracao de periodo personalizado para relatorios.

## ReliefCore / apoio emergencial

- [ ] Completar as etapas apos "Continuar para Requisitos Financeiros".
- [ ] Implementar salvamento de rascunho na interface.
- [ ] Implementar upload de comprovantes e documentos de crise.
- [ ] Exibir status da solicitacao: rascunho, enviada, em analise, aprovada, recusada e concluida.
- [ ] Criar dashboard real de solicitacoes ativas.
- [ ] Criar telas de logs de compliance.
- [ ] Criar telas de analytics de impacto.
- [ ] Criar tela de ledger financeiro de repasses emergenciais.
- [ ] Criar telas de configuracoes e seguranca do portal institucional.
- [ ] Exibir solicitacoes de apoio emergencial na pagina de transparencia quando forem publicas.

## Qualidade de interface

- [ ] Corrigir textos com caracteres quebrados nos arquivos e na interface.
- [ ] Revisar responsividade das paginas com sidebars em telas pequenas.
- [ ] Adicionar estados vazios, loading e erro para listas e formularios.
- [ ] Adicionar confirmacoes visuais para acoes importantes.
- [ ] Adicionar acessibilidade basica: foco visivel, labels, aria quando necessario e navegacao por teclado.
- [ ] Adicionar testes de frontend para navegacao e fluxos criticos.
- [ ] Configurar lint/format como rotina de validacao.
- [ ] Atualizar `frontend/README.md`, que ainda esta com conteudo padrao do Vite.
