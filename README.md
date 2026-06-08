# ONG+ | Matchfunding, Transparencia e Doacoes para Impacto Social

![ONG+ Banner](frontend/src/assets/about_us.png)

> Plataforma para conectar doadores, ONGs verificadas, campanhas individuais e campanhas coletivas por causa, com transparencia operacional, score de confiabilidade e modelo de matchfunding.

---

## Sobre o Projeto

O **ONG+** e uma plataforma de doacao e acompanhamento de impacto social. O produto aproxima doadores de organizacoes confiaveis por meio de verificacao documental, transparencia publica, campanhas auditaveis e um sistema de score que ajuda a indicar o nivel de confiabilidade de cada ONG.

A proposta tambem inclui **matchfunding**: doacoes feitas por pessoas ou empresas podem ser combinadas com recursos adicionais de parceiros, fundos institucionais ou campanhas tematicas. Assim, uma doacao individual pode ter seu impacto ampliado quando atende criterios definidos de causa, campanha, ONG ou programa coletivo.

O sistema deve atender tres perfis principais:

- **Doador**: explora causas, ONGs, bundles e campanhas; realiza doacoes; acompanha recibos, historico, transparencia e impacto.
- **ONG**: cadastra dados institucionais, envia documentos, comprova autenticidade, cria campanhas, solicita apoio emergencial e acompanha doadores, relatorios e repasses.
- **Administrador**: valida cadastros, documentos, campanhas, informacoes publicas, solicitacoes de urgencia, conteudos publicados e calculo estimado do score.

---

## Escopo Proposto

### Cadastro e Controle de Acesso

- Refatorar a tela de cadastro para separar claramente os fluxos **Sou ONG** e **Sou doador**.
- Criar onboarding de ONG com CNPJ, dados institucionais, redes sociais, documentos, comprovantes de autenticidade e dados bancarios.
- Implementar autenticacao real, sessao persistente e recuperacao de senha.
- Implementar controle de acesso por perfil: visitante, doador, ONG e administrador.
- Bloquear telas e acoes indevidas para cada perfil, com mensagens claras.

### Doadores

- Explorar ONGs individuais, causas, campanhas e bundles.
- Doar para uma ONG especifica, para uma campanha individual, para um fundo/causa ou para uma campanha coletiva.
- Visualizar historico de doacoes, recibos, status de pagamento e relatorios de impacto.
- Acompanhar transparencia financeira, evidencias, score e status de verificacao das ONGs.

### ONGs

- Gerenciar perfil institucional, documentos, autenticidade, redes sociais e dados publicos.
- Criar, editar, publicar, encerrar e arquivar campanhas.
- Acompanhar campanhas ativas, historico, doadores, relatorios e repasses.
- Criar solicitacoes de urgencia dentro da tela de gestao da ONG, com etapas completas, incluindo requisitos financeiros.
- Acompanhar status de solicitacoes emergenciais: rascunho, enviada, em analise, aprovada, recusada e concluida.

### Administrador

- Avaliar documentos recebidos por ONGs.
- Validar informacoes enviadas e dados obtidos de fontes externas.
- Realizar calculo estimado e revisao do score de confiabilidade.
- Validar, publicar, reprovar ou solicitar ajustes em campanhas.
- Moderar conteudo publicado.
- Aprovar ou rejeitar cadastros de ONGs.
- Validar solicitacoes de urgencia e definir sua visibilidade publica.
- Auditar bundles, campanhas coletivas e criterios de distribuicao de recursos.

### Causas, Campanhas e Bundles

- Refatorar a tela de causas para exibir:
  - ONGs individuais.
  - Campanhas individuais.
  - **Bundles** de ONGs.
- Um **bundle** representa uma campanha coletiva por tema, por exemplo combate ao cancer, educacao infantil ou emergencia climatica.
- Doadores contribuem para uma causa promovida como uma unidade, e as ONGs aprovadas no programa recebem os recursos conforme regras de distribuicao e criterios de elegibilidade.
- O sistema deve registrar meta, arrecadacao, progresso, status, ONGs participantes, criterios de repasse e historico de cada campanha.

### Matchfunding

- Permitir que campanhas e bundles tenham regras de contrapartida.
- Registrar patrocinadores, fundos parceiros ou regras internas que ampliam doacoes qualificadas.
- Exibir ao doador quando a doacao possui match, qual multiplicador se aplica e quais limites existem.
- Registrar contabilmente o valor doado pelo usuario, o valor de match e o destino final dos recursos.
- Refletir valores combinados nos relatorios de transparencia e impacto.

### Transparencia

- Refazer a tela de transparencia para apresentar dados verificaveis e atualizados.
- Exibir fonte dos dados, data da ultima verificacao, documentos publicos, relatorios, historico financeiro e evidencias.
- Mostrar indicadores de consistencia, alteracoes desde a ultima verificacao e status de confiabilidade.
- Diferenciar transparencia de ONG individual, campanha individual, bundle e solicitacao emergencial.

### Sobre

- Refatorar a tela de Sobre para explicar:
  - Objetivo do projeto.
  - Modelo de matchfunding.
  - Como ONGs sao verificadas.
  - Como funciona o score.
  - Como campanhas e bundles sao aprovados.
  - Como doadores acompanham impacto e transparencia.

---

## Arquitetura do Projeto

O repositorio adota o padrao **monorepo**, reunindo backend, frontend e documentacao.

```text
ongplus/
|-- backend/      # API REST em Django
|-- frontend/     # SPA em React + Vite
|-- docs/         # Workflows, user stories, guias e estado de integracao
```

### Backend

O backend segue uma organizacao de monolito modular em Django. Os dominios previstos incluem:

- `authentication`: usuarios, perfis, autenticacao e permissoes.
- `verification`: verificacao de ONGs, documentos, score e autenticidade.
- `financial`: doacoes, pagamentos, recibos, matchfunding e repasses.
- `transparency`: relatorios, evidencias, metricas de impacto e dados publicos.
- `urgency_request`: solicitacoes emergenciais e workflow de aprovacao.

### Frontend

O frontend e uma SPA em React + Vite. O escopo esperado inclui telas publicas, area do doador, area de gestao da ONG e area administrativa com controle de acesso por perfil.

---

## Documentacao do Escopo

- [Plano de entrega do MVP - 09/06/2026](docs/mvp-entrega-09-06.md)
- [Checklist de validacao do MVP - 09/06/2026](docs/checklists/mvp-validacao-09-06.md)
- [Estado de mocks e integracao do frontend](docs/estado-mocks-e-integracao.md)
- [User story do doador](docs/user_stories/doador.md)
- [User story da ONG](docs/user_stories/ong.md)
- [User story do administrador](docs/user_stories/admin.md)
- [Workflow da ONG](docs/workflow/ong_workflow.md)
- [Workflow do doador](docs/workflow/client_workflow.md)

---

## Como Executar Localmente

Consulte o guia de execucao:

- [How to Run](docs/how_to_run.md)

---

## Contribuindo

1. Crie uma branch a partir de `develop`.
2. Consulte o documento de estado de integracao e mocks antes de alterar telas com dados ficticios.
3. Adicione validacoes e testes quando a mudanca afetar regra de negocio ou fluxo critico.
4. Abra um Pull Request descrevendo escopo, telas/APIs alteradas e evidencias de teste.
