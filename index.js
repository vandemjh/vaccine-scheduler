const cvs = require('./src/scrape');
const { usage } = require('./src/usage');
var args = process.argv.slice(2);

const state = args[0];
const sleepTime = parseInt(args[1]) || 1;

if (
  args.length != 2 ||
  (typeof state !== 'string' && typeof sleepTime !== 'number')
) {
  console.log(usage());
  process.exit(1);
} else {
  cvs
    .scrapeCovidAppointments(state, sleepTime)
    .then((appt) => console.log(appt));
}
