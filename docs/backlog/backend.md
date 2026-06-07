# Backlog backend

Tasks relacionadas a modelos, APIs, regras de negocio, permissoes, persistencia, auditoria e integracoes externas.

Ultima atualizacao: 2026-06-02.

Observacao: o projeto ja possui estrutura Django inicial e um modelo parcial de ONG em `backend/verification/models.py`. As tasks abaixo descrevem o que falta para transformar essa base em API utilizavel pelo produto.

Prioridade para MVP 09/06: criar API minima de healthcheck, ONGs e transparencia; documentar variaveis de ambiente; padronizar dados de desenvolvimento; garantir que o backend suba localmente.

## Itens ja iniciados

- Estrutura Django base em `backend/ong_plus`.
- Apps de dominio criados como pacotes: `authentication`, `financial`, `transparency`, `verification` e `urgency_request`, alem de duplicatas sob `backend/apps`.
- Modelo `NGO` inicial no app `verification`, com campos como nome, CNPJ, area de atuacao, score e status ativo.
- Configuracao inicial de CORS para o frontend Vite.
- Rota padrao do Django Admin disponivel em `/admin/`.

## Estrutura de API e projeto

- [ ] Completar models, serializers, views e urls para os apps `authentication`, `financial`, `transparency`, `verification` e `urgency_request`.
- [ ] Remover duplicidade entre apps na raiz do backend e apps dentro de `backend/apps`, ou padronizar uma unica estrutura. **P0 MVP**
- [ ] Adicionar Django REST Framework, caso a API REST seja o caminho escolhido. **P0 MVP**
- [ ] Criar endpoints versionados, por exemplo `/api/v1/...`. **P0 MVP**
- [ ] Criar endpoint de healthcheck. **P0 MVP**
- [ ] Configurar autenticacao por token ou sessao.
- [ ] Configurar permissoes por perfil em nivel de API.
- [ ] Criar seeds/fixtures para desenvolvimento. **P0 MVP**
- [ ] Criar testes unitarios e de integracao dos dominios principais.
- [ ] Documentar contratos de API usados pelo frontend.
- [ ] Revisar configuracao de ambiente, banco e CORS para desenvolvimento e producao. **P0 MVP**

## Autenticacao, usuarios e acesso

- [ ] Implementar cadastro real de doador.
- [ ] Implementar cadastro real de ONG com campos obrigatorios, incluindo CNPJ.
- [ ] Persistir escolha de perfil do cadastro: doador ou ONG.
- [ ] Implementar login real.
- [ ] Implementar logout e persistencia de sessao.
- [ ] Implementar recuperacao de senha.
- [ ] Modelar perfis de acesso: visitante, doador, ONG e admin.
- [ ] Criar politicas de permissao para cada perfil: doador, ONG e admin.
- [ ] Restringir permissoes por perfil: paginas de gestao devem exigir perfil ONG/admin.
- [ ] Bloquear doacao para o fundo quando o usuario autenticado for uma ONG, conforme workflow.
- [ ] Implementar permissoes para administradores autorizados editarem dados institucionais.
- [ ] Registrar auditoria de acoes sensiveis realizadas por administradores.

## ONGs, identidade e autenticidade

- [ ] Completar modelo de ONGs e criar endpoints. **P0 MVP para listagem/detalhe**
- [ ] Adicionar campos de redes sociais da ONG.
- [ ] Adicionar modelos de comprovantes de autenticidade.
- [ ] Criar upload, listagem, revisao e historico de documentos de autenticidade.
- [ ] Criar modelo e endpoints de causas.
- [ ] Criar endpoints para listagem, busca e filtros por causa, nome, localidade e CNPJ.
- [ ] Criar paginacao para listagem de ONGs.
- [ ] Persistir status de verificacao de cada ONG alem do score inicial ja existente no modelo `NGO`.
- [ ] Persistir fonte dos dados, data da ultima atualizacao e indicador de consistencia.
- [ ] Persistir historico de campanhas no perfil publico da ONG.
- [ ] Persistir metas, arrecadacao atual, match aplicado e progresso por campanha.
- [ ] Criar endpoint para solicitacao de alteracoes cadastrais da ONG.
- [ ] Criar status para alteracoes solicitadas, aprovadas e recusadas.

## Verificacao, score e transparencia

- [ ] Criar modulo backend de verificacao de CNPJ.
- [ ] Integrar consulta de dados publicos de ONGs via API confiavel.
- [ ] Registrar fonte dos dados consultados.
- [ ] Registrar data da ultima verificacao.
- [ ] Comparar dados atuais com a ultima verificacao e sinalizar alteracoes.
- [ ] Sinalizar dados inconsistentes antes de exibicao publica.
- [ ] Criar fluxo de auditoria e selo de verificacao.
- [ ] Modelar fatores de score: documentacao, consistencia cadastral, transparencia financeira, historico de campanhas, evidencias e moderacao.
- [ ] Implementar calculo estimado do score.
- [ ] Permitir revisao manual do score por admin com justificativa.
- [ ] Permitir upload e revisao de evidencias/documentos de confiabilidade.
- [ ] Persistir relatorios publicos de prestacao de contas com data de atualizacao.
- [ ] Criar historico de relatorios e arquivos publicos.
- [ ] Criar endpoints de transparencia por ONG, campanha, bundle e urgencia.

## Causas, campanhas e bundles

