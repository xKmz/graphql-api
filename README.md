## Desafio Back-End Developer ##

### Preparando ambiente: ###

1. Instalando dependências:

**`yarn install`**

2. Preparando containers:

**`docker-compose up`**

3. Subindo serviço:

**`yarn build`**

Poderá acessar o serviço na url: http://localhost:4000/

4. Testes:

**`yarn test`**

## Informações gerais do projeto: ##

- Inicalmente tentei efetuar o projeto todo em typescript, mas infelizmente tive alguns problemas com as libs e não consegui efetuar com sucesso as relations no graphql, imagino que com mais tempo poderia acabar resolvendo essa questão.

- Já na parte de testes, tive uma certa dificuldade para efetuar eles nos resolvers, pela estrutura que necessita criar querys prontas e enviar, não vi de forma rápida e clara uma forma de passar argumentos, as formas que tentei infelizmente não funcionaram. Acredito que para nesses casos deveria criar um mock do banco e assim montar os testes.

- No caso que consegui efetuar alguns testes pelo graphql utilizei a lógica de Fakes, aonde ele copia a lógica de implementação do resolver e trabalha sem banco de dados, apenas salvando na memória.

- Acredito que no geral foi um bom teste, pude aprender coisas novas, mesmo com alguns problemas que encontrei ainda assim foi divertido!

