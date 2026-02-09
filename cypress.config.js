const { defineConfig } = require("cypress");
const { GenerateCtrfReport } = require("cypress-ctrf-json-reporter");

module.exports = defineConfig({
  video: false,
  chromeWebSecurity: false,
  reporter: "cypress-mochawesome-reporter", // Laporan HTML
  reporterOptions: {
    charts: true,
    reportPageTitle: "Cypress Inline Reporter",
    reportFilename: "[status]-[name]-report", // Sesuaikan nama file HTML
    //overwrite: false,
    //html: true,  // Menghasilkan laporan HTML
    //JSON : false, //json: false,  Matikan JSON di sini karena ini untuk Mochawesome
    embeddedScreenshots: true,
    inlineAssets: true,
    //ignoreVideos: false,
    //videoOnFailOnly: true,
  },
  e2e: {
    baseUrl: 'https://wikanta.com',
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // Menambahkan plugin Mochawesome
      require('cypress-mochawesome-reporter/plugin')(on);

      // Generate CTRF Report untuk JSON (laporan JSON terpisah)
      new GenerateCtrfReport({
        on,
        outputDir: "cypress/reports/ctrf", // Lokasi laporan JSON
        fileName: "ctrf-report.json", // Nama laporan JSON
      });
    },
  },
});
