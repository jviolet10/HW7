$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyDeq5v9NU9kgGPhwy4G7jsSK8TbPT2h4jk",
    authDomain: "cool-porject-aed11.firebaseapp.com",
    databaseURL: "https://cool-porject-aed11.firebaseio.com",
    projectId: "cool-porject-aed11",
    storageBucket: "cool-porject-aed11.appspot.com",
    messagingSenderId: "293619180645"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrain").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var freq = $("#interval").val().trim();

    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: freq
    });
  });

  database.ref().on("child_added", function (childSnapshot) {

    var newTrain = childSnapshot.val().trainName;
    var newLocation = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFreq = childSnapshot.val().frequency;

    var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    var tRemainder = diffTime % newFreq;

    var tMinutesTillTrain = newFreq - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");

    $("#all-display").append(
      ' <tr><td>' + newTrain +
      ' </td><td>' + newLocation +
      ' </td><td>' + newFreq +
      ' </td><td>' + catchTrain +
      ' </td><td>' + tMinutesTillTrain + ' </td></tr>');

    $("#trainName, #destination, #firstTrain, #interval").val("");
    return false;
  },
    function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

});