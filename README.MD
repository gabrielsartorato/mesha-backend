# Teste Mesha Backend

## Instruções para instalação

## Docker

Após clonado o repositório, com o docker instalado rode o seguinte comando abaixo, será criado um container de banco de dados PostgreSQL, o usuário para acesso devera ser 'mesha' e o password também para o devido funcionamento.

```docker
  docker container run -d --name mesha -e POSTGRES_PASSWORD=mesha -e POSTGRES_USER=mesha -p 5432:5432 postgres
```

## Instalação dos pacotes

Dentro da raiz do projeto, rodar o comando 'yarn' para instalação de todos os pacotes necessários para que o projeto rode

## Alimentação banco de dados

Ainda na raiz do projeto, utilize o comando abaixo para criação das tabelas do banco de dados e a previa alimentação de usuários Tipo 'Profissionais' e 'Serviços'.

```bash
  yarn typeorm migration:run
```

## Executar o servidor

Ainda na raiz do projeto rode o comando abaixo para iniciar o servidor:

```bash
  yarn dev:server
```

## Requisições

O endereço URL para requisições foi setado em http://localhost:3333

- Criação de usuário

Fazer uma requisição HTTP - POST para /users contendo em seu body as seguintes informações abaixo, onde 'type' só é permetido o tipo ATENDENTE e NORMAL:

```json
  {
    "user_name": "Ciclano",
    "password": "123456",
    "type": "ATENDENTE"
  }
```

- Autenticação

Fazer uma requisição HTTP - POST /sessions contendo em seu body as seguintes informações abaixo, sera retornado o token de acesso e as informações do usuário:

```json
  {
    "user_name": "teste5",
    "password": "123456"
  }
```

**Todas as rotas abaixo necessita de autentiação do tipo bearer token**

- Criação de Serviço (Caso precise)

Fazer uma requisição HTTP - POST /services contendo em seu body as seguintes informações abaixo:

```json
  {
    "name_service": "serviço 4",
    "minutes": 10,
    "price": 10
  }
```

- Criação de um atendimento

Fazer uma requisição HTTP - POST /attendances contendo em seu body as seguintes informações abaixo, o 'total_price' mencionado na requisição no frontend já vem contabilizado.

```json
  {
    "services": [
      {
        "service_id": 1,
        "name_service": "serviço 1",
        "price": 10
      }
    ],
    "professional_id": "any_id",
    "total_price": 10
  }
```

- Listagem Usuários

Fazer uma requisição HTTP - GET para /users, será retornada a listagem de todos os usuários do sistema.

- Listagem de Serviços

Fazer uma requisição HTTP - GET para /services, será retornada a listagem de todos os serviços cadastrados no sistema.

- Listagem de Atendimentos

Fazer uma requisição HTTP - GET para /attendances, será retornada a listagem de todos os atendimentos cadastrados no sistema.

- Inicio Atendimento

Fazer uma requisição HTTP - PUT para /attendances/starttime/:id, será iniciado a contagem do atendimento.

Fazer uma requisição HTTP - PUT para /attendances/endtime/:id, será encerrado o atendimento e contabilizado quanto tempo durou o atendimento junto com a duração.
