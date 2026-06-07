# Checklist de validacao do MVP - 09/06/2026

Ultima atualizacao: 2026-06-02.

Use este checklist antes da entrega do MVP. Itens marcados como "mockado" podem passar no MVP desde que estejam documentados e nao sejam apresentados como integracao real.

## Ambiente

- [ ] `frontend/.env.example` aponta para a URL correta da API.
- [ ] `backend/.env.example` lista todas as variaveis obrigatorias.
- [ ] Backend sobe localmente com PostgreSQL configurado.
- [x] Frontend sobe localmente com Vite.
- [ ] `npm run build` passa no frontend.
- [ ] Check basico do Django passa.

## Navegacao principal

- [x] Home abre em `/`.
- [x] Causas abre em `/causas`.
- [x] Perfil publico de ONG abre em `/ong/:id`.
- [x] Transparencia geral abre em `/transparency`.
- [x] Transparencia de ONG abre em `/ong/:id/transparency`.
- [x] Doacao abre em `/doacao`.
- [x] Login abre em `/login`.
- [x] Cadastro abre em `/register`.
- [x] Perfil do doador abre em `/donor-profile`.
- [x] Gestao da ONG abre em `/gestao-ong`.

## Fluxo publico

- [ ] Visitante consegue navegar da home para causas.
- [ ] Visitante consegue filtrar ou buscar ONGs, mesmo que com dados mockados/fixture.
- [ ] Visitante consegue abrir o perfil de uma ONG.
- [ ] Visitante consegue abrir transparencia da ONG.
- [ ] Visitante consegue iniciar fluxo visual de doacao.

## Fluxo do doador

- [ ] Login demonstravel redireciona para perfil do doador.
- [ ] Perfil do doador exibe resumo, historico e recibos mockados/fixture.
- [ ] Logout retorna para a home.
- [ ] Fluxos mockados estao identificados na documentacao.

## Fluxo da ONG

- [ ] Area de gestao da ONG abre sem erro.
- [ ] Painel mostra perfil, campanhas, doadores e relatorios em estado demonstravel.
- [ ] Solicitacao de urgencia esta acessivel ou a separacao esta documentada como limitacao do MVP.
- [ ] Campos/acoes sem persistencia real estao documentados como mockados.

## Backend minimo

- [ ] Endpoint de healthcheck responde.
- [ ] Endpoint de listagem de ONGs responde.
- [ ] Endpoint de detalhe de ONG responde.
- [ ] Endpoint ou fixture de transparencia de ONG esta documentado.
- [ ] Dados retornados possuem formato compativel com o frontend.

## Qualidade

- [ ] Textos quebrados foram corrigidos nas telas principais.
- [x] Links e botoes principais nao levam a estados incoerentes (6 críticos, 8 altos e 6 médios resolvidos).
- [ ] Telas conectadas a API possuem loading e erro basicos.
- [ ] Limitacoes conhecidas estao registradas no plano do MVP ou README.
- [ ] Backlogs seguem separados entre P0, P1 e pos-MVP.
