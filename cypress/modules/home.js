const seletores = {
  slider: '#slider',
  menuSignupLogin: '.shop-menu a[href="/login"]',
  menuProdutos: '.shop-menu a[href="/products"]',
  menuCarrinho: '.shop-menu a[href="/view_cart"]',
  menuLogout: '.shop-menu a[href="/logout"]',
  menuExcluirConta: '.shop-menu a[href="/delete_account"]',
  menuTopo: '.shop-menu'
};

export const home = {
  visitar() {
    cy.visit('/');
  },

  validarHomeVisivel() {
    cy.title().should('contain', 'Automation Exercise');
    cy.get(seletores.slider).should('be.visible');
  },

  irParaSignupLogin() {
    cy.get(seletores.menuSignupLogin).click();
  },

  irParaProdutos() {
    cy.get(seletores.menuProdutos).click();
  },

  irParaCarrinho() {
    cy.get(seletores.menuCarrinho).click();
  },

  validarUsuarioLogado(nome) {
    cy.contains(seletores.menuTopo, `Logged in as ${nome}`).should('be.visible');
  },

  fazerLogout() {
    cy.get(seletores.menuLogout).click();
  },

  excluirConta() {
    cy.get(seletores.menuExcluirConta).click();
  }
};
