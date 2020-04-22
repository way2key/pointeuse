const ClockMachine = require('../data-schematic/clock-machine-schematic');


exports.createClockMachine = (machine) => {
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

exports.getClockMachine = (clockMachineId) => {
  return new Promise( (resolve, reject) => {
    ClockMachine.findOne({_id:clockMachineId})
    .then((machine) => resolve(machine))
    .catch(error => reject("Unable to fetch ClockMachine from db <= "+error));
  })
}

exports.setClockMachineTimeplan = (machineID, timeplanID) => {
  return new Promise( (resolve, reject) => {
    ClockMachine.findOneAndUpdate({_id:machineID},{$set: {dayplan:timeplanID}})
    .then(
      () => resolve("Timeplan Modifié")
    )
    .catch(
      (error) => reject("Impossible de mettre à jour l'horaire <= "+error)
    )
  })
}

exports.updateClockMachineNotification = (clockMachine) => {
  return new Promise( (resolve, reject) => {
    ClockMachine.findOneAndUpdate({_id:clockMachine._id},{$set:
      {
        insufficientWeekTimeQuotaNotification: clockMachine.insufficientWeekTimeQuotaNotification,
        insufficientDayTimeQuotaNotification: clockMachine.insufficientDayTimeQuotaNotification,
        clockingOversightNotification: clockMachine.clockingOversightNotification,
        lateArrivalNotification: clockMachine.lateArrivalNotification,
        earlyDepartureNotification: clockMachine.earlyDepartureNotification,
        unallowedPresenceNotification: clockMachine.unallowedPresenceNotification,
      }})
    .then(
      () => resolve("Notifications modifiées")
    )
    .catch(
      (error) => reject("Impossible de mettre à jour les notifications <= "+error)
    )
  })
}

exports.updateTimeplan = (payload) => {
  return new Promise( (resolve, reject) => {
    ClockMachine.findOneAndUpdate({_id:payload.id},{$set:{dayplan: payload.dayplan}})
    .then(
      () => resolve("Notifications modifiées")
    )
    .catch(
      (error) => reject("Impossible de mettre à jour les notifications <= "+error)
    )
  })
}

exports.updateClockMachineVolume = (payload) => {
  return new Promise( (resolve, reject) => {
    ClockMachine.updateOne({_id:payload._id},{volume: payload.volume})
    .then(
      () => {
        resolve("Volume modifié avec succès");
      }
    )
    .catch(
      (error) => reject("Impossible de mettre à jour le volume <= "+error)
    )
  })
}