const Destination = require("../models/Destination");


/******************** DELETE ACTIVITY FROM DESTINATION ********************/
function deleteActivityFromDestination(destinationID, activityID) {
  Destination.findById(destinationID).then((destinationDB) => {
    // modifier la liste d'activité pour enlever l'activityID
    const index = destinationDB.activity.findIndex(
      (activityDbId) => activityDbId == activityID
    );

    if (index !== -1) {
      destinationDB.activity.splice(index, 1);
      Destination.updateOne({ _id: destinationID }, destinationDB)
        .catch((error) => console.log(error));
    }
  });
}


/******************** ADD ACTIVITY TO DESTINATION ********************/
function addActivityToDestination(destinationID, activityID) {
  // console.log("destinationID", destinationID, "+++ activityID" ,activityID);
  Destination.findByIdAndUpdate(
    destinationID,
    { $push: { activity: activityID } },
    { new: true, useFindAndModify: false }
  ).then((result) => {
    return result;
  });
}


module.exports = { deleteActivityFromDestination, addActivityToDestination };