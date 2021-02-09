const fetch = require('node-fetch');

const zipcodeRegex = /(\d\d\d\d\d)/g;

module.exports = zipcodes = {
  async getZipcodes(state) {
    return new Promise((resolve) => {
      fetch(
        `https://www.zipcodestogo.com/${
          state.charAt(0).toUpperCase() + state.slice(1)
        }/`,
      ).then((res) =>
        res.text().then((site) => {
          resolve([...new Set(site.match(zipcodeRegex))]);
        }),
      );
    });
  },
};
