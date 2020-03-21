 // Your web app's Firebase configuration
 var firebaseConfig = {
     apiKey: "AIzaSyDUxNJ29TymQcwEBs1KfMKX1T_tk5-LAIs",
     authDomain: "cb-bootcamp-trainscheduler.firebaseapp.com",
     databaseURL: "https://cb-bootcamp-trainscheduler.firebaseio.com",
     projectId: "cb-bootcamp-trainscheduler",
     storageBucket: "cb-bootcamp-trainscheduler.appspot.com",
     messagingSenderId: "85371240967",
     appId: "1:85371240967:web:eb4b65a7e0c8c6005560a2"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 // Create a variable to reference the database
 var database = firebase.database()



 var randomFormat = "HH:mm";
 var convertedDate = moment(time, randomFormat);

 $("#submitButton").on("click", function() {
     console.log("Submit button was pressed");

     if (("#trainName").val().trim() !== "" && ("#destination").val().trim() !== "" && ("#frequency").val().trim() > 0) {

         var name = $("#trainName").val().trim();
         var destination = $("#destination").val().trim();
         var time = $("#time").val().trim();
         var frequency = $("#frequency").val().trim();

         var newtrain = {
             Name: name,
             Destination: destination,
             Time: time,
             Frequency: frequency
         }

         database.ref().push(newtrain);

         alert("Train sucessfully added");

         $("#trainName").val("");
         $("#destination").val("");
         $("#time").val("");
         $("#frequency").val("");
     } else {
         alert("Sorry I didn't get that, please try again");

         ("#trainName").val("");
         ("#destination").val("");
         ("#time").val("");
         ("#frequency").val("");
     }

 });

 database.ref().on("child_added", function(childSnapshot) {
     console.log(childSnapshot.val());


     var trnname = childSnapshot.val().name;
     var trndestination = childSnapshot.val().destination;
     var trntime = childSnapshot.val().time;


     console.log(trnname);
     console.log(trndestination);
     console.log(trntime);


     var trnTimePretty = moment.unix(trntime).format("HH:mm");
     console.log(trnTimePretty);

     var trnfrequency = moment().diff(moment(trntime, "X"), "hours");
     console.log(trnfrequency);

     var timeUntil = moment(trntime).fromNow();

     var newRow = $("<tr>").append(
         $("<td>").text(trnname),
         $("<td>").text(trndestination),
         $("<td>").text(trnTimePretty),
         $("<td>").text(trnfrequency),
         $("<td>").text(timeUntil),
     );

     // Append the new row to the table
     $("#train-table > tbody").append(newRow);

     // If any errors are experienced, log them to console.
 }, function(errorObject) {
     console.log("The read failed: " + errorObject.code);
 });

 $(document).ready(function() {
     var timeUntil = convertedDate.toNow();
     console.log(timeUntil)

     2

 });