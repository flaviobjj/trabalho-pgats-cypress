const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    retries: { runMode: 2, openMode: 0 },

    // O site exibe anúncios (google_vignette) que cobrem a tela e quebram
    // os testes de forma aleatória. Bloqueamos os hosts de anúncios.
    blockHosts: [
      '*.googlesyndication.com',
      '*.doubleclick.net',
      '*.googleadservices.com',
      '*.google-analytics.com',
      '*.googletagmanager.com',
      '*.adtrafficquality.google'
    ],

    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'Relatório de Testes - PGATS - Automation Exercise',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false
    },

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    }
  }
});
