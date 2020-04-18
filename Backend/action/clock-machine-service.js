const ClockMachine = require('../data-schematic/clock-machine-schematic');


exports.createClockmachine = (machine) => {
  return new Promise( (resolve, reject) => {
    let newClockMachine = new ClockMachine({
      title: machine.title
    });

    newClockMachine.save()
    .then(
      () => resolve("Pointeuse créé!")
    )
    .catch(
      error => reject(error)
    )
  })
}

exports.getClockmachine = () => {
  return new Promise( (resolve, reject) => {
    ClockMachine.find()
    .then((machine) => resolve(machine))
    .catch(error => reject("Unable to fetch ClockMachine from db <= "+error));
  })
}
