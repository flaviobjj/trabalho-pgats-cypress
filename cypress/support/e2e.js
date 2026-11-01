import 'cypress-mochawesome-reporter/register';
import './commands';

// Ignora apenas erros de scripts de anúncios/terceiros do site.
// Qualquer outro erro de aplicação continua falhando o teste.
Cypress.on('uncaught:exception', (err) => {
  if (/adsbygoogle|googletag|google_ads|ResizeObserver/i.test(err.message)) {
    return false;
  }
});
