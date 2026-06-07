# User story: ONG

## Historia principal

Como ONG, quero cadastrar minha instituicao, comprovar minha autenticidade, divulgar campanhas, participar de bundles, solicitar apoio emergencial e prestar contas com transparencia para ampliar minha captacao e meu impacto social.

## Criterios de aceitacao

- A ONG deve conseguir se cadastrar pelo fluxo **Sou ONG**.
- A ONG deve informar CNPJ, dados institucionais, contatos, redes sociais e area de atuacao.
- A ONG deve conseguir enviar documentos e comprovantes de autenticidade.
- A ONG deve acompanhar o status de validacao do cadastro.
- A ONG deve conseguir gerenciar seu perfil publico.
- A ONG deve conseguir criar, editar, publicar, encerrar e arquivar campanhas.
- A ONG deve conseguir solicitar participacao em bundles ou ser vinculada a bundles aprovados.
- A ONG deve conseguir criar solicitacoes de urgencia dentro da area de gestao.
- A ONG deve conseguir continuar o fluxo de urgencia ate requisitos financeiros, revisao e envio.
- A ONG deve visualizar doadores, relatorios, recibos, repasses e historico de campanhas.

## Regras funcionais

- O sistema deve consultar dados da ONG via API externa confiavel quando possivel.
- O sistema deve exibir tempo de atuacao, situacao do CNPJ, fonte dos dados e data de atualizacao.
- Campanhas encerradas devem permanecer no historico.
- Alteracoes relevantes devem ser registradas.
- Apenas administradores autorizados podem aprovar dados institucionais sensiveis.
- O perfil deve exibir selo de verificacao e score quando a ONG estiver apta.
- Solicitacoes de urgencia devem ter status: rascunho, enviada, em analise, aprovada, recusada e concluida.
- A ONG deve poder salvar rascunhos de campanhas e urgencias.

## Regras de negocio

- A ONG deve fornecer CNPJ para validacao.
- A ONG deve manter dados atualizados.
- A ONG deve comprovar atualizacoes quando solicitado.
- A ONG so deve aparecer publicamente quando cumprir os criterios minimos definidos.
- A ONG so deve captar por campanha apos validacao administrativa, quando exigido.
- A participacao em bundles depende de elegibilidade e aprovacao.
- Solicitacoes de urgencia aprovadas podem ou nao aparecer publicamente, conforme regra de produto.

## Regras de interface

- Deve ser possivel ver historico de campanhas.
- Deve ser possivel ver status de verificacao.
- Deve ser possivel solicitar alteracoes via formulario.
- Deve ser possivel visualizar feedback sobre alteracoes.
- A solicitacao de urgencia deve ficar dentro da area de gestao da ONG.
- A area de gestao deve exibir abas ou secoes para perfil, documentos, campanhas, bundles, urgencia, doadores e relatorios.
