const seletores = {
  tituloNovoUsuario: '.signup-form h2',
  nome: '[data-qa="signup-name"]',
  email: '[data-qa="signup-email"]',
  botaoSignup: '[data-qa="signup-button"]',
  erroSignup: '.signup-form p',

  tituloDadosConta: 'h2.title b',
  generoMr: '#id_gender1',
  generoMrs: '#id_gender2',
  senha: '[data-qa="password"]',
  dia: '[data-qa="days"]',
  mes: '[data-qa="months"]',
  ano: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  ultimoNome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  endereco2: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',

  contaCriada: '[data-qa="account-created"]',
  contaExcluida: '[data-qa="account-deleted"]',
  botaoContinuar: '[data-qa="continue-button"]'
};

export const cadastro = {
  validarTelaSignup() {
    cy.contains(seletores.tituloNovoUsuario, 'New User Signup!').should('be.visible');
  },

  iniciarCadastro(nome, email) {
    cy.get(seletores.nome).type(nome);
    cy.get(seletores.email).type(email);
    cy.get(seletores.botaoSignup).click();
  },

  validarTelaDadosConta() {
    // O site exibe o título em caixa alta via CSS, por isso regex case-insensitive.
    cy.contains(seletores.tituloDadosConta, /enter account information/i).should('be.visible');
  },

  preencherDadosConta(usuario) {
    cy.get(usuario.titulo === 'Mr' ? seletores.generoMr : seletores.generoMrs).check();
    cy.get(seletores.senha).type(usuario.senha, { log: false });
    cy.get(seletores.dia).select(usuario.dia);
    cy.get(seletores.mes).select(usuario.mes);
    cy.get(seletores.ano).select(usuario.ano);
    cy.get(seletores.newsletter).check();
    cy.get(seletores.ofertas).check();

    cy.get(seletores.primeiroNome).type(usuario.primeiroNome);
    cy.get(seletores.ultimoNome).type(usuario.ultimoNome);
    cy.get(seletores.empresa).type(usuario.empresa);
    cy.get(seletores.endereco).type(usuario.endereco);
    cy.get(seletores.endereco2).type(usuario.endereco2);
    cy.get(seletores.pais).select(usuario.pais);
    cy.get(seletores.estado).type(usuario.estado);
    cy.get(seletores.cidade).type(usuario.cidade);
    cy.get(seletores.cep).type(usuario.cep);
    cy.get(seletores.celular).type(usuario.celular);

    cy.get(seletores.botaoCriarConta).click();
  },

  validarContaCriada() {
    cy.contains(seletores.contaCriada, /account created!/i).should('be.visible');
  },

  validarContaExcluida() {
    cy.contains(seletores.contaExcluida, /account deleted!/i).should('be.visible');
  },

  continuar() {
    cy.get(seletores.botaoContinuar).click();
  },

  validarEmailExistente() {
    cy.contains(seletores.erroSignup, 'Email Address already exist!').should('be.visible');
  }
};
