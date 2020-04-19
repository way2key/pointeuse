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

exports.updateClockMachineNotification = (machineID, incidentNotification) => {
  return new Promise( (resolve, reject) => {
    ClockMachine.findOneAndUpdate({_id:machineID},{$set:
      {
        insufficientWeekTimeQuotaNotification:incidentNotification.insufficientWeekTimeQuotaNotification,
        insufficientDayTimeQuotaNotification:incidentNotification.insufficientDayTimeQuotaNotification,
        clockingOversightNotification:incidentNotification.clockingOversightNotification,
        lateArrivalNotification:incidentNotification.lateArrivalNotification,
        earlyDepartureNotification:incidentNotification.earlyDepartureNotification,
        unallowedPresenceNotification:incidentNotification.unallowedPresenceNotification,
      }})
    .then(
      () => resolve("Notifications modifiées")
    )
    .catch(
      (error) => reject("Impossible de mettre à jour les notifications <= "+error)
    )
  })
}
