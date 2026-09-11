# Requisitos

## 1. Escopo

A aplicação web deverá permitir o gerenciamento de funcionários.

### 1.1 Funcionalidades

A aplicação web deverá oferecer as seguintes funcionalidades:

- visualizar a lista de funcionários cadastrados;
- cadastrar um funcionário;
- editar um funcionário;
- excluir um funcionário.

### 1.2 Fora do escopo

Não fazem parte do escopo do projeto:

- autenticação;
- autorização;
- paginação da lista de funcionários;
- busca de funcionários;
- ordenação da lista de funcionários;
- responsividade;
- mensagens de sucesso na interface;
- mensagens de erro na interface;
- indicadores de carregamento na interface;
- confirmação antes da execução de operações na interface;
- testes de frontend;
- upload de arquivos;
- Docker.

## 2. Requisitos funcionais

### 2.1 Visualização de funcionários

**RF01 — Visualizar funcionários**

A aplicação web deverá permitir que o usuário visualize uma lista contendo os funcionários cadastrados.

### 2.2 Cadastro de funcionário

**RF02 — Cadastrar um funcionário**

A aplicação web deverá permitir que o usuário cadastre um funcionário.

### 2.3 Edição de funcionário

**RF03 — Editar um funcionário**

A aplicação web deverá permitir que o usuário edite os dados de um funcionário cadastrado.

### 2.4 Exclusão de funcionário

**RF04 — Excluir um funcionário**

A aplicação web deverá permitir que o usuário exclua um funcionário cadastrado.

## 3. Dados dos funcionários

Todo funcionário deverá possuir os seguintes dados:

- `id`;
- nome;
- cargo;
- telefone.

## 4. Organização da aplicação

A aplicação web deverá estar organizada em três partes principais: frontend, backend e banco de dados.

## 5. Frontend

O frontend deverá ser responsável pela interface web da aplicação e pela interação com a API REST.

### 5.1 Interface web

A interface web deverá ser composta por uma única página. Essa página deverá ser composta pelas seguintes partes:

- cabeçalho;
- seção "Cadastrar novo funcionário";
- seção "Editar funcionário";
- seção "Lista de funcionários cadastrados";
- rodapé.

#### 5.1.1 Cabeçalho

O cabeçalho deverá apresentar apenas o título:

"Sistema de Gerenciamento de Funcionários"

#### 5.1.2 Seção Cadastrar novo funcionário

A seção "Cadastrar novo funcionário" deverá apresentar o formulário de cadastro.

O formulário de cadastro deverá possuir os seguintes campos:

- "nome";
- "cargo";
- "telefone".

O formulário de cadastro deverá possuir o botão "Cadastrar".

Ao enviar o formulário de cadastro:

- o frontend deverá enviar a requisição de cadastro para a API REST;
- o formulário de cadastro deverá ser limpo;
- a lista de funcionários deverá ser atualizada automaticamente.

#### 5.1.3 Seção Editar funcionário

A seção "Editar funcionário" deverá apresentar inicialmente a mensagem:

"O formulário de edição será exibido aqui."

Enquanto nenhum funcionário estiver sendo editado, o formulário de edição deverá permanecer oculto.

Ao selecionar um funcionário para edição:

- a mensagem deverá ser ocultada;
- o formulário de edição deverá ser exibido preenchido com os dados atuais do funcionário.

O formulário de edição deverá possuir os seguintes campos:

- "nome";
- "cargo";
- "telefone".

O formulário de edição deverá possuir os seguintes botões:

- "Salvar";
- "Cancelar".

O formulário de edição deverá permitir o envio mesmo quando o usuário não tiver alterado os valores dos campos "nome", "cargo" e "telefone".

Ao salvar as alterações:

- o frontend deverá enviar a requisição de edição para a API REST;
- o formulário de edição deverá ser limpo;
- a lista de funcionários deverá ser atualizada automaticamente;
- a mensagem deverá ser exibida novamente;
- o formulário de edição deverá ser ocultado.

Ao cancelar a edição:

- nenhuma alteração deverá ser realizada na lista de funcionários;
- o formulário de edição deverá ser limpo;
- a mensagem deverá ser exibida novamente;
- o formulário de edição deverá ser ocultado.

