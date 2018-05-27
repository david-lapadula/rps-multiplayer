document.ready(function () {
    //Firebase Authentication
    
  // Initialize Firebase 
  var config = {
    apiKey: "AIzaSyAYu99F7dk_r5fh8CWkBbqrAh5YNw1SAkY",
    authDomain: "rps-database-81187.firebaseapp.com",
    databaseURL: "https://rps-database-81187.firebaseio.com",
    projectId: "rps-database-81187",
    storageBucket: "",
    messagingSenderId: "359029810871"
  }; 

  firebase.initializeApp(config);

  // Variable reference to the database
   var rpsDatabase = firebase.database();  



});  

// https://github.com/angrbrd/multiplayer-rps(https://github.com/angrbrd/multiplayer-rps/blob/master/assets/js/app.js) OR https://github.com/mattbajorek/RPS-Multiplayer