const seletores = {
  modalProdutoAdicionado: '#cartModal',
  continuarComprando: '#cartModal button',
  linhasDoCarrinho: '#cart_info_table tbody tr',
  breadcrumbCarrinho: '.breadcrumbs .active',
  botaoCheckout: 'a.check_out',
  modalCheckout: '#checkoutModal',

  enderecoEntrega: '#address_delivery',
  resumoPedido: '#cart_info',
  comentario: 'textarea[name="message"]',
  botaoFazerPedido: 'a[href="/payment"]',

  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesExpiracao: '[data-qa="expiry-month"]',
  anoExpiracao: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]',

  pedidoRealizado: '[data-qa="order-placed"]'
};

export const carrinho = {
  // Adiciona os produtos (pelo id) a partir da home e fecha o modal a cada inclusão.
  adicionarProdutos(ids) {
    ids.forEach((id) => {
      cy.get(`a.add-to-cart[data-product-id="${id}"]`).first().click();
      cy.get(seletores.modalProdutoAdicionado).should('be.visible');
      cy.contains(seletores.continuarComprando, 'Continue Shopping').click();
      cy.get(seletores.modalProdutoAdicionado).should('not.be.visible');
    });
  },

  validarPaginaDoCarrinho(quantidadeDeItens) {
    cy.url().should('include', '/view_cart');
    cy.contains(seletores.breadcrumbCarrinho, /shopping cart/i).should('be.visible');
    cy.get(seletores.linhasDoCarrinho).should('have.length', quantidadeDeItens);
  },

  prosseguirParaCheckout() {
    cy.get(seletores.botaoCheckout).click();
  },

  // Visitante (não logado) vê um modal pedindo para se registrar ou logar.
  clicarRegisterLogin() {
    cy.get(seletores.modalCheckout).should('be.visible');
    cy.contains(`${seletores.modalCheckout} a`, 'Register / Login').click();
  },

  validarEnderecoEResumoDoPedido() {
    cy.url().should('include', '/checkout');
    cy.contains('h2', /address details/i).should('be.visible');
    cy.get(seletores.enderecoEntrega).should('be.visible');
    cy.contains('h2', /review your order/i).should('be.visible');
    cy.get(seletores.resumoPedido).should('be.visible');
  },

  informarComentarioEFazerPedido(comentario) {
    cy.get(seletores.comentario).type(comentario);
    cy.get(seletores.botaoFazerPedido).click();
  },

  preencherPagamentoEConfirmar(pagamento) {
    cy.url().should('include', '/payment');
    cy.get(seletores.nomeCartao).type(pagamento.nomeNoCartao);
    cy.get(seletores.numeroCartao).type(pagamento.numero, { log: false });
    cy.get(seletores.cvc).type(pagamento.cvc, { log: false });
    cy.get(seletores.mesExpiracao).type(pagamento.mesExpiracao);
    cy.get(seletores.anoExpiracao).type(pagamento.anoExpiracao);
    cy.get(seletores.botaoPagar).click();
  },

  // O banner "placed successfully" some rápido; a confirmação estável é a página final.
  validarPedidoConfirmado() {
    cy.url().should('include', '/payment_done');
    cy.contains(seletores.pedidoRealizado, /order placed!/i).should('be.visible');
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
  }
};
