const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'wf1fav',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