#### 5.1.4 Seção Lista de funcionários cadastrados

A seção "Lista de funcionários cadastrados" deverá apresentar a lista de funcionários cadastrados.

A lista de funcionários deverá ser exibida automaticamente ao carregar a aplicação.

Cada funcionário da lista deverá apresentar:

- nome;
- cargo;
- telefone;
- botão "Editar";
- botão "Excluir".

Ao clicar no botão "Excluir":

- o frontend deverá enviar a requisição de exclusão para a API REST;
- a lista de funcionários deverá ser atualizada automaticamente.

#### 5.1.5 Rodapé

O rodapé deverá apresentar apenas o texto:

"Projeto pessoal desenvolvido por Lorenzo Fernandes Aguiar"

## 6. Backend

O backend deverá ser responsável pela implementação da API REST e pela comunicação com o banco de dados.

### 6.1 API REST

A API REST deverá receber as requisições do frontend e retornar as respostas correspondentes.

#### 6.1.1 Endpoints

A API REST deverá disponibilizar os seguintes endpoints:

- O endpoint `GET /employees` deverá retornar a lista de funcionários cadastrados;
- O endpoint `POST /employees` deverá criar um novo funcionário;
- O endpoint `PUT /employees/:id` deverá atualizar um funcionário existente;
- O endpoint `DELETE /employees/:id` deverá remover um funcionário existente.

#### 6.1.2 Requisições

As requisições para os endpoints `POST /employees` e `PUT /employees/:id` deverão possuir um corpo no formato JSON.

O corpo da requisição deverá possuir as seguintes propriedades:

- `name`;
- `position`;
- `phone`.

O endpoint `POST /employees` não deverá exigir a propriedade `id` no corpo da requisição.

Os endpoints `PUT /employees/:id` e `DELETE /employees/:id` deverão utilizar o `id` informado na URL para identificar o funcionário a ser atualizado ou removido.

As requisições para os endpoints `GET /employees` e `DELETE /employees/:id` não deverão possuir um corpo.

#### 6.1.3 Respostas de sucesso

A API REST deverá retornar as seguintes respostas para as operações realizadas com sucesso:

- O endpoint `GET /employees` deverá retornar o status HTTP `200 (OK)` e a lista de funcionários cadastrados no corpo da resposta;
- O endpoint `POST /employees` deverá retornar o status HTTP `201 (Created)` e os dados do funcionário criado no corpo da resposta;
- O endpoint `PUT /employees/:id` deverá retornar o status HTTP `200 (OK)` e os dados do funcionário atualizado no corpo da resposta;
- O endpoint `DELETE /employees/:id` deverá retornar o status HTTP `204 (No Content)` sem corpo na resposta.

As respostas de sucesso que possuírem corpo deverão utilizar o formato JSON.

Os dados de um funcionário presentes no corpo das respostas deverão conter as seguintes propriedades:

- `id`;
- `name`;
- `position`;
- `phone`.

#### 6.1.4 Respostas de erro

A API REST deverá retornar o status HTTP `400 (Bad Request)` quando uma ou mais das propriedades `name`, `position` e `phone` não estiverem presentes na requisição ou forem nulas.

A API REST deverá retornar o status HTTP `404 (Not Found)` quando o funcionário identificado pelo `id` informado na URL não existir durante uma operação de atualização ou remoção.

A API REST deverá retornar o status HTTP `500 (Internal Server Error)` quando ocorrer um erro interno durante o processamento de uma requisição.

As respostas de erro dos status HTTP `400`, `404` e `500` deverão possuir um corpo no formato JSON contendo a propriedade `message` com uma mensagem descrevendo o erro.

### 6.2 Comunicação com o banco de dados

O backend deverá se comunicar com o banco de dados para realizar as operações de consulta, criação, atualização e remoção de funcionários.

### 6.3 Servidor HTTP

O backend deverá iniciar um servidor HTTP para disponibilizar a API REST e os arquivos que compõem o frontend da aplicação web.

### 6.4 Configuração do ambiente

A configuração do backend deverá ser realizada por meio de variáveis de ambiente.

As variáveis de ambiente deverão definir as informações necessárias para a conexão com o banco de dados e a porta utilizada pelo servidor HTTP.

## 7. Banco de dados

