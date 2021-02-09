const fetch = require('node-fetch');

const zipcodeRegex = /(\d\d\d\d\d)/g;

module.exports = zipcodes = {
  getZipcodes(state) {
    return new Promise((resolve) => {
      fetch(
        `https://www.zipcodestogo.com/${
          state.charAt(0).toUpperCase() + state.slice(1)
        }/`,
      ).then((res) =>
        res.text().then((site) => {
          resolve(site.match(zipcodeRegex));
        }),
      );
    });
  },
};
