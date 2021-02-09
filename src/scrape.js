const fetch = require('node-fetch');

module.exports = {
  async scrapeCovidAppointments(state, waitTime) {
    zipcodes = await require('./zipcodes').getZipcodes(state);
    toReturn = [];
    waitCounter = 0;
    for (zipcode of [...zipcodes]) {
      toReturn.push(
        new Promise((resolve) => {
          setTimeout(() => {
            fetch(
              'https://www.cvs.com/Services/ICEAGPV1/immunization/1.0.0/getIMZStores',
              {
                headers: {
                  accept: 'application/json',
                  'accept-language': 'en-US,en;q=0.9',
                  'content-type': 'application/json',
                  'sec-fetch-dest': 'empty',
                  'sec-fetch-mode': 'cors',
                  'sec-fetch-site': 'same-origin',
                },
                referrer:
                  'https://www.cvs.com/vaccine/intake/store/cvd-store-select/first-dose-select',
                referrerPolicy: 'strict-origin-when-cross-origin',
                body: `{"requestMetaData":{"appName":"CVS_WEB","lineOfBusiness":"RETAIL","channelName":"WEB","deviceType":"DESKTOP","deviceToken":"","apiKey":"a2ff75c6-2da7-4299-929d-d670d827ab4a","source":"ICE_WEB","securityType":"apiKey","responseFormat":"JSON","type":"cn-dep"},"requestPayloadData":{"selectedImmunization":["CVD"],"distanceInMiles":25,"imzData":[{"imzType":"CVD","ndc":["59267100002","80777027399"]}],"searchCriteria":{"addressLine":"${zipcode}"}}}`,
                method: 'POST',
                mode: 'cors',
              },
            ).then((res) => {
              res.json().then(
                (r) => resolve(r),
                (rej) => console.log(rej),
              ),
                (rej) => console.log(rej);
            });
          }, waitTime * 1000 * waitCounter++);
        }),
      );
    }
    return Promise.all(toReturn);
  },
};
