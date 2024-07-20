const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://kasirdemo.belajarqa.com",
    chromeWebSecurity: false,
    supportFile: false,
    video: true,
    videoCompression: true,
    reporter: "mochawesome",
    reporterOptions: {
      // To display small circular charts regarding test results
      charts: true,
      // Generate JSON file to create custom reports
      json: false,
      // Generate HTML file 
      html: true,
      // Customize the directory in which reports are saved
      reportsDir: "reports/html",
      // Customize the report file name
      reportFilename: "[status]-[name]-report",
      timestamp: "longDate",
      // Generate new report file or overwrite the a single file
      overwrite: true
    },
  },
});
