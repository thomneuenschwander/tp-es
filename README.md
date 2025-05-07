# PizzaPlanet

Bem-vindo ao PizzaPlanet, o seu destino intergaláctico para a melhor experiência de pizza do universo! 🚀🍕

Imagine um lugar onde a tradição italiana encontra a inovação espacial. No PizzaPlanet, não apenas entregamos pizzas - nós as transportamos através de uma experiência única, combinando tecnologia de ponta com o sabor autêntico que você merece.

Nossa plataforma oferece:
- Entrega ultrarrápida com rastreamento em tempo real
- Cardápio intergaláctico com sabores exclusivos
- Sistema de pedidos intuitivo e fácil de usar
- Programa de fidelidade com recompensas cósmicas

Seja você um terráqueo faminto ou um viajante espacial esfomeado, o PizzaPlanet está aqui para te atender!

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Git

## Estrutura do Projeto

O projeto está organizado em uma estrutura monorepo com os seguintes diretórios principais:

- `apps/frontend`: Aplicação React
- `apps/backend`: API Node.js
- `packages`: Pacotes compartilhados (se houver)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/thomneuenschwander/tp-es.git
cd tp-es
```

2. Instale as dependências do projeto:
```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na pasta `apps/backend` com as seguintes variáveis:

```env
DB_NAME=pizzaPlanet
DB_USER=postgres
DB_PASSWORD=####
DB_HOST=localhost
STRIPE_SECRET_KEY=teste
PORT=3000
```

## Executando o Projeto

### Desenvolvimento

Para executar o frontend e backend em modo de desenvolvimento:

1. Inicie o backend:
```bash
cd backend
npm run dev
```

2. Em outro terminal, inicie o frontend:
```bash
cd frontend
npm run dev
```

O frontend estará disponível em `http://localhost:3000` e o backend em `http://localhost:3001`.

### Seed do Banco de Dados

Para popular o banco de dados com dados iniciais:

```bash
npm run seed:backend
```

## Scripts Disponíveis

- `npm run dev:frontend`: Inicia o frontend em modo de desenvolvimento
- `npm run dev:backend`: Inicia o backend em modo de desenvolvimento
- `npm run seed:backend`: Executa o script de seed do banco de dados


## Tecnologias Principais

### Frontend
- React
- TypeScript
- Leaflet (para mapas)
- React Leaflet
- Axios

### Backend
- Node.js
- TypeScript
- Express
- CORS

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`npm run cz`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença ISC.
