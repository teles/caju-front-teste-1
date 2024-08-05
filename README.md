# Caju Front End Teste

Este é o repositório do projeto Caju Front Test. Aqui estão as instruções para configurar e executar o projeto, incluindo como rodar o banco de dados, o Storybook, os testes unitários e os testes E2E.

> [!WARNING]
> As instruções originais para esse teste ainda [estão presentes logo abaixo](#instruções-originais)

## Pré-requisitos

- Node.js 20.x
- Yarn
- NVM (Node Version Manager)

## Configuração do Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/teles/caju-front-test.git
cd caju-front-test
```

### 2. Instale dependências

```bash
nvm use # certifique-se de possuir o nvm instalado
yarn install
```

### 3. Rode o banco de dados

Para iniciar o banco de dados com JSON Server:

```bash
yarn init:db
```

### 4. Rode o projeto

```bash
yarn dev
```

O projeto estará disponível em http://localhost:3001.

### 5. Rodar o Storybook

Para rodar o Storybook, utilize o comando:

```bash
yarn storybook
```

### 6. Rode os testes unitários/integração

```bash
yarn test
```

Mantenha os testes rodando e observando alterações com o comando:

```bash
yarn test:dev
```

### 7. Rode os testes e2e cypress

Certifique-se de que o servidor de desenvolvimento está rodando em http://localhost:3001.

Para rodar os testes com interface do navegador:

```bash
yarn cypress open
```

Para rodar os testes na linha de comando (headless):

```bash
yarn cypress:run
```

## Instruções originais

Esse é um teste para você demonstrar suas experiencia como front end, a aplicação basicamente se divide em duas telas, o `Dashboard` e um `Formulário`.
Voce deverá criar uma plataforma de admissão que permita o usuario adicionar uma admissão com as opções de aprovar, reprovar ou excluir.

O `Dashboard` mostra todas as admissões criadas, com as opções de Aprovar, reprovar, e excluir.

![Screenshot 2024-06-11 at 11 48 24 AM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/fedeff5c-a0d3-4df1-aebd-1f2d25c56a48)

Dashboard com os cards. (Utilize o componente `RegistrationCard`)

![Screenshot 2024-06-11 at 1 52 35 PM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/3b002341-454b-4b24-82cb-6390656b56cc)

O `Formulario` exibe um formulário simples que será utilizado para preencher o dashboard com os dados.

![Screenshot 2024-06-11 at 11 48 47 AM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/bbbb211c-165f-40e5-b2af-61adafd61398)

## Apresentanção do problema

O desafio é melhorar a organização do projeto, refatorar o código e implementar algumas regras e novas funcionalidades(logo abaixo).
Sinta-se a vontade para criar novas pastas, novos utils, contextos, custom hooks, o que achar melhor para deixar o projeto mais organizado e atigir as especificações abaixo.

## Especificações

### Dashboard

- Implementar `GET` ao carregar a pagina e ao fazer pequisa por `CPF`
- Filtrar os cards por coluna, usando o status.
- Implementar `PUT` ao clicar em Reprovar e alterar o status para `REPROVED`
- Implementar `PUT` ao clicar em Aprovar e alterar o status para `APPROVED`
- Implementar `PUT` ao clicar em Revisar novamente e alterar o status para `REVIEW`
- Implementar `DELETE` ao clicar no lixeira no card.
- Implementar um loading na tela ao realizar requisições.
- Realizar a requisição automaticamente ao preencher um CPF válido completo
- Atualizar os dados (refetch) ao clicar no icone de atualizar
- Adicionar máscara de CPF no campo de pesquisa.

### Pesquisa por CPF

Para realizar a pesquisa por CPF, utilize essa funcionalidade do json-web-server:
<br/>
https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#filter

### Formulário

- Implementar validação no campo de `email` para que aceite apenas emails válidos
- Implementar validação no campo `nome completo` para que aceite pelo menos um espaço, no mínimo duas letras, e que a primeira letra não seja um número.
- Implementar validação no campo CPF para aceitar apenas CPFs válidos e adicionar uma máscara de CPF ao campo.
- Implementar `POST` ao preencher todos os campos corretamentes.
- Redirecionar ao `/dashboard` ao criar uma nova registration.

## Regras de negócio

- Implementar tipagem correta e enums em TypeScript.
- Todas as requisições devem ter modal de confirmação da ação
- Todas as requisições devem aparecer uma notificação de sucesso ou erro
- O botão de `Reprovar` e `Aprovar` só deve aparecer em registrations com status `REVIEW`
- O botão `Revisar novamente` só deve aparecer em registration com status `REPROVED` ou `APPROVED`

## API

Você consumirá uma API mockada localmente, que será executada utilizando o json-server. Para mais informações consulte a [documentação](https://github.com/typicode/json-server/).

Exemplo de Requisição:

```
POST http://localhost:3000/registrations
Content-Type: application/json
{
  "admissionDate": "23/10/2023",
  "email": "maria@caju.com.br",
  "employeeName": "Maria Silva",
  "status": "REVIEW",
  "cpf": "12345678901"
}
```

## Extras (opcional)

- Testes Unitários e de Integração `(Obrigátorio para Senior e Tech Lead)`
- End-to-End (E2E)
- Documentação detalhada utilizando Storybook e Docusaurus
- Configuração de CI/CD com deploy automatizado

## Dicas e sugestões

- Crie custom hooks para separar a lógica da camada de UI.
- Utilize alguma lib de validação para o formulário
- Crie testes que simulem o comportamento esperado do usuario.

## Desenvolvimento

```shell
git clone https://github.com/caju-beneficios/caju-front-teste-1.git
cd caju-front-test-1
yarn
yarn dev
```

Abra outro terminal e execute:

```shell
yarn init:db
```

Para os testes

```shell
yarn test:dev
```

Se tude tiver dado certo as seguintes portas estarão disponiveis:
<br/>

Aplicação http://localhost:3001/
<br/>
Json Web Server http://localhost:3000/

`Para concluir o desenvolvimento, clone o repositório, faça as edições necessárias e depois envie a URL do novo repositório com suas alterações para o RH.`
