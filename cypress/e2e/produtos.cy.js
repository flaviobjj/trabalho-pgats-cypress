import { gerarUsuario } from '../support/dados';
import { home } from '../modules/home';
import { produtos } from '../modules/produtos';

describe('Produtos e inscrição (Casos 8, 9 e 10)', () => {
  beforeEach(() => {
    home.visitar();
    home.validarHomeVisivel();
  });

  it('Caso 8: Verificar todos os produtos e a página de detalhes', () => {
    home.irParaProdutos();
    produtos.validarListaDeProdutos();

    produtos.abrirDetalhesDoPrimeiroProduto().then((nome) => {
      produtos.validarDetalhesDoProduto(nome);
    });
  });

  it('Caso 9: Pesquisar produto', () => {
    const termo = 'Dress';

    home.irParaProdutos();
    produtos.validarListaDeProdutos();

    produtos.pesquisar(termo);
    produtos.validarResultadoDaBusca(termo);
  });

  it('Caso 10: Verificar inscrição (Subscription) na página inicial', () => {
    const { email } = gerarUsuario();

    produtos.inscreverNoRodape(email);
  });
});
