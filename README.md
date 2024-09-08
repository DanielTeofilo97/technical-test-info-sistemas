# Teste Técnico Info Sistemas

# Tecnologias
Backend:
- Node.js 
- Nest.js 
- PostgreSQL

## Instalação

Instale as dependências e devDependencies e inicie o backend.

```sh


Rodar PostgreSQL localmente
Opcional caso não tem instalado rodar o comando abaixo pra subir o banco de dados
    docker-compose up -d //up database PostgreSQL
Mudar variáveis de ambiente caso já possua PostgreSQL já instalado

npm i
npx prisma db push // criar tabelas
npx prisma db seed // popular tabela de veículos e criar adm
npm run start:dev

## Teste

Rodar testes

```sh

npm run test

```

## Documentação
Toda a documentação da api está no swagger
```sh

http://localhost:3049/docs

usuário para autenticação da api

"cpf":"51103282000",
"password":"12345678"

Na pasta docs do projeto tem a collection da api exportada do postman

```

## Licença

MIT

