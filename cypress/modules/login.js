const seletores = {
  tituloLogin: '.login-form h2',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]',
  erroLogin: '.login-form p'
};

export const login = {
  validarTelaLogin() {
    cy.contains(seletores.tituloLogin, 'Login to your account').should('be.visible');
  },

  preencherLogin(email, senha) {
    cy.get(seletores.email).type(email);
    cy.get(seletores.senha).type(senha, { log: false });
    cy.get(seletores.botaoLogin).click();
  },

  validarErroLogin() {
    cy.contains(seletores.erroLogin, 'Your email or password is incorrect!').should('be.visible');
  },

  validarRedirecionadoParaLogin() {
    cy.url().should('include', '/login');
    cy.contains(seletores.tituloLogin, 'Login to your account').should('be.visible');
  }
};
