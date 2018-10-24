# My Sales Funnel

Essa é uma pequena aplicação para o gerenciamento de negócios em seus diferentes estágios.

## Escopo

O projeto tem por objetivo atender os seguintes objetivos:

Histórias:
```
Como um vendedor
Posso criar um negócio no meu funil de vendas
Para organizar o meu processo comercial

Como um vendedor
Posso evoluir um negócio de etapa no funil
Para organizar o meu processo comercial
```

Regras
- Quando um negócio for ganho, ele não pode mudar de etapa, mas pode ser perdido.
- Um negócio pode ser perdido em qualquer etapa
- Toda vez que uma ação inválida for executada, o usuário deve ser notificado
- É preciso gravar quando cada negócio foi ganho
- É preciso saber quanto tempo cada negócio durou em cada etapa

## Resolução

Foi utilizado Ruby on Rails e ReactJS para a implementação do projeto.
Devido a facilidade de se iniciar o projeto e integrar as tecnologias, a gem `react-rails` foi utilizada, fazendo com que o projeto envolva tanto o backend quanto o frontend. Entretanto, a construção dos mesmos foi pensada de maneira que a sua seperação seja feita de maneira simples:

- O backend apresenta uma API JSON Restful bem definida
- O stack Rails possui conhecimento apenas de um componente React (`App`) o qual renderiza na sua rota raíz
- Apenas um componente possui acoplamento à stack Rails, quanto as URLs da API.

A implementação dos objetivos foi feita da seguinte maneira:

- As regras sobre o status do negócio (ganho, perdido, etc.) foi implementado utilizando um validador novo no model `Sale`: `SaleValidator`. Nele, a verificação para a mudança de status é feita, impedindo que um negócio ganho seja movido para qualquer outro status a não ser perdido.
- Ao tentar criar um novo negócio inválido, o usuário é notificado através do próprio cartão novo, realizando validações dos campos
- Ao tentar mover um negócio para um estado inválido, o usuário é notificado através de uma notificação no topo da tela
- O model `SaleLog` guarda os diferentes momentos em que um `Sale` mudou de estado. Com isso, é possível calcular quanto tempo um negócio durou em uma determinada etapa, ou quando um negócio foi ganho.

## Considerações

A gravação de logs quando um negócio muda de etapa é feita diretamente na própria action chamada (`API::SalesController#create` ou `API::SalesController#update`). Entretanto, a idéia era utilizar Pub/Sub, em que `SaleLogListener` ouviria quando um negócio trocou de etapa, e, então, realizar a gravação. Não foi possível fazer dessa maneira pois estava ocorrendo um erro intermetente quanto ao load da classe ("A copy of SaleLogListener has been removed from the module tree but is still active!"). Com um Listener funcionando, a gravação dos logs poderia ser feita de maneira assíncrona, utilizando algum serviço de background jobs, tomando cuidado apenas com a hora em que ocorreu uma atualização (evitando que a criação do log ficasse dependente do momento em que o job é executado da fila).

Um outro ponto, mais nítido, é a não utilização de uma máscara no input de valores dos negócios. Por ser algo de maior complexidade (para se fazer diretamente) ou necessitar de incluir outra biblioteca auxiliar para tal, isso não foi feito. Para a inserção de valores, os mesmos devem ser inseridos em centavos.

## Execução

Serão necessários:

* [Docker CE](https://docs.docker.com/engine/installation/#server)
* [Docker Compose](https://docs.docker.com/compose/install/)

Primeiro, monte a imagem do Dockerfile (ela pode demorar um pouco devido a instalação do Chrome, utilizado nos testes):

```
$ docker-compose build
```

Com a imagem pronta, você pode subir o servidor com:

```
$ docker-compose up
```

Ou rodar os testes automatizados (com cobertura de código utilizando `SimpleCov`),
junto do `rubocop`:

```
$ docker-compose run app COVERAGE=true bundle exec rspec && bundle exec rubocop
```

## Demo

Uma versão demo está disponível em https://stark-fortress-57956.herokuapp.com
