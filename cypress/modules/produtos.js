const seletores = {
  tituloLista: '.features_items h2.title',
  cardProduto: '.features_items .product-image-wrapper',
  nomeNoCard: '.productinfo p',
  linkDetalhes: 'a[href^="/product_details/"]',
  detalhes: '.product-information',
  campoBusca: '#search_product',
  botaoBusca: '#submit_search',
  tituloRodapeInscricao: '.single-widget h2',
  campoEmailInscricao: '#susbscribe_email', // "susbscribe" é assim mesmo no HTML do site
  botaoInscricao: '#subscribe'
};

export const produtos = {
  validarListaDeProdutos() {
    cy.url().should('include', '/products');
    cy.contains(seletores.tituloLista, /all products/i).should('be.visible');
    cy.get(seletores.cardProduto).should('have.length.greaterThan', 0);
  },

  // Abre o primeiro produto da lista e entrega o nome dele para validação posterior.
  abrirDetalhesDoPrimeiroProduto() {
    return cy.get(seletores.cardProduto).first().then(($card) => {
      const nome = $card.find(seletores.nomeNoCard).first().text().trim();
      cy.wrap($card).find(seletores.linkDetalhes).first().click();
      return cy.wrap(nome);
    });
  },

  validarDetalhesDoProduto(nome) {
    cy.url().should('include', '/product_details/');
    cy.get(seletores.detalhes).should('be.visible').within(() => {
      cy.get('h2').should(($h2) => {
        expect($h2.text().trim()).to.eq(nome);
      });
      cy.contains('p', 'Category:').should('be.visible');
      cy.contains('span', /Rs\.\s*\d+/).should('be.visible');
      cy.contains('p', 'Availability:').should('be.visible');
      cy.contains('p', 'Condition:').should('be.visible');
      cy.contains('p', 'Brand:').should('be.visible');
    });
  },

  pesquisar(termo) {
    cy.get(seletores.campoBusca).type(termo);
    cy.get(seletores.botaoBusca).click();
  },

  validarResultadoDaBusca(termo) {
    cy.contains(seletores.tituloLista, /searched products/i).should('be.visible');
    cy.get(seletores.cardProduto).should('have.length.greaterThan', 0);
    cy.get(`${seletores.cardProduto} ${seletores.nomeNoCard}`).should(($nomes) => {
      const texto = $nomes.text().toLowerCase();
      expect(texto).to.contain(termo.toLowerCase());
    });
  },

  inscreverNoRodape(email) {
    cy.contains(seletores.tituloRodapeInscricao, /subscription/i)
      .scrollIntoView()
      .should('be.visible');
    cy.get(seletores.campoEmailInscricao).type(email);
    cy.get(seletores.botaoInscricao).click();
    cy.contains('You have been successfully subscribed!').should('be.visible');
  }
};
