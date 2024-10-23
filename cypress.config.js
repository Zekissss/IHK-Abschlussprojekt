const { defineConfig } = require('cypress');
const cypressGrep = require('cypress-grep/src/plugin.js');
require('dotenv').config();  // .env dosyasını okumak için dotenv kullanılır

module.exports = defineConfig({
  projectId: 'yp4ssz',
  experimentalStudio: true,

  // Multi-reporter kullanarak birden fazla raporlayıcı tanımlayın
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    // Multi-reporters seçeneklerini burada tanımlayın
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'results/junit/test-results-[hash].xml',  // JUnit raporlarının dosya yolu
      toConsole: true
    },
    cypressMochawesomeReporterReporterOptions: {
      overwrite: true, 
      charts: true,
      reportPageTitle: 'ToolShop Project Report',
      reportFilename: "[status]_[datetime]-[name]-report",
      timestamp: "shortDate",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      ignoreVideos: false,
      videoOnFailOnly: true   // Başarısız testlerde sadece video kaydı
    }
  },

  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  video: true,   // Video kaydını açtık

  retries: {
    runMode: 3,
    openMode: 0,
  },

  e2e: {
    baseUrl: process.env.BASE_URL,  // Testlerin URL'si .env dosyasından alınır
    env: {
      grepFilterSpecs: true,
      grepOmitFiltered: true,
      email: process.env.EMAIL,  // .env dosyasındaki giriş bilgileri
      password: process.env.PASSWORD,
    },

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);  // Mochawesome raporlayıcı kurulumu
      cypressGrep(config);  // Grep özelliği için kurulumu ekleyin
      return config;
    },
    
    downloadsFolder: 'cypress/downloads',
  },
});