O banco de dados deverá ser responsável pelo armazenamento dos dados dos funcionários.

A aplicação web deverá utilizar o PostgreSQL como sistema gerenciador de banco de dados.

### 7.1 Tabela de funcionários

O banco de dados deverá possuir uma tabela denominada `employees`.

A tabela `employees` deverá possuir as seguintes colunas:

| Coluna | Tipo | Restrições |
|---------|------|------------|
| `id` | `SERIAL` | `PRIMARY KEY` |
| `name` | `VARCHAR(100)` | `NOT NULL` |
| `position` | `VARCHAR(100)` | `NOT NULL` |
| `phone` | `VARCHAR(15)` | `NOT NULL` |

## 8. Validação dos dados

### 8.1 Validação na interface web

Durante o cadastro e a edição de um funcionário, a interface web deverá:

- exigir que os campos "nome", "cargo" e "telefone" sejam preenchidos;
- permitir que os valores dos campos "nome", "cargo" e "telefone" sejam compostos apenas por espaços em branco;
- não exigir um tamanho mínimo para os valores dos campos "nome", "cargo" e "telefone";
- exigir que o valor do campo "nome" possua no máximo 100 caracteres;
- exigir que o valor do campo "cargo" possua no máximo 100 caracteres;
- exigir que o valor do campo "telefone" possua no máximo 15 caracteres;
- não exigir que os valores dos campos "nome", "cargo" e "telefone" apresentem um formato específico.

### 8.2 Validação na API REST

Ao receber uma requisição para criar ou atualizar um funcionário, a API REST deverá:

- exigir que as propriedades `name`, `position` e `phone` estejam presentes na requisição;
- exigir que os valores das propriedades `name`, `position` e `phone` não sejam nulos;
- permitir que os valores das propriedades `name`, `position` e `phone` sejam compostos apenas por espaços em branco;
- não exigir um tamanho mínimo para os valores das propriedades `name`, `position` e `phone`;
- não exigir um tamanho máximo para os valores das propriedades `name`, `position` e `phone`;
- não exigir que os valores das propriedades `name`, `position` e `phone` apresentem um formato específico.

## 9. Testes

A aplicação web deverá possuir testes automatizados para verificar o comportamento do backend.

### 9.1 Testes unitários

Os testes unitários deverão verificar, de forma isolada, o comportamento das operações realizadas pelo backend.

Os testes unitários deverão verificar:

- o retorno da lista de funcionários;
- a criação de um funcionário;
- a atualização de um funcionário existente;
- a remoção de um funcionário existente;
- o retorno do status HTTP `400 (Bad Request)` quando uma ou mais propriedades obrigatórias estiverem ausentes;
- o retorno do status HTTP `404 (Not Found)` quando o funcionário não existir durante uma operação de atualização ou remoção;
- o retorno do status HTTP `500 (Internal Server Error)` quando ocorrer um erro durante o processamento da requisição;
- a propagação de erros ocorridos durante as operações no banco de dados.

### 9.2 Testes de integração

Os testes de integração deverão verificar o comportamento da API REST por meio de requisições HTTP.

Os testes de integração deverão verificar:

- o retorno da lista de funcionários pelo endpoint `GET /employees`;
- a criação de um funcionário pelo endpoint `POST /employees`;
- o retorno do status HTTP `400 (Bad Request)` pelo endpoint `POST /employees` quando uma ou mais propriedades obrigatórias estiverem ausentes;
- a atualização de um funcionário pelo endpoint `PUT /employees/:id`;
- o retorno do status HTTP `400 (Bad Request)` pelo endpoint `PUT /employees/:id` quando uma ou mais propriedades obrigatórias estiverem ausentes;
- o retorno do status HTTP `404 (Not Found)` pelo endpoint `PUT /employees/:id` quando o funcionário não existir;
- a remoção de um funcionário pelo endpoint `DELETE /employees/:id`;
- o retorno do status HTTP `404 (Not Found)` pelo endpoint `DELETE /employees/:id` quando o funcionário não existir.

### 9.3 Ambiente de testes

O ambiente de testes deverá utilizar um banco de dados separado do banco de dados utilizado pela aplicação web.

O banco de dados de testes deverá possuir a mesma estrutura da tabela de funcionários utilizada pela aplicação.