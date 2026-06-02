# Backlog de integracao e produto

Tasks que cruzam frontend e backend, ou que precisam de decisao de produto antes da implementacao detalhada.

Ultima atualizacao: 2026-06-02.

Observacao: as telas atuais do frontend usam principalmente dados mockados. A navegacao SPA por rotas ja foi implementada no frontend, mas ainda faltam integracao real, persistencia e contratos de API para a maioria dos fluxos.

Prioridade para MVP 09/06: definir contratos minimos de ONGs, transparencia e autenticacao demonstravel; documentar o que ficara mockado; criar checklist de validacao da entrega.

## Contratos entre frontend e backend

- [ ] Definir contrato da API de autenticacao: login, logout, refresh/session e usuario atual. **P1 MVP**
- [ ] Definir contrato da API de cadastro de doador.
- [ ] Definir contrato da API de cadastro e onboarding de ONG.
- [ ] Definir contrato de upload de documentos, comprovantes de autenticidade e redes sociais da ONG.
- [ ] Definir contrato da API de perfis e permissoes: visitante, doador, ONG e admin.
- [ ] Definir contrato da API de ONGs, causas, campanhas, bundles e filtros. **P0 MVP para ONGs e causas**
- [ ] Definir contrato da API de campanhas individuais.
- [ ] Definir contrato da API de bundles/campanhas coletivas.
- [ ] Definir contrato da API de matchfunding, incluindo calculo, limites e patrocinadores.
- [ ] Definir contrato da API de transparencia, relatorios e evidencias. **P0 MVP para transparencia de ONG**
- [ ] Definir contrato da API de doacoes, pagamentos, match e recibos.
- [ ] Definir contrato da API da area de gestao da ONG.
- [ ] Definir contrato da API de solicitacao de urgencia dentro da gestao da ONG.
- [ ] Definir contrato da API administrativa para documentos, score, campanhas, bundles, moderacao e urgencias.
- [ ] Definir padrao de erros da API para o frontend exibir mensagens consistentes.

## Regras de produto

- [ ] Definir perfis de usuario e permissoes: visitante, doador, ONG e admin.
- [ ] Definir quais telas cada perfil pode acessar.
- [ ] Definir quais acoes cada perfil pode executar.
- [ ] Definir quando uma ONG pode aparecer publicamente.
- [ ] Definir criterios do selo de verificacao.
- [ ] Definir criterios e pesos do score.
- [ ] Definir quais evidencias de confiabilidade sao publicas.
- [ ] Definir quais dados financeiros ficam publicos e quais ficam restritos.
- [ ] Definir regras para alteracao de dados institucionais por ONGs.
- [ ] Definir fluxo de aprovacao/rejeicao de cadastro de ONG.
- [ ] Definir fluxo de aprovacao/rejeicao de campanhas individuais.
- [ ] Definir fluxo de aprovacao/rejeicao de bundles.
- [ ] Definir regras de recorrencia de doacoes.
- [ ] Definir regras de estorno, cancelamento e falha de pagamento.
- [ ] Definir regras de matchfunding: elegibilidade, multiplicador, teto, validade e prestacao de contas.
- [ ] Definir quando solicitacoes emergenciais aparecem no perfil da ONG.
- [ ] Definir quando solicitacoes emergenciais aparecem na pagina de transparencia.
- [ ] Decidir se a area de urgencia tera categorias proprias ou se usara o mesmo catalogo de causas do restante do produto.

## Bundles e campanhas coletivas

- [ ] Definir conceito oficial de bundle no produto.
- [ ] Definir criterios para uma ONG entrar em um bundle.
- [ ] Definir criterios de aprovacao administrativa de bundles.
- [ ] Definir regras de distribuicao de recursos entre ONGs participantes.
- [ ] Definir como bundles aparecem na tela de causas.
- [ ] Definir como bundles aparecem na transparencia.
- [ ] Definir como recibos de doacao para bundle devem listar destino dos recursos.
- [ ] Definir se uma ONG pode participar simultaneamente de varias campanhas coletivas.

## Solicitacao de urgencia

- [ ] Decidir se solicitacoes de urgencia devem aparecer no perfil publico da ONG.
- [ ] Decidir quais status de urgencia podem ser publicos.
- [ ] Definir fluxo completo apos "Continuar para Requisitos Financeiros".
- [ ] Definir dados obrigatorios de requisitos financeiros.
- [ ] Definir documentos obrigatorios para comprovacao da urgencia.
- [ ] Definir criterios de aprovacao administrativa de urgencias.
- [ ] Definir se urgencias aprovadas viram campanhas de captacao, bundles emergenciais ou apenas pedidos internos.
- [ ] Definir regras de prestacao de contas para repasses emergenciais.

## Dados externos e compliance

- [ ] Escolher API confiavel para consulta de CNPJ e dados publicos de ONGs.
- [ ] Definir periodicidade de atualizacao dos dados publicos.
- [ ] Definir estrategia para sinalizar dados inconsistentes.
- [ ] Definir historico de alteracoes desde a ultima verificacao.
- [ ] Definir quais documentos podem ser enviados como evidencia.
- [ ] Definir politica de retencao de documentos e relatorios.
- [ ] Definir provedores de pagamento para PIX, cartao e boleto.
- [ ] Definir regras de seguranca para dados de pagamento e dados pessoais.
- [ ] Definir regras de auditoria para decisoes administrativas.

## Fluxos ponta a ponta

- [ ] Mapear fluxo completo de visitante explorando causas ate doacao confirmada.
- [ ] Mapear fluxo completo de doador logado acessando historico, recibos e relatorios.
- [ ] Mapear fluxo completo de ONG criando perfil, passando por verificacao e publicando campanhas.
- [ ] Mapear fluxo completo de ONG enviando redes sociais e comprovantes de autenticidade.
- [ ] Mapear fluxo completo de ONG criando solicitacao de urgencia dentro da gestao.
- [ ] Mapear fluxo completo de ONG gerenciando campanhas, doadores e relatorios.
- [ ] Mapear fluxo completo de admin verificando dados, documentos e inconsistencias.
- [ ] Mapear fluxo completo de admin calculando/revisando score.
- [ ] Mapear fluxo completo de admin validando campanhas, bundles e conteudos publicados.
- [ ] Mapear fluxo completo de matchfunding desde doacao ate transparencia.

## Documentacao e qualidade

- [x] Atualizar README principal com links para os backlogs de frontend, backend e integracao/produto.
- [x] Atualizar `frontend/README.md`, que ainda estava com conteudo padrao do Vite.
- [x] Criar plano de entrega do MVP para 09/06 com prioridades.
- [x] Criar checklist de validacao do MVP para 09/06.
- [ ] Documentar contratos de API usados pelo frontend. **P0 MVP para endpoints minimos**
- [ ] Criar guia de variaveis de ambiente para frontend e backend. **P0 MVP**
- [ ] Criar checklist de validacao antes de publicar uma feature.
- [ ] Definir rotina de testes minima: lint, testes frontend, testes backend e testes de integracao. **P0 MVP para build/checks basicos**
- [ ] Revisar textos com caracteres quebrados nos documentos e na interface. **P0 MVP**
