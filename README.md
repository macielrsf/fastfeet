<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/.github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio 2: FastFeet, o início
</h3>

<h3 align="center">
  :warning: Etapa 1/4 do Desafio Final :warning:
</h3>

Esse desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack, oferecido pela [Rocketseat](https://rocketseat.com.br/)!

<blockquote align="center">“Não espere para plantar, apenas tenha paciência para colher”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafio-02?color=%2304D361">

  <a href="https://www.linkedin.com/in/macielrodrigues/">
    <img alt="Made by Maciel Santos" src="https://img.shields.io/badge/made%20by-Maciel-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/macielrsf/bootcamp-gostack-desafio-02/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rocketseat/bootcamp-gostack-desafio-02?style=social">
  </a>
</p>

<p align="center">
  <a href="#information_source-sobre-a-aplicação">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias-utilizadas">Tecnologias Utilizadas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#wrench-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :information_source: Sobre a aplicação

A aplicação desenvolvida é um app para uma transportadora fictícia, o FastFeet. Para o desenvolvimento, foi utilizado Node.js + Express com bibliotecas auxiliares para o desenvolvimento de uma API Rest, que serão listadas logo abaixo. Em recursos, a aplicação é composta por um fluxo de autenticação utilizando JWT (JSON Web Token), para assegurar que somente um usuário autenticado possa persistir dados por meio da API. Já o "core" da aplicação é composto pelo cadastro de destinários da transportadora. A aplicação frontend de integração poderá adicionar, editar e remover destinatários, caso este seja adminstrador.

## :rocket: Tecnologias Utilizadas

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Sucrase](https://github.com/alangpierce/sucrase)
- [Nodemon](https://nodemon.io/)
- [Sequelize](https://sequelize.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Vim](https://www.vim.org/) + [NerdTree](https://github.com/preservim/nerdtree)

## :wrench: Instalação

Primeiramente acesse seu terminal e execute o seguinte comando:

```sh
git clone https://github.com/macielrsf/bootcamp-gostack-desafio-02
```

Depois de "clonar" o projeto em sua máquina, execute o seguinte comando na raiz do projeto:

```sh
yarn
```

É necessário ter o [Docker](https://docker.com/) instalado. Crie uma instancia do [PostgreSQL](https://www.postgresql.org/) com as credenciais que estão disponíveis no arquivo "src/config/database.js" deste projeto. Após ter concluído essa etapa, basta executar a migração das tabelas utilizadas na aplicação, através do comando:

```sh
yarn sequelize db:migrate
````

E executar o "seed" que cria um usuário administrador padrão:

```sh
yarn sequelize db:seed:all
```

Após seguir todas essas etapas, já é possível inicializar o backend do FastFeet, através do comando:

```sh
yarn dev
```

A partir disso, a nossa aplicação backend estará disponível no endereço http://localhost:3333/, podendo assim iniciar o desenvolvimento dos frontend's integradores (web e mobile).

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com ♥ by Maciel Santos :wave: [LinkedIn](https://www.linkedin.com/in/macielrodrigues/)
