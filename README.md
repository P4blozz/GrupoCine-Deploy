# GrupoCine-Deploy

Sistema de gerenciamento de assentos de cinema com QR Code integrado ao Railway.

## 🚀 Deploy no Railway

### Pré-requisitos
- Conta no [Railway](https://railway.app)
- Banco de dados MySQL configurado no Railway

### Configuração das Variáveis de Ambiente

No Railway, configure as seguintes variáveis de ambiente:

```env
DB_HOST=mysql.railway.internal
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=railway
NODE_ENV=production
PORT=3000
CODE_EXPIRY_HOURS=2
```

### Deploy Automático

1. Conecte seu repositório GitHub ao Railway
2. O Railway detectará automaticamente que é um projeto Node.js
3. As dependências serão instaladas automaticamente
4. O servidor iniciará com `npm start`

### Deploy Manual

1. Clone o repositório:
```bash
git clone https://github.com/P4blozz/GrupoCine-Deploy.git
cd GrupoCine-Deploy
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`

4. Faça o deploy usando Railway CLI:
```bash
railway login
railway link
railway up
```

## 🗄️ Banco de Dados

O sistema utiliza MySQL e criará automaticamente as tabelas necessárias:
- `seats`: Informações dos assentos
- `seat_codes`: Códigos QR gerados
- `seat_sessions`: Sessões de usuários

## 🔧 Desenvolvimento Local

Para desenvolvimento local, use a conexão pública do Railway:

```env
DB_HOST=gondola.proxy.rlwy.net
DB_PORT=59440
```

Execute o projeto:
```bash
npm run dev
```

## 📱 Acesso ao Sistema

- **Interface do usuário**: `https://seu-app.railway.app`
- **Dashboard administrativo**: `https://seu-app.railway.app/dashboard`

## 🛠️ Tecnologias

- Node.js
- Express.js
- Socket.io
- MySQL2
- Railway (Deploy)
