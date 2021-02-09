const cvs = require('./src/scrape');
var args = process.argv.slice(2);

const WAIT_TIME = 1

for (arg of [...args]) {
    cvs.scrapeCovidAppointments(arg, WAIT_TIME).then(appt => console.log(appt))
}