# Backlog backend

Tasks relacionadas a modelos, APIs, regras de negocio, permissoes, persistencia e integracoes externas.

## Estrutura de API e projeto

- [ ] Criar models, serializers, views e urls para os apps `authentication`, `financial`, `transparency`, `verification`, `ai_assistant` e `urgency_request`.
- [ ] Remover duplicidade entre apps na raiz do backend e apps dentro de `backend/apps`, ou padronizar uma unica estrutura.
- [ ] Adicionar Django REST Framework, caso a API REST seja o caminho escolhido.
- [ ] Criar endpoints versionados, por exemplo `/api/v1/...`.
- [ ] Configurar autenticacao por token ou sessao.
- [ ] Configurar permissoes por perfil.
- [ ] Criar seeds/fixtures para desenvolvimento.
- [ ] Criar testes unitarios e de integracao dos dominios principais.
- [ ] Documentar contratos de API usados pelo frontend.
- [ ] Revisar configuracao de ambiente, banco e CORS para desenvolvimento e producao.

## Autenticacao e usuarios

- [ ] Implementar cadastro real de doador.
- [ ] Implementar cadastro real de ONG com campos obrigatorios, incluindo CNPJ.
- [ ] Implementar login real.
- [ ] Implementar logout e persistencia de sessao.
- [ ] Implementar recuperacao de senha.
- [ ] Modelar perfis de acesso: visitante, doador, ONG e admin.
- [ ] Restringir permissoes por perfil: paginas de gestao devem exigir perfil ONG/admin.
- [ ] Bloquear doacao para o fundo quando o usuario autenticado for uma ONG, conforme workflow.
- [ ] Implementar permissoes para administradores autorizados editarem dados institucionais.

## ONGs e causas

- [ ] Criar modelo e endpoints de ONGs.
- [ ] Criar modelo e endpoints de causas.
- [ ] Criar endpoints para listagem, busca e filtros por causa, nome, localidade e CNPJ.
- [ ] Criar paginacao para listagem de ONGs.
- [ ] Persistir status de verificacao de cada ONG.
- [ ] Persistir fonte dos dados, data da ultima atualizacao e indicador de consistencia.
- [ ] Persistir historico de campanhas no perfil publico da ONG.
- [ ] Persistir metas, arrecadacao atual e progresso por campanha.
- [ ] Criar endpoint para solicitacao de alteracoes cadastrais da ONG.
- [ ] Criar status para alteracoes solicitadas, aprovadas e recusadas.

## Verificacao e transparencia

- [ ] Criar modulo backend de verificacao de CNPJ.
- [ ] Integrar consulta de dados publicos de ONGs via API confiavel.
- [ ] Registrar fonte dos dados consultados.
- [ ] Registrar data da ultima verificacao.
- [ ] Comparar dados atuais com a ultima verificacao e sinalizar alteracoes.
- [ ] Sinalizar dados inconsistentes antes de exibicao publica.
- [ ] Criar fluxo de auditoria e selo de verificacao.
- [ ] Permitir upload e revisao de evidencias/documentos de confiabilidade.
- [ ] Persistir relatorios publicos de prestacao de contas com data de atualizacao.
- [ ] Criar historico de relatorios e arquivos publicos.

## Doacoes e financeiro

- [ ] Criar modelo e endpoints de doacoes.
- [ ] Implementar doacao para fundo/causa.
- [ ] Implementar doacao para ONG especifica.
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

- [ ] Persistir dados do painel de gestao da ONG.
- [ ] Criar endpoints para edicao de perfil institucional.
- [ ] Criar endpoints para upload de nova auditoria.
- [ ] Criar endpoints para criacao de campanha.
- [ ] Criar endpoints para edicao, publicacao, encerramento e arquivamento de campanhas.
- [ ] Criar suporte a rascunhos de campanha.
- [ ] Criar endpoint de historico completo de campanhas encerradas.
- [ ] Criar endpoints para base de doadores.
- [ ] Criar filtros de doadores mensais, eventuais, pendentes e ativos.
- [ ] Criar suporte ao envio de mensagens para doadores.
- [ ] Criar geracao de relatorio mensal de doadores.
- [ ] Criar exportacao real de PDF no painel de relatorios.
- [ ] Criar historico de arquivos gerados com download.
- [ ] Criar suporte a periodo personalizado para relatorios.
- [ ] Implementar os componentes responsáveis por consultar e padronizar os dados provenientes das APIs externas necessárias para a validação da ONG.
- [ ] Implementar toda a lógica de validação da ONG e cálculo de score.
- [ ] Disponibilizar a funcionalidade através da API do sistema e garantir sua cobertura mínima de testes.

## ReliefCore / apoio emergencial

- [ ] Persistir solicitacoes de apoio emergencial no backend.
- [ ] Criar modelos para etapas da solicitacao e requisitos financeiros.
- [ ] Implementar salvamento de rascunho.
- [ ] Implementar upload de comprovantes e documentos de crise.
- [ ] Implementar status da solicitacao: rascunho, enviada, em analise, aprovada, recusada e concluida.
- [ ] Criar endpoints de dashboard de solicitacoes ativas.
- [ ] Criar logs de compliance.
- [ ] Criar analytics de impacto.
- [ ] Criar ledger financeiro de repasses emergenciais.
- [ ] Criar endpoints de configuracoes e seguranca do portal institucional.
- [ ] Definir quais solicitacoes de apoio emergencial podem aparecer publicamente na transparencia.

## Administrador

- [ ] Criar painel/API admin de verificacao de ONGs.
- [ ] Exibir CNPJ, metas, arrecadacoes e campanhas de cada ONG.
- [ ] Permitir revisao de dados vindos de APIs externas.
- [ ] Permitir marcacao manual de inconsistencia com justificativa.
- [ ] Criar historico de alteracoes e verificacoes.
- [ ] Criar fila de documentos/evidencias para aprovacao.
- [ ] Criar workflow de aprovacao ou rejeicao de cadastro de ONG.
- [ ] Criar controles de publicacao/despublicacao de ONGs e campanhas.

## Qualidade backend

- [ ] Criar testes para autenticacao, permissoes, doacoes, verificacao e transparencia.
- [ ] Configurar validacoes de entrada nos endpoints.
- [ ] Criar tratamento padronizado de erros da API.
- [ ] Configurar logs para operacoes sensiveis.
- [ ] Revisar variaveis de ambiente obrigatorias.
- [ ] Documentar instalacao e execucao local do backend.
