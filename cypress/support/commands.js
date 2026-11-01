// A API do Automation Exercise responde HTTP 200 e coloca o status real
// dentro do corpo (campo responseCode). O corpo vem como texto, então
// fazemos o parse quando necessário.
const lerCorpo = (resposta) =>
  typeof resposta.body === 'string' ? JSON.parse(resposta.body) : resposta.body;

/**
 * Pré-condição: cria o usuário via API (rápido e estável),
 * evitando repetir o cadastro pela interface em todo teste.
 */
Cypress.Commands.add('criarUsuarioApi', (usuario) => {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: {
      name: usuario.nome,
      email: usuario.email,
      password: usuario.senha,
      title: usuario.titulo,
      birth_date: usuario.dia,
      birth_month: usuario.mes,
      birth_year: usuario.ano,
      firstname: usuario.primeiroNome,
      lastname: usuario.ultimoNome,
      company: usuario.empresa,
      address1: usuario.endereco,
      address2: usuario.endereco2,
      country: usuario.pais,
      zipcode: usuario.cep,
      state: usuario.estado,
      city: usuario.cidade,
      mobile_number: usuario.celular
    }
  }).then((resposta) => {
    expect(lerCorpo(resposta).responseCode, 'usuário criado via API').to.eq(201);
  });
});

/**
 * Limpeza: remove o usuário via API. Não falha se a conta já foi
 * excluída pelo próprio teste (ex.: casos 1, 2 e 15).
 */
Cypress.Commands.add('excluirUsuarioApi', (usuario) => {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: { email: usuario.email, password: usuario.senha },
    failOnStatusCode: false
  });
});
