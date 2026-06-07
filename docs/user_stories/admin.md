# User story: administrador

## Historia principal

Como administrador, quero validar ONGs, documentos, campanhas, bundles, solicitacoes de urgencia, informacoes publicas e score de confiabilidade para garantir que apenas conteudos confiaveis sejam publicados no ONG+.

## Criterios de aceitacao

- O admin deve conseguir visualizar a lista de ONGs cadastradas e seus status.
- O admin deve conseguir avaliar documentos recebidos por ONGs.
- O admin deve conseguir validar redes sociais e comprovantes de autenticidade.
- O admin deve conseguir revisar dados provenientes de APIs externas.
- O admin deve conseguir marcar inconsistencias com justificativa.
- O admin deve conseguir aprovar, rejeitar ou solicitar ajustes no cadastro de uma ONG.
- O admin deve conseguir calcular ou revisar o score estimado da ONG.
- O admin deve conseguir validar campanhas individuais.
- O admin deve conseguir validar bundles/campanhas coletivas.
- O admin deve conseguir validar solicitacoes de urgencia.
- O admin deve conseguir moderar conteudo publicado.
- O admin deve conseguir consultar historico de decisoes administrativas.

## Regras funcionais

- Apenas administradores autenticados podem acessar a area administrativa.
- Toda decisao administrativa deve registrar responsavel, data, status e justificativa.
- Dados de CNPJ devem ser validados antes da exibicao publica.
- Informacoes inconsistentes devem ser sinalizadas antes de aprovacao.
- Campanhas e bundles devem passar por validacao antes de publicacao.
- Solicitacoes de urgencia devem passar por validacao antes de se tornarem publicas ou captarem recursos.
- O score deve combinar fatores objetivos e revisao administrativa quando necessario.

## Regras de negocio

- O admin deve conseguir ver CNPJ, metas, arrecadacoes, campanhas, bundles, documentos e evidencias da ONG.
- O admin deve validar se uma ONG pode receber doacoes.
- O admin deve validar se uma ONG pode participar de bundles.
- O admin deve validar se uma campanha pode receber matchfunding.
- O admin deve validar se uma solicitacao de urgencia pode aparecer no perfil da ONG ou na transparencia.

## Regras de interface

- A area administrativa deve ter filas separadas por tipo: ONGs, documentos, campanhas, bundles, urgencias, score e moderacao.
- Cada fila deve exibir status, prioridade, data de envio e responsavel pela ultima acao.
- Deve ser possivel ver fonte dos dados, data da ultima atualizacao e consistencia das informacoes.
- Deve existir uma tela de detalhe para revisar evidencias antes de decidir.
