import { faker } from '@faker-js/faker/locale/en';

const apenasLetras = (texto) => texto.replace(/[^a-zA-Z]/g, '');

/**
 * Gera um usuário novo e único a cada chamada.
 * O e-mail combina timestamp + sufixo aleatório, então nunca colide.
 */
export function gerarUsuario() {
  const primeiroNome = apenasLetras(faker.person.firstName());
  const ultimoNome = apenasLetras(faker.person.lastName());
  const sufixo = faker.string.alphanumeric({ length: 6, casing: 'lower' });

  return {
    nome: `${primeiroNome} ${ultimoNome}`,
    primeiroNome,
    ultimoNome,
    email: `qa_${Date.now()}_${sufixo}@example.com`,
    senha: faker.internet.password({ length: 12 }),
    titulo: 'Mr',
    dia: '15',
    mes: 'January',
    ano: '1995',
    empresa: faker.company.name(),
    endereco: faker.location.streetAddress(),
    endereco2: faker.location.secondaryAddress(),
    pais: 'United States',
    estado: faker.location.state(),
    cidade: faker.location.city(),
    cep: faker.location.zipCode('#####'),
    celular: faker.string.numeric(10)
  };
}