- [ ] Criar modelo de campanha individual.
- [ ] Criar modelo de bundle/campanha coletiva com ONGs participantes.
- [ ] Criar modelo de criterios de elegibilidade de ONGs em bundles.
- [ ] Criar regras de distribuicao de recursos entre ONGs participantes.
- [ ] Criar endpoints para criacao, edicao, publicacao, encerramento e arquivamento de campanhas.
- [ ] Criar endpoints para aprovacao administrativa de campanhas.
- [ ] Criar endpoints para aprovacao administrativa de bundles.
- [ ] Criar suporte a rascunhos de campanha.
- [ ] Criar endpoint de historico completo de campanhas encerradas.
- [ ] Persistir status da campanha: rascunho, em revisao, aprovada, publicada, recusada, encerrada e arquivada.
- [ ] Registrar moderacao de conteudo publicado em campanhas e bundles.

## Matchfunding, doacoes e financeiro

- [ ] Criar modelo e endpoints de doacoes.
- [ ] Implementar doacao para fundo/causa.
- [ ] Implementar doacao para ONG especifica.
- [ ] Implementar doacao para campanha individual.
- [ ] Implementar doacao para bundle/campanha coletiva.
- [ ] Modelar regras de matchfunding: patrocinador, multiplicador, teto, periodo e elegibilidade.
- [ ] Calcular valor de match aplicavel por doacao.
- [ ] Registrar valor doado, valor combinado por match e destino final dos recursos.
- [ ] Exibir match nos relatorios financeiros e de transparencia.
- [ ] Implementar validacao de valor minimo e valor customizado no backend.
- [ ] Implementar pagamento PIX com geracao de QR Code real.
- [ ] Implementar pagamento por cartao com provedor de pagamento.
- [ ] Implementar boleto com geracao real de documento/link.
- [ ] Implementar doacao unica e recorrente.
- [ ] Gerar recibo apos confirmacao de pagamento.
- [ ] Enviar recibo por e-mail.
- [ ] Registrar taxa operacional e destino da doacao.
- [ ] Atualizar metas e arrecadacoes automaticamente apos pagamento confirmado.
- [ ] Criar historico de transacoes para doador e ONG.
- [ ] Tratar estados de pagamento pendente, aprovado, recusado, cancelado e estornado.

## Gestao da ONG

- [ ] Persistir dados do painel de gestao da ONG alem do cadastro basico ja iniciado no modelo `NGO`.
- [ ] Criar endpoints para edicao de perfil institucional.
- [ ] Criar endpoints para gerenciamento de redes sociais e comprovantes de autenticidade.
- [ ] Criar endpoints para upload de nova auditoria.
- [ ] Criar endpoints para base de doadores.
- [ ] Criar filtros de doadores mensais, eventuais, pendentes e ativos.
- [ ] Criar suporte ao envio de mensagens para doadores.
- [ ] Criar geracao de relatorio mensal de doadores.
- [ ] Criar exportacao real de PDF no painel de relatorios.
- [ ] Criar historico de arquivos gerados com download.
- [ ] Criar suporte a periodo personalizado para relatorios.
- [ ] Implementar componentes responsaveis por consultar e padronizar os dados provenientes das APIs externas necessarias para a validacao da ONG.
- [ ] Disponibilizar a funcionalidade atraves da API do sistema e garantir sua cobertura minima de testes.

## Solicitacao de urgencia

- [ ] Persistir solicitacoes de apoio emergencial no backend.
- [ ] Realocar o dominio de urgencia como funcionalidade da area de gestao da ONG, mantendo endpoints dedicados.
- [ ] Criar modelos para etapas da solicitacao e requisitos financeiros.
- [ ] Implementar etapa de requisitos financeiros: valor solicitado, justificativa, prazo, plano de uso e documentos.
- [ ] Implementar salvamento de rascunho.
- [ ] Implementar upload de comprovantes e documentos de crise.
- [ ] Implementar status da solicitacao: rascunho, enviada, em analise, aprovada, recusada e concluida.
- [ ] Criar endpoints de dashboard de solicitacoes ativas.
- [ ] Criar logs de compliance.
- [ ] Criar analytics de impacto.
- [ ] Criar ledger financeiro de repasses emergenciais.
- [ ] Criar endpoints de configuracoes e seguranca do portal institucional.
- [ ] Definir flag de visibilidade publica para solicitacoes emergenciais.
- [ ] Permitir exibicao no perfil da ONG quando a solicitacao for publica.
- [ ] Permitir exibicao na transparencia quando a solicitacao for publica.

## Administrador

- [ ] Criar painel/API admin de verificacao de ONGs.
- [ ] Exibir CNPJ, metas, arrecadacoes, documentos, redes sociais e campanhas de cada ONG.
- [ ] Permitir revisao de dados vindos de APIs externas.
- [ ] Permitir marcacao manual de inconsistencia com justificativa.
- [ ] Criar historico de alteracoes e verificacoes.
- [ ] Criar fila de documentos/evidencias para aprovacao.
- [ ] Criar workflow de aprovacao ou rejeicao de cadastro de ONG.
- [ ] Criar controles de publicacao/despublicacao de ONGs e campanhas.
- [ ] Criar workflow de validacao de campanhas individuais.
- [ ] Criar workflow de validacao de bundles/campanhas coletivas.
- [ ] Criar workflow de validacao de solicitacoes de urgencia.
- [ ] Criar moderacao de conteudo publicado.
- [ ] Registrar toda decisao administrativa com admin responsavel, data, status e justificativa.

## Qualidade backend

- [ ] Criar testes para autenticacao, permissoes, doacoes, verificacao, score, campanhas, bundles, urgencia e transparencia.
- [ ] Configurar validacoes de entrada nos endpoints.
- [ ] Criar tratamento padronizado de erros da API.
- [ ] Configurar logs para operacoes sensiveis.
- [ ] Revisar variaveis de ambiente obrigatorias.
- [ ] Documentar instalacao e execucao local do backend.
