# Backlog frontend

Tasks relacionadas a paginas, navegacao, formularios, estados de interface, controle de acesso e experiencia do usuario.

Ultima atualizacao: 2026-06-02.

Observacao: telas e fluxos mockados continuam como pendentes quando ainda nao possuem integracao real, persistencia, validacao completa ou contrato com backend.

Prioridade para MVP 09/06: corrigir textos quebrados, estabilizar rotas principais, conectar ou padronizar dados de ONGs/transparencia, adicionar estados basicos de loading/erro e garantir build do frontend.

## Paginas ja implementadas ou parcialmente implementadas

- `LandingPage`: home / nossa missao.
- `AboutPage`: pagina sobre.
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
- Navegacao SPA com `react-router-dom` implementada em `App.jsx`.

## Navegacao, rotas e controle de acesso

- [x] Trocar a navegacao por `useState` por um roteador de SPA, como `react-router`, preservando links diretos para cada pagina.
- [x] Criar estados de rota/tela para visitante, doador, ONG e admin.
- [x] Implementar guards de rota para area do doador, area da ONG e area administrativa.
- [x] Exibir bloqueios e mensagens adequadas quando uma acao nao estiver disponivel para o perfil logado.
- [x] Redirecionar usuario autenticado para a area correta apos login: doador, ONG ou admin.
- [x] Bloquear doacoes feitas por usuarios autenticados como ONG, quando a regra de produto exigir.
- [x] Criar pagina de configuracoes do usuario, citada nos workflows como `Configuracoes`.
- [x] Criar pagina de suporte, hoje exibida como botao na sidebar de causas sem fluxo implementado.
- [x] Adicionar menu de perfil com opcoes reais de sair, configuracoes e dados da conta.

## Autenticacao e cadastro

- [ ] Refatorar `RegisterPage` para apresentar escolha inicial clara entre **Sou doador** e **Sou ONG**.
- [ ] Criar formulario completo de cadastro de doador com validacao, submit, loading, sucesso e erro.
- [ ] Criar formulario completo de cadastro de ONG com CNPJ, razao social, nome publico, area de atuacao, localidade e contato.
- [ ] Adicionar campos de redes sociais no cadastro/onboarding da ONG.
- [ ] Adicionar etapa de envio de comprovantes de autenticidade da ONG.
- [ ] Criar etapa de onboarding da ONG para completar perfil, documentos e dados bancarios.
- [ ] Implementar tela/fluxo real de recuperacao de senha; hoje existe apenas link visual no login.
- [ ] Adicionar mensagens de erro, sucesso e estados de carregamento nos fluxos de login/cadastro.
- [ ] Persistir estado autenticado apos login; hoje o usuario e mantido apenas em memoria no `App.jsx`.

## ONGs, causas, campanhas e bundles

- [x] Refatorar `CausesPage` para separar visualmente ONGs individuais, campanhas individuais e bundles.
- [x] Exibir ONGs individuais com filtros por causa, localidade, verificacao, score e busca textual.
- [x] Exibir bundles de ONGs por causa tematica, com titulo, descricao, meta, progresso e ONGs participantes.
- [x] Criar pagina de detalhe de bundle com regras de elegibilidade, distribuicao dos recursos e transparencia agregada.
- [x] Criar fluxo de doacao para bundle/campanha coletiva.
- [ ] Conectar a listagem de ONGs da `CausesPage` a dados da API.
- [ ] Conectar a listagem de campanhas individuais e coletivas (bundles) da `CausesPage` a dados da API.
- [ ] Conectar a página de detalhe de bundle (`/bundle/:id`) a dados reais da API.
- [ ] Implementar filtro por causa usando dados reais.
- [ ] Implementar busca real por nome, causa, localidade e CNPJ.
- [ ] Adicionar paginacao ou carregamento incremental na listagem de ONGs.
- [x] Exibir status de verificacao de cada ONG de forma consistente na listagem e no perfil.
- [x] Exibir fonte dos dados, data da ultima atualizacao e indicador de consistencia.
- [x] Adicionar historico de campanhas no perfil publico da ONG.
- [x] Adicionar metas, arrecadacao atual, match aplicado e progresso por campanha no perfil publico.
- [x] Criar formulario de solicitacao de alteracoes cadastrais da ONG.
- [x] Criar feedback visual para alteracoes solicitadas, aprovadas ou recusadas.

## Sistema de campanhas e matchfunding

- [x] Criar UI de criacao de campanha com objetivo, causa, meta, prazo, midias, requisitos e destino dos recursos.
- [x] Criar UI de edicao, publicacao, encerramento, arquivamento e duplicacao de campanhas.
- [x] Criar suporte visual a rascunhos de campanha.
- [x] Exibir status da campanha: rascunho, em revisao, aprovada, publicada, recusada, encerrada e arquivada.
- [x] Exibir regras de matchfunding quando aplicaveis: patrocinador, multiplicador, teto e periodo.
- [x] Mostrar ao doador valor original, valor combinado por match e impacto total estimado.
- [x] Diferenciar campanhas individuais de campanhas coletivas/bundles.
- [x] Exibir alertas quando uma campanha depende de validacao administrativa.
- [x] Criar historico completo de campanhas encerradas.

## Transparencia e verificacao

