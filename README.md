# W3-Test

## Desafio 1: API REST paginada usando Node.js e Express
Introdução
Neste desafio, foi desenvolvida uma API REST simples usando Node.js e Express. A API permite a criação, atualização, exclusão e obtenção de tarefas. As tarefas são armazenadas em memória e a API suporta paginação através dos parâmetros "limit" e "page".

### Funcionalidades da API
1. Obter tarefas (GET /tasks)
Este endpoint retorna um array de objetos de tarefa no formato JSON. É possível realizar a paginação das tarefas usando os parâmetros opcionais "limit" e "offset". Por padrão, o limite é 3 e a página inicia em 1.

Exemplo de uso:

```bash
GET /tasks?limit=3&page=1
```
2. Adicionar tarefa (POST /tasks)
Este endpoint permite adicionar uma nova tarefa ao array de tarefas. É necessário enviar um objeto de tarefa no corpo da requisição no formato JSON. As informações obrigatórias são "title" (string) e "isDone" (booleana).

Exemplo de uso:

```bash
POST /tasks
```
```json
{
  "title": "Estudar JavaScript",
  "isDone": false
}
```

3. Atualizar tarefa (PATCH /tasks)
Este endpoint permite atualizar uma tarefa existente com base no seu ID. É necessário fornecer o ID da tarefa como parâmetro na URL e enviar um objeto contendo os parâmetros a serem atualizados no corpo da requisição no formato JSON. É possível atualizar o título e o status de conclusão da tarefa.

Exemplo de uso:

```bash
PATCH /tasks/1
```
```json
{
  "title": "Aprender React",
  "isDone": true
}
```

4. Remover tarefa (DELETE /tasks)
Este endpoint permite remover uma tarefa existente com base no seu ID. É necessário fornecer o ID da tarefa como parâmetro na URL.

Exemplo de uso:

```bash
DELETE /tasks/1
```

### Desafio 2: Aplicação de Lista de Tarefas paginada usando React

Neste desafio, foi criada uma aplicação em React que consome a API de tarefas criada no Desafio 1. 
A aplicação exibe uma lista de tarefas paginada, com 5 tarefas por página. É possível criar uma nova tarefa, atualizar o titulo da tarefa, marcar uma tarefa como concluída e excluir uma tarefa. 
As tarefas concluídas são exibidas com um estilo diferente.

#### Tecnologias Utilizadas ✏️:
- React
- Vite
- TypeScript
- React Query
- Tailwind CSS

### Configuração do Projeto

Clone o repositório do projeto:

```bash
git clone https://github.com/davioliveira-dev/w3-test
```

Instale as dependências do projeto:

```bash
cd w3-test/client && npm install
```

Inicie a aplicação:

```bash:
npm run dev
```

Acesse a aplicação em seu navegador em http://localhost:3000.

### Backend
O backend foi desenvolvido utilizando Node.js, Express e TypeScript. A arquitetura do projeto segue os princípios da Arquitetura Limpa (Clean Architecture) com foco em Separation of Concerns (Separação de Responsabilidades), Dependency Injection (Injeção de Dependências), Single Responsibility Principle (Princípio da Responsabilidade Única) e outros conceitos de design sólidos.

Os testes foram escritos utilizando o test runner nativo do Node.js, aproveitando as funcionalidades disponíveis na versão 20 para rodar os testes. Foram criados testes unitários e de integração para garantir o bom funcionamento do backend.

#### Como executar o Backend
Clone o repositório do projeto:

```bash
git clone [<URL_DO_REPOSITORIO>](https://github.com/davioliveira-dev/w3-test)
```

Instale as dependências do projeto:

```bash
cd w3-test/client && npm install
```

Inicie a aplicação:

```bash:
npm run dev
```
O backend estará em execução em http://localhost:3333.

### Como executar os testes (Requer Node.js >= v20
Acesse a pasta do backend:

```bash
cd w3-test/server
```

Execute o comando para rodar os testes:

```bash
npm run test
```

Os testes serão executados e os resultados serão exibidos no console.

### Conclusão
O projeto foi desenvolvido dentro do prazo estabelecido, iniciando na quarta-feira à noite e finalizando na sexta-feira à noite. 
Durante esse período, foram implementadas as funcionalidades solicitadas, criados os testes necessários e seguidos os princípios da Arquitetura Limpa para garantir a qualidade e a organização do código.

Caso eu tivesse mais detalhes, poderia ter implementado uma melhor arquitetura e UI no frontend e escrito testes automatizados para as funcionalidades utilizadas.
Desafio bem tranquilo de desenvolver e bem fácil de dar manutenção ou implementar novas features como um ORM (Prisma, TypeORM), Websockets e Autenticação.
