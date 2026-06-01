# Backlog de integracao e produto

Tasks que cruzam frontend e backend, ou que precisam de decisao de produto antes da implementacao detalhada.

Ultima atualizacao: 2026-06-01.

Observacao: as telas atuais do frontend usam principalmente dados mockados e navegacao por estado. As tasks abaixo priorizam decisoes e contratos necessarios para ligar esses fluxos ao backend.

## Contratos entre frontend e backend

- [ ] Definir contrato da API de autenticacao: login, logout, refresh/session e usuario atual.
- [ ] Definir contrato da API de cadastro de doador.
- [ ] Definir contrato da API de cadastro e onboarding de ONG.
- [ ] Definir contrato da API de ONGs, causas, campanhas e filtros.
- [ ] Definir contrato da API de transparencia, relatorios e evidencias.
- [ ] Definir contrato da API de doacoes, pagamentos e recibos.
- [ ] Definir contrato da API da area de gestao da ONG.
- [ ] Definir contrato da API do ReliefCore.
- [ ] Definir padrao de erros da API para o frontend exibir mensagens consistentes.

## Regras de produto

- [ ] Definir perfis de usuario e permissoes: visitante, doador, ONG e admin.
- [ ] Definir quando uma ONG pode aparecer publicamente.
- [ ] Definir criterios do selo de verificacao.
- [ ] Definir quais evidencias de confiabilidade sao publicas.
- [ ] Definir quais dados financeiros ficam publicos e quais ficam restritos.
- [ ] Definir regras para alteracao de dados institucionais por ONGs.
- [ ] Definir fluxo de aprovacao/rejeicao de cadastro de ONG.
- [ ] Definir regras de recorrencia de doacoes.
- [ ] Definir regras de estorno, cancelamento e falha de pagamento.
- [ ] Definir quando solicitacoes emergenciais aparecem na pagina de transparencia.

## Dados externos e compliance

- [ ] Escolher API confiavel para consulta de CNPJ e dados publicos de ONGs.
- [ ] Definir periodicidade de atualizacao dos dados publicos.
- [ ] Definir estrategia para sinalizar dados inconsistentes.
- [ ] Definir historico de alteracoes desde a ultima verificacao.
- [ ] Definir quais documentos podem ser enviados como evidencia.
- [ ] Definir politica de retencao de documentos e relatorios.
- [ ] Definir provedores de pagamento para PIX, cartao e boleto.
- [ ] Definir regras de seguranca para dados de pagamento e dados pessoais.

## Fluxos ponta a ponta

- [ ] Mapear fluxo completo de visitante explorando causas ate doacao confirmada.
- [ ] Mapear fluxo completo de doador logado acessando historico, recibos e relatorios.
- [ ] Mapear fluxo completo de ONG criando perfil, passando por verificacao e publicando campanhas.
- [ ] Mapear fluxo completo de ONG gerenciando campanhas, doadores e relatorios.
- [ ] Mapear fluxo completo de admin verificando dados, documentos e inconsistencias.
- [ ] Mapear fluxo completo de solicitacao de apoio emergencial no ReliefCore.

## Documentacao e qualidade

- [ ] Atualizar README principal com links para os backlogs de frontend, backend e integracao/produto.
- [ ] Atualizar `frontend/README.md`, que ainda esta com conteudo padrao do Vite.
- [ ] Documentar contratos de API usados pelo frontend.
- [ ] Criar guia de variaveis de ambiente para frontend e backend.
- [ ] Criar checklist de validacao antes de publicar uma feature.
- [ ] Definir rotina de testes minima: lint, testes frontend, testes backend e testes de integracao.
- [ ] Revisar textos com caracteres quebrados nos documentos e na interface.
