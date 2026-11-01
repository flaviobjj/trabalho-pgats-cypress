# Trabalho de Conclusão de Disciplina - PGATS (Cypress)

Automação de testes End-to-End da aplicação fictícia [Automation Exercise](https://www.automationexercise.com), cobrindo os casos de teste da página [Test Cases](https://www.automationexercise.com/test_cases): **1, 2, 3, 4, 5, 8, 9, 10, 15 e 16**.

## Tecnologias

- [Cypress](https://www.cypress.io/) 13.7.3
- [@faker-js/faker](https://fakerjs.dev/) para massa de dados dinâmica
- [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) para o relatório HTML
- GitHub Actions para execução em CI

## Estrutura

```
.github/workflows/cypress.yml   # pipeline (roda a cada push/PR e manualmente)
cypress/
  e2e/
    auth.cy.js                  # Casos 1, 2, 3, 4 e 5
    produtos.cy.js              # Casos 8, 9 e 10
    checkout.cy.js              # Casos 15 e 16
  modules/                      # ações e seletores reutilizáveis por página
    home.js  cadastro.js  login.js  produtos.js  carrinho.js
  fixtures/pagamento.json       # dados de pagamento
  support/
    commands.js                 # cy.criarUsuarioApi / cy.excluirUsuarioApi
    dados.js                    # gerador de usuários (Faker)
    e2e.js
cypress.config.js
```

## Casos de teste

| Caso | Descrição | Arquivo |
| ---- | --------- | ------- |
| 1 | Cadastrar usuário | `auth.cy.js` |
| 2 | Login com e-mail e senha corretos | `auth.cy.js` |
| 3 | Login com e-mail e senha incorretos | `auth.cy.js` |
| 4 | Logout | `auth.cy.js` |
| 5 | Cadastrar usuário com e-mail já existente | `auth.cy.js` |
| 8 | Verificar todos os produtos e a página de detalhes | `produtos.cy.js` |
| 9 | Pesquisar produto | `produtos.cy.js` |
| 10 | Verificar inscrição (Subscription) na home | `produtos.cy.js` |
| 15 | Fazer pedido: registrar-se durante o checkout | `checkout.cy.js` |
| 16 | Fazer pedido: fazer login antes do checkout | `checkout.cy.js` |

## Boas práticas aplicadas

- **Seletores estáveis:** prioridade para `data-qa` e `id`; textos só para validar mensagens. Títulos que o site exibe em caixa alta via CSS são validados com regex case-insensitive.
- **Modularização:** seletores e ações isolados em `cypress/modules`, os specs só descrevem o fluxo.
- **Testes independentes:** cada teste gera um usuário único (Faker + timestamp). Pré-condições (usuário existente) são criadas pela **API** e a limpeza roda em `afterEach` também pela API, mesmo se o teste falhar.
- **Sem esperas fixas:** nenhum `cy.wait(ms)`; apenas as asserções com retry do Cypress.
- **Estabilidade no CI:** bloqueio dos hosts de anúncios do site (`blockHosts`) e `retries` em modo `run`.
- **Relatórios:** HTML com gráficos e screenshots embutidos (Mochawesome), publicado como artefato no GitHub Actions.

## Como executar localmente

Pré-requisito: Node.js 18 ou superior.

```bash
git clone <URL-DO-SEU-REPOSITORIO>
cd <pasta-do-repositorio>
npm install

npm test              # roda todos os casos (headless)
npm run cy:open       # abre o Cypress em modo interativo
npm run test:auth     # só os casos 1 a 5
npm run test:produtos # só os casos 8, 9 e 10
npm run test:checkout # só os casos 15 e 16
```

O relatório HTML é gerado em `cypress/reports/index.html` após `npm test`.

## Execução no GitHub Actions

O workflow `.github/workflows/cypress.yml` roda automaticamente a cada `push` e `pull_request` nas branches `main`/`master`, e também manualmente (aba **Actions** > **Run workflow**).

Ao final de cada execução, baixe o artefato **relatorio-mochawesome** na página da execução para abrir o relatório HTML. Em caso de falha, os screenshots ficam no artefato **screenshots-falhas**.