- [ ] Refazer `TransparencyPage` para organizar transparencia por plataforma, ONG, campanha, bundle e urgencia.
- [ ] Criar pagina ou secao de evidencias de confiabilidade acessivel ao doador.
- [ ] Exibir score da ONG com explicacao visual dos fatores considerados.
- [ ] Exibir fonte dos dados, data de ultima verificacao e historico de alteracoes.
- [ ] Conectar relatorios publicos de prestacao de contas a dados reais com data de atualizacao.
- [ ] Conectar historico de relatorios e arquivos publicos a dados reais e downloads funcionais.
- [ ] Exibir mudancas detectadas desde a ultima verificacao.
- [ ] Exibir dados inconsistentes com alertas claros antes da exibicao publica completa.
- [ ] Criar UI para upload de evidencias/documentos de confiabilidade.
- [ ] Criar visao publica de transparencia de bundles com rateio, ONGs contempladas e comprovantes.

## Doacoes

- [ ] Conectar o fluxo de doacao ao backend.
- [ ] Implementar doacao para ONG especifica.
- [ ] Implementar doacao para campanha individual.
- [ ] Implementar doacao para fundo/causa.
- [x] Implementar doacao para bundle/campanha coletiva.
- [ ] Implementar validacao de valor minimo e valor customizado.
- [ ] Implementar estados visuais de pagamento pendente, aprovado, recusado, cancelado e estornado.
- [ ] Exibir QR Code real para pagamento PIX.
- [ ] Exibir link/documento de boleto quando gerado.
- [ ] Gerar e exibir recibo real apos confirmacao de pagamento.
- [ ] Conectar historico de doacoes do doador a dados reais; hoje `DonorProfilePage` usa dados mockados.
- [ ] Exibir historico de transacoes para a ONG.
- [ ] Atualizar progresso de meta na interface apos pagamento confirmado.

## Area de gestao da ONG

- [ ] Conectar dados do painel de gestao da ONG ao backend.
- [ ] Realocar a solicitacao de urgencia para dentro da `NgoManagementPage`, mantendo acesso por menu/aba da gestao.
- [ ] Remover ou redirecionar a tela isolada `UrgencyRequestPage` quando o fluxo estiver integrado.
- [ ] Implementar edicao de perfil institucional.
- [ ] Implementar gerenciamento de redes sociais e comprovantes de autenticidade.
- [ ] Implementar upload de nova auditoria com feedback de status.
- [ ] Implementar fluxo de criacao de campanha.
- [ ] Implementar edicao, publicacao, encerramento e arquivamento de campanhas.
- [ ] Implementar base real de doadores.
- [ ] Implementar filtros reais de doadores mensais e eventuais.
- [ ] Implementar UI de envio de mensagens para doadores.
- [ ] Implementar exportacao de relatorio mensal de doadores.
- [ ] Implementar download real de PDFs no painel de relatorios.
- [ ] Implementar historico real de arquivos gerados com download.
- [ ] Implementar configuracao de periodo personalizado para relatorios.
- [ ] Criar tela de configuracoes da ONG.


## Solicitacao de urgencia

- [x] Completar as etapas apos "Continuar para Requisitos Financeiros".
- [x] Criar etapa de requisitos financeiros com valores solicitados, justificativa, prazo, plano de uso e documentos.
- [x] Criar etapa de evidencias da urgencia com upload de comprovantes e documentos de crise.
- [x] Criar etapa de revisao e envio.
- [x] Implementar salvamento de rascunho na interface.
- [x] Exibir status da solicitacao: rascunho, enviada, em analise, aprovada, recusada e concluida.
- [x] Criar dashboard real de solicitacoes ativas na gestao da ONG.
- [x] Exibir solicitacoes de apoio emergencial no perfil publico da ONG quando forem publicas.
- [x] Exibir solicitacoes de apoio emergencial na pagina de transparencia quando forem publicas.

## Area administrativa

- [ ] Criar layout da area administrativa com menu para documentos, ONGs, campanhas, bundles, urgencias, score e moderacao.
- [ ] Criar fila de documentos recebidos por ONGs com aprovacao, rejeicao e pedido de ajuste.
- [ ] Criar tela de validacao de informacoes enviadas por ONGs.
- [ ] Criar tela de calculo estimado/revisao do score.
- [ ] Criar tela de validacao de campanhas individuais.
- [ ] Criar tela de validacao de bundles/campanhas coletivas.
- [ ] Criar tela de moderacao de conteudo publicado.
- [ ] Criar tela de validacao de solicitacoes de urgencia.
- [ ] Criar historico de decisoes administrativas com autor, data e justificativa.
## Tela Sobre

- [x] Refatorar `AboutPage` para explicar o objetivo do projeto.
- [x] Explicar o modelo de matchfunding.
- [x] Explicar como funciona o score da ONG.
- [x] Explicar como funciona a verificacao documental e de autenticidade.
- [x] Explicar como funcionam campanhas individuais e bundles.
- [x] Explicar como doadores acompanham transparencia, recibos e impacto.

## Qualidade de interface

- [ ] Corrigir textos com caracteres quebrados nos arquivos e na interface. **P0 MVP**
- [ ] Revisar responsividade das paginas com sidebars em telas pequenas.
- [ ] Adicionar estados vazios, loading e erro para listas e formularios. **P0 MVP nas paginas conectadas a API**
- [ ] Corrigir botões que não estão funcionando ou levam para links quebrados.
- [ ] Adicionar confirmacoes visuais para acoes importantes.
- [ ] Adicionar acessibilidade basica: foco visivel, labels, aria quando necessario e navegacao por teclado.
- [ ] Adicionar testes de frontend para navegacao e fluxos criticos.
- [ ] Configurar lint/format como rotina de validacao. **P0 MVP para build/lint basico**
