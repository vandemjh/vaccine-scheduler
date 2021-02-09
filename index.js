const cvs = require('./src/scrape');
var args = process.argv.slice(2);

for (arg of [...args]) {
    cvs.scrapeCovidAppointments(arg, 1).then(appt => console.log(appt))
}