import { gerarUsuario } from '../support/dados';
import { home } from '../modules/home';
import { cadastro } from '../modules/cadastro';
import { login } from '../modules/login';

describe('Autenticação e cadastro (Casos 1, 2, 3, 4 e 5)', () => {
  let usuario;

  beforeEach(() => {
    usuario = gerarUsuario();
  });

  // Garante que nenhuma conta fique sobrando, mesmo se o teste falhar no meio.
  afterEach(() => {
    cy.excluirUsuarioApi(usuario);
  });

  it('Caso 1: Cadastrar usuário', () => {
    home.visitar();
    home.validarHomeVisivel();
    home.irParaSignupLogin();

    cadastro.validarTelaSignup();
    cadastro.iniciarCadastro(usuario.nome, usuario.email);

    cadastro.validarTelaDadosConta();
    cadastro.preencherDadosConta(usuario);

    cadastro.validarContaCriada();
    cadastro.continuar();

    home.validarUsuarioLogado(usuario.nome);
    home.excluirConta();

    cadastro.validarContaExcluida();
    cadastro.continuar();
  });

  it('Caso 2: Login com e-mail e senha corretos', () => {
    cy.criarUsuarioApi(usuario);

    home.visitar();
    home.validarHomeVisivel();
    home.irParaSignupLogin();

    login.validarTelaLogin();
    login.preencherLogin(usuario.email, usuario.senha);

    home.validarUsuarioLogado(usuario.nome);
    home.excluirConta();

    cadastro.validarContaExcluida();
  });

  it('Caso 3: Login com e-mail e senha incorretos', () => {
    // Usuário gerado NÃO é cadastrado: as credenciais são inválidas por construção.
    home.visitar();
    home.validarHomeVisivel();
    home.irParaSignupLogin();

    login.validarTelaLogin();
    login.preencherLogin(usuario.email, usuario.senha);

    login.validarErroLogin();
  });

  it('Caso 4: Logout', () => {
    cy.criarUsuarioApi(usuario);

    home.visitar();
    home.validarHomeVisivel();
    home.irParaSignupLogin();

    login.validarTelaLogin();
    login.preencherLogin(usuario.email, usuario.senha);
    home.validarUsuarioLogado(usuario.nome);

    home.fazerLogout();

    login.validarRedirecionadoParaLogin();
  });

  it('Caso 5: Cadastrar usuário com e-mail já existente', () => {
    cy.criarUsuarioApi(usuario);

    home.visitar();
    home.validarHomeVisivel();
    home.irParaSignupLogin();

    cadastro.validarTelaSignup();
    cadastro.iniciarCadastro(usuario.nome, usuario.email);

    cadastro.validarEmailExistente();
  });
});
