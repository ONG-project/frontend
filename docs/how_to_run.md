# Guia de Execucao Local - ONG+

Este guia descreve como configurar e executar localmente o **ONG+**, composto por backend Django e frontend React + Vite.

Ultima atualizacao: 2026-06-07.

## Pre-requisitos

- Python 3.10 ou superior.
- Node.js 18 ou superior, preferencialmente v20+ LTS.
- Git.
- PostgreSQL local ou acessivel pela rede.

## Passo 1: clonar o repositorio

Abra o terminal e clone o repositorio:

```bash
git clone <url-do-repositorio>
cd ongplus
```

## Passo 2: configurar e executar o backend Django

O backend e construido em Django e segue a arquitetura de monolito modular.

### 1. Acesse o diretorio do backend

```bash
cd backend
```

### 2. Crie o ambiente virtual

```bash
python -m venv .venv
```

### 3. Ative o ambiente virtual

No Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

No Windows CMD:

```cmd
.\.venv\Scripts\activate.bat
```

No Linux/macOS:

```bash
source .venv/bin/activate
```

### 4. Instale as dependencias

```bash
pip install -r requirements.txt
```

Observacao para o MVP: o codigo importa `python-decouple` e usa PostgreSQL. Caso a instalacao falhe por dependencia ausente, atualize `backend/requirements.txt` antes da entrega.

### 5. Configure o arquivo `.env`

Copie o exemplo:

```bash
cp .env.example .env
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Preencha as variaveis conforme seu PostgreSQL local:

```env
DB_NAME=nome_do_banco
DB_USER=usuario_do_banco
DB_PASSWORD=sua_senha_aqui
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=sua_secret_key_aqui
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
```

### 6. Execute as migracoes do banco de dados

Com o ambiente virtual ativado e o PostgreSQL disponivel:

```bash
python manage.py migrate
```

### 7. Popular o banco com dados de teste (Seed)

Para popular o banco com ONGs, Campanhas e Bundles fictícios para desenvolvimento:

```bash
python manage.py seed_demo_ngos
```

A saída esperada indicará as criações e atualizações. O comando é idempotente, então executá-lo novamente apenas atualizará os registros existentes sem duplicá-los.

### 8. Inicie o servidor de desenvolvimento

```bash
python manage.py runserver
```

O backend ficara disponivel em `http://localhost:8000/`.

## Executando com Docker Compose (Recomendado)

O projeto possui um arquivo `docker-compose.yml` na raiz que orquestra o banco de dados, o backend e o frontend.

Para iniciar tudo:

```bash
docker compose up --build -d
```

Para aplicar as migrações no container do backend:

```bash
docker compose exec backend python manage.py migrate
```

Para popular o banco com dados de teste (seed):

```bash
docker compose exec backend python manage.py seed_demo_ngos
```

### Visualizar o banco de dados PostgreSQL (via Docker)

Se você iniciou os serviços com `docker compose up`, o serviço do banco está disponível como `db` (container `ongplus_db`) e a base de dados padrão é `ongplus_db` com usuário `postgres` conforme o `docker-compose.yml` do projeto.

Opções para inspecionar o banco:

#### 1. Acessando pelo pgAdmin (Integrado no Docker Compose)

Após executar `docker compose up -d`, você pode acessar a interface visual do pgAdmin:

- **URL de acesso:** [http://localhost:5050](http://localhost:5050)
- **Credenciais de login:**
  - **E-mail:** `admin@admin.com`
  - **Senha:** `admin`

Para registrar e visualizar as tabelas do banco de dados no pgAdmin:
1. No menu principal, clique em **Add New Server**.
2. Na aba **General**, digite um nome descritivo (ex: `ONG+ DB`).
3. Na aba **Connection**, preencha:
   - **Host name/address:** `db`
   - **Port:** `5432`
   - **Maintenance database:** `ongplus_db`
   - **Username:** `postgres`
   - **Password:** `postgrespassword` (Marque a opção *Save password*).
4. Clique em **Save**.
5. No painel lateral esquerdo (Browser), navegue em: **Servers** -> **ONG+ DB** -> **Databases** -> **ongplus_db** -> **Schemas** -> **public** -> **Tables** para ver todas as tabelas.

#### 2. Abrir um shell `psql` dentro do container:

```bash
# Abre um shell psql interativo dentro do container do serviço db
docker compose exec db psql -U postgres -d ongplus_db

# Agora no prompt psql, listar tabelas:
\dt

# Consultar algumas linhas de uma tabela (ex: auth_user):
SELECT * FROM auth_user LIMIT 10;
```

#### 3. Conectar a partir da máquina host (se tiver `psql` instalado):

```bash
psql "host=localhost port=5432 dbname=ongplus_db user=postgres password=postgrespassword"
```

#### 4. Usar uma interface web rápida temporária (Adminer) sem alterar o compose:

```bash
# Executa temporariamente um container Adminer ligado à mesma rede do compose
docker run --rm --link ongplus_db:db -p 8080:8080 adminer

# Abra http://localhost:8080 e conecte com:
# System: PostgreSQL
# Server: db
# Username: postgres
# Password: postgrespassword
# Database: ongplus_db
```

Observação: os valores de conexão (usuário, senha e nome do banco) podem ser verificados em `docker-compose.yml`.

## Passo 3: configurar e executar o frontend React + Vite

O frontend e uma Single Page Application construida com React, Vite e Tailwind CSS.

### 1. Acesse o diretorio do frontend

```bash
cd frontend
```

### 2. Instale as dependencias

```bash
npm install
```

### 3. Configure o `.env`

Copie o exemplo:

```bash
cp .env.example .env
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Valor esperado para desenvolvimento local:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O frontend ficara disponivel em `http://localhost:5173/`, ou na porta indicada no terminal.

## Workflow diario

Mantenha dois terminais abertos.

Terminal 1, backend:

```bash
cd backend
.\.venv\Scripts\Activate.ps1
python manage.py runserver
```

Terminal 2, frontend:

```bash
cd frontend
npm run dev
```

## Comandos de validacao para o MVP

Frontend:

```bash
cd frontend
npm run build
npm run lint
```

Backend:

```bash
cd backend
python manage.py check
python manage.py migrate
```

Para acessar o painel administrativo do Django em `http://localhost:8000/admin/`, crie um usuario administrador:

```bash
python manage.py createsuperuser
```

## Documentacao relacionada

- [Plano de entrega do MVP](mvp-entrega-09-06.md)
- [Checklist de validacao do MVP](checklists/mvp-validacao-09-06.md)
