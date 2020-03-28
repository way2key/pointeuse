const moment = require('moment');

exports.test = () => {
  console.log(moment().format("YYYY/MM/DD HH:mm:ss"));
}
