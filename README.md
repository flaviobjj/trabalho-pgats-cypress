🧪 Automação de Testes E2E com Cypress
Trabalho de Conclusão de Disciplina · PGATS

Automação dos casos de teste 1, 2, 3, 4, 5, 8, 9, 10, 15 e 16 da aplicação fictícia Automation Exercise

Cypress Tests Mostrar Imagem Mostrar Imagem Mostrar Imagem Mostrar Imagem

</div>
📋 Índice
Sobre o projeto
Casos de teste
Tecnologias
Estrutura do projeto
Como executar
Relatório de testes
Execução no GitHub Actions
Boas práticas aplicadas
Autor
🎯 Sobre o projeto

Este projeto automatiza fluxos reais de um e-commerce de treino: cadastro, login, logout, busca de produtos, inscrição na newsletter e finalização de pedido.

A ideia central é ter testes rápidos, independentes e fáceis de manter:

	
⚡ Rápido	Pré-condições (como criar um usuário) são feitas pela API, não pela tela
🔒 Independente	Cada teste cria o próprio usuário e apaga no final, sem depender de outro teste
🧩 Organizado	Seletores e ações ficam em módulos reutilizáveis; os testes só contam a história
📊 Rastreável	Relatório HTML com gráficos e screenshots, gerado a cada execução
✅ Casos de teste
#	Caso	Arquivo
1	👤 Cadastrar usuário	auth.cy.js
2	🔑 Login com e-mail e senha corretos	auth.cy.js
3	❌ Login com e-mail e senha incorretos	auth.cy.js
4	🚪 Logout	auth.cy.js
5	⚠️ Cadastrar usuário com e-mail já existente	auth.cy.js
8	🛍️ Verificar todos os produtos e a página de detalhes	produtos.cy.js
9	🔎 Pesquisar produto	produtos.cy.js
10	📧 Verificar inscrição (Subscription) na home	produtos.cy.js
15	🛒 Fazer pedido registrando-se durante o checkout	checkout.cy.js
16	🛒 Fazer pedido fazendo login antes do checkout	checkout.cy.js
🛠️ Tecnologias
Ferramenta	Para que serve
Cypress 13.7.3	Framework de testes E2E
Faker	Geração de dados dinâmicos (nome, e-mail, endereço)
Mochawesome Reporter	Relatório HTML dos testes
GitHub Actions	Execução automática (CI)
📁 Estrutura do projeto
text
📦 trabalho-pgats-cypress
├── 📂 .github/workflows
│   └── cypress.yml            # Pipeline de CI
├── 📂 cypress
│   ├── 📂 e2e                 # 🧪 Os testes
│   │   ├── auth.cy.js         #    Casos 1, 2, 3, 4 e 5
│   │   ├── produtos.cy.js     #    Casos 8, 9 e 10
│   │   └── checkout.cy.js     #    Casos 15 e 16
│   ├── 📂 modules             # 🧩 Ações e seletores por página
│   │   ├── home.js
│   │   ├── cadastro.js
│   │   ├── login.js
│   │   ├── produtos.js
│   │   └── carrinho.js
│   ├── 📂 fixtures
│   │   └── pagamento.json     # Dados do cartão de teste
│   └── 📂 support
│       ├── commands.js        # cy.criarUsuarioApi / cy.excluirUsuarioApi
│       ├── dados.js           # Gerador de usuários (Faker)
│       └── e2e.js
├── cypress.config.js          # Configurações do Cypress
├── package.json
└── README.md
🔄 Como um teste funciona
🎲 Gera usuáriocom Faker
⚙️ Cria via APIse necessário
🖥️ Executa o fluxona interface
✔️ Valida osresultados
🧹 Apaga o usuáriovia API
🚀 Como executar
📌 Pré-requisitos
Node.js versão 18 ou superior
Git

Para conferir, rode node --version no terminal.

👣 Passo a passo

1️⃣ Clone o repositório

bash
git clone https://github.com/flaviobjj/trabalho-pgats-cypress.git

2️⃣ Entre na pasta do projeto

bash
cd trabalho-pgats-cypress

3️⃣ Instale as dependências

bash
npm install

⏳ Na primeira vez pode levar alguns minutos, pois baixa o Cypress.

4️⃣ Rode os testes

bash
npm test

5️⃣ Veja o relatório em cypress/reports/index.html 🎉

🎛️ Outros comandos
Comando	O que faz
npm test	▶️ Roda todos os casos (sem abrir janela)
npm run cy:open	👀 Abre o Cypress no modo visual (ótimo para acompanhar passo a passo)
npm run test:auth	🔐 Só os casos 1 a 5
npm run test:produtos	🛍️ Só os casos 8, 9 e 10
npm run test:checkout	🛒 Só os casos 15 e 16
📊 Relatório de testes

Após npm test, abra o arquivo:

text
cypress/reports/index.html

O relatório mostra:

✅ Quantos testes passaram e falharam
📈 Gráficos de resultado
⏱️ Duração de cada caso
📸 Screenshot automático em caso de falha
⚙️ Execução no GitHub Actions

O workflow .github/workflows/cypress.yml roda automaticamente a cada push e pull_request nas branches main e master.

Também dá para rodar manualmente: aba Actions → Testes Cypress - PGATS → Run workflow.

📥 Como baixar o relatório do CI
Abra a aba Actions do repositório
Clique na execução mais recente
Role até o fim da página, em Artifacts
Baixe relatorio-mochawesome e abra o index.html

📸 Se algum teste falhar, os screenshots ficam no artefato screenshots-falhas.

💡 Boas práticas aplicadas
<details> <summary><b>🎯 Seletores estáveis</b></summary> <br/>

Prioridade para atributos data-qa e id. Textos são usados apenas para validar mensagens. Títulos que o site exibe em caixa alta via CSS são validados com regex case-insensitive.

</details> <details> <summary><b>🧩 Modularização</b></summary> <br/>

Seletores e ações ficam isolados em cypress/modules. Os arquivos de teste só descrevem o fluxo, o que deixa a leitura simples e a manutenção barata.

</details> <details> <summary><b>🔒 Testes independentes</b></summary> <br/>

Cada teste gera um usuário único (Faker + timestamp). Pré-condições são criadas pela API e a limpeza roda em afterEach, também pela API, mesmo se o teste falhar. Nenhuma conta sobra no site.

</details> <details> <summary><b>⏱️ Sem esperas fixas</b></summary> <br/>

Nenhum cy.wait(ms). Apenas as asserções com retry automático do Cypress, que esperam só o tempo necessário.

</details> <details> <summary><b>🛡️ Estabilidade no CI</b></summary> <br/>

Bloqueio dos hosts de anúncios do site (blockHosts), que cobrem a tela e quebram testes de forma aleatória, e retries em modo run para absorver instabilidades pontuais.

</details> <details> <summary><b>🗂️ Massa de dados separada</b></summary> <br/>

Dados de pagamento ficam em fixtures/pagamento.json e os dados de usuário são gerados em support/dados.js, sem valores soltos dentro dos testes.

</details>
👨‍💻 Autor

Flavio Barbosa · Analista de Qualidade de Software (QA)

GitHub LinkedIn

<sub>Projeto desenvolvido como Trabalho de Conclusão de Disciplina da Pós-Graduação em Automação de Testes de Software (PGATS).</sub>
