import { gerarUsuario } from '../support/dados';
import { home } from '../modules/home';
import { cadastro } from '../modules/cadastro';
import { login } from '../modules/login';
import { carrinho } from '../modules/carrinho';
import pagamento from '../fixtures/pagamento.json';

describe('Pedidos / checkout (Casos 15 e 16)', () => {
  const idsDosProdutos = [1, 2];
  let usuario;

  beforeEach(() => {
    usuario = gerarUsuario();
  });

  afterEach(() => {
    cy.excluirUsuarioApi(usuario);
  });

  it('Caso 15: Fazer pedido registrando-se durante o checkout', () => {
    home.visitar();
    home.validarHomeVisivel();

    carrinho.adicionarProdutos(idsDosProdutos);
    home.irParaCarrinho();
    carrinho.validarPaginaDoCarrinho(idsDosProdutos.length);

    carrinho.prosseguirParaCheckout();
    carrinho.clicarRegisterLogin();

    cadastro.validarTelaSignup();
    cadastro.iniciarCadastro(usuario.nome, usuario.email);
    cadastro.validarTelaDadosConta();
    cadastro.preencherDadosConta(usuario);
    cadastro.validarContaCriada();
    cadastro.continuar();

    home.validarUsuarioLogado(usuario.nome);

    home.irParaCarrinho();
    carrinho.prosseguirParaCheckout();
    carrinho.validarEnderecoEResumoDoPedido();

    carrinho.informarComentarioEFazerPedido(pagamento.comentarioPedido);
    carrinho.preencherPagamentoEConfirmar(pagamento);
    carrinho.validarPedidoConfirmado();

    home.excluirConta();
    cadastro.validarContaExcluida();
    cadastro.continuar();
  });

  it('Caso 16: Fazer pedido fazendo login antes do checkout', () => {
    cy.criarUsuarioApi(usuario);

    home.visitar();
    home.validarHomeVisivel();
    home.irParaSignupLogin();

    login.validarTelaLogin();
    login.preencherLogin(usuario.email, usuario.senha);
    home.validarUsuarioLogado(usuario.nome);

    carrinho.adicionarProdutos(idsDosProdutos);
    home.irParaCarrinho();
    carrinho.validarPaginaDoCarrinho(idsDosProdutos.length);

    carrinho.prosseguirParaCheckout();
    carrinho.validarEnderecoEResumoDoPedido();

    carrinho.informarComentarioEFazerPedido(pagamento.comentarioPedido);
    carrinho.preencherPagamentoEConfirmar(pagamento);
    carrinho.validarPedidoConfirmado();

    home.excluirConta();
    cadastro.validarContaExcluida();
    cadastro.continuar();
  });
});
