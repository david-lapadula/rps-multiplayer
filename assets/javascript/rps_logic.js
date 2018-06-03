$(document).ready(function () {
      
  // Initialize Firebase 
  var config = {
    apiKey: "AIzaSyAYu99F7dk_r5fh8CWkBbqrAh5YNw1SAkY",
    authDomain: "rps-database-81187.firebaseapp.com",
    databaseURL: "https://rps-database-81187.firebaseio.com",
    projectId: "rps-database-81187",
    storageBucket: "rps-database-81187.appspot.com", 
    messagingSenderId: "359029810871"
  }; 
  firebase.initializeApp(config);
   
  // Database reference
  var rpsDatabase = firebase.database();   
     
  //Selectors

  // Used to keep name of specific player for personal diisplay features on each players interface and the current turn in the game
  var activePlayer= null; 
  var playerTurn = null; 

  //Selectors for what is displayed above the gameplay section
  var promptSection = $("#prompt-section"); 
  var addPlayerInput = $("#add-player-input"); 
  var addPlayerButton = $("#add-player-button"); 
  var topMessage = $("#top-message");

  //Selectors for play during the game
  var gamePlaySection = $("#gameplay-section"); 
  var messagingSection = $("#messaging-section"); 
  var player1MessageForm = $("#player1-msg-form"); 
  var player2MessageForm = $("#player2-msg-form"); 
  var tempGameAnswer = $("#temp-game-answer");  
  var gameResultMessage = $("#game-result-message"); 
  var messageBoard = $("#message-board");  

  // Variables and element selectors for player 1
  var player1 = null; 
  var currentP1 = null; 
  var player1Move = null; 
  var player1Active = $("#player1-active"); 
  var player1Div = $("#player1-div"); 
  var player1Waiting = $("#player1-waiting"); 
  var player1Name = $("#player1-name"); 
  var player1Buttons = $("#player1-button-row");  
  var player1Wins = $("#player1-wins"); 
  var player1Losses = $("#player1-losses"); 
  var player1Ties = $("#player1-ties"); 
  var player1ImgChoice = $("#player1-img-choice"); 
  var player1MsgText = $("#player1-msg-text"); 
  var player1MsgBtn = $("#player1-msg-btn"); 

  // Variables and element selectors for player 1 
  var player2 = null; 
  var currentP2 = null;  
  var player2Move  = null; 
  var player2Active = $("#player2-active"); 
  var player2Div = $("#player2-div");  
  var player2Waiting = $("#player2-waiting"); 
  var player2Name = $("#player2-name");  
  var player2Buttons = $("#player2-button-row");  
  var player2Wins = $("#player2-wins");  
  var player2Losses = $("#player2-losses");  
  var player2Ties = $("#player2-ties"); 
  var player2ImgChoice = $("#player2-img-choice"); 
  var player2MsgText = $("#player2-msg-text"); 
  var player2MsgBtn = $("#player2-msg-btn");


  // Initial display condition on page load. Later modified by database references
  player1Active.removeClass('d-flex').hide(); 
  player1MessageForm.children().removeClass('d-flex').hide(); 
  player2Active.removeClass('d-flex').hide(); 
  player2MessageForm.children().removeClass('d-flex').hide(); 
  topMessage.removeClass('d-flex').hide();
 
  // Logic of the game 
  var gameLogic = function () {
      switch (player1.move) { 
        case 'rock':
        rpsDatabase.ref().child("/players/player1/image").set('rock');    
            switch (player2.move) {
              case 'paper':
                rpsDatabase.ref().child("/players/player2/image").set('paper'); 
                rpsDatabase.ref().child("/players/player1/losses").set(player1.losses + 1);
                rpsDatabase.ref().child("/players/player2/wins").set(player2.wins + 1);  
                rpsDatabase.ref().child("/status/").set(`${player2.name} wins with paper!`);
                break; 
              case 'scissors':
                rpsDatabase.ref().child("/players/player2/image").set('scissors'); 
                rpsDatabase.ref().child("/players/player1/wins").set(player1.wins + 1);
                rpsDatabase.ref().child("/players/player2/losses").set(player2.losses + 1); 
                rpsDatabase.ref().child("/status/").set(`${player1.name} wins with rock!`);
                break;  
              case 'rock':
                rpsDatabase.ref().child("/players/player2/image").set('rock');
                rpsDatabase.ref().child("/players/player1/ties").set(player1.ties + 1);
                rpsDatabase.ref().child("/players/player2/ties").set(player2.ties + 1);
                rpsDatabase.ref().child("/status/").set(`It's a tie!`);  
                break; 
            } 
          break;   
        case 'paper': 
        rpsDatabase.ref().child("/players/player1/image").set('paper'); 
            switch (player2.move) {
              case 'paper':
              rpsDatabase.ref().child("/players/player2/image").set('paper');
              rpsDatabase.ref().child("/players/player1/ties").set(player1.ties + 1);
              rpsDatabase.ref().child("/players/player2/ties").set(player2.ties + 1); 
              rpsDatabase.ref().child("/status/").set(`It's a tie!`); 
              break; 
            case 'scissors':
              rpsDatabase.ref().child("/players/player2/image").set('scissors'); 
              rpsDatabase.ref().child("/players/player1/losses").set(player1.losses + 1);
              rpsDatabase.ref().child("/players/player2/wins").set(player2.wins + 1);
              rpsDatabase.ref().child("/status/").set(`${player2.name} wins with scissors!`);
              break; 
            case 'rock':
              rpsDatabase.ref().child("/players/player2/image").set('rock'); 
              rpsDatabase.ref().child("/players/player1/wins").set(player1.wins + 1);
              rpsDatabase.ref().child("/players/player2/losses").set(player2.losses + 1);
              rpsDatabase.ref().child("/status/").set(`${player1.name} wins with rock!`);
              break;  
            }
          break;  
        case 'scissors': 
        rpsDatabase.ref().child("/players/player1/image").set('scissors'); 
            switch (player2.move) {
              case 'paper':
              rpsDatabase.ref().child("/players/player2/image").set('paper'); 
              rpsDatabase.ref().child("/players/player1/wins").set(player1.wins + 1);
              rpsDatabase.ref().child("/players/player2/losses").set(player2.losses + 1); 
              rpsDatabase.ref().child("/status/").set(`${player1.name} wins with scissors!`);
              break; 
            case 'scissors':
              rpsDatabase.ref().child("/players/player2/image").set('scissors'); 
              rpsDatabase.ref().child("/players/player1/ties").set(player1.ties + 1);
              rpsDatabase.ref().child("/players/player2/ties").set(player2.ties + 1);
              rpsDatabase.ref().child("/status/").set(`It's a tie!`);
              break; 
            case 'rock':
              rpsDatabase.ref().child("/players/player2/image").set('rock'); 
              rpsDatabase.ref().child("/players/player1/losses").set(player1.losses + 1);
              rpsDatabase.ref().child("/players/player2/wins").set(player2.wins + 1);
              rpsDatabase.ref().child("/status/").set(`${player2.name} wins with rock!`); 
              break;   
            } 
      }
      playerTurn = 1; 
      rpsDatabase.ref().child("/turn").set(1);
  }    
  
// Database references used during the game

  //Listen for changes to the presence of player
  rpsDatabase.ref("/players/").on("value", function(snapshot) {
    // Player 1 check 
    if (snapshot.child("player1").exists()) {
      player1 = snapshot.val().player1;
      currentP1 = player1.name; 
      player1Waiting.removeClass('d-flex').hide(); 
      player1Active.show(); 
      player1Name.text(currentP1); 
      player1Wins.text(player1.wins);
      player1Losses.text(player1.losses); 
      player1Ties.text(player1.ties);    
      if(player1.image !== "") {
        player1ImgChoice.removeClass('d-none');
        player1ImgChoice.attr('src', 'assets/images/' + player1.image + '.jpg');  
      } else {
        player1ImgChoice.addClass('d-none');   
      }
    } else {   
      player1 = null;
      currentP1 = null; 
      player1Active.hide(); 
      player1Waiting.addClass('d-flex').show(); 
      player1Name.text("");   
      rpsDatabase.ref("/status/").remove();
    }
     
    // Player 2 check
    if (snapshot.child("player2").exists()) {
      player2 = snapshot.val().player2;
      currentP2 = player2.name; 
      player2Waiting.removeClass('d-flex').hide();   
      player2Active.show();  
      player2Name.text(currentP2);    
      player2Wins.text(player2.wins);  
      player2Losses.text(player2.losses);  
      player2Ties.text(player2.ties); 
      if(player2.image !== "") {
        player2ImgChoice.removeClass('d-none');
        player2ImgChoice.attr('src', 'assets/images/' + player2.image + '.jpg');  
      } else {
        player2ImgChoice.addClass('d-none');  
      } 
      
    } else {  
      player2 = null; 
      currentP2 = null;  
      player2Active.hide();  
      player2Waiting.addClass('d-flex').show(); 
      player2Name.text("");  
      rpsDatabase.ref("/status/").remove();
    }   

    if(!player1 || !player2) {
      player2ImgChoice.removeAttr('src');  
      player1ImgChoice.removeAttr('src');  
    }

    if (!player1 && !player2) {
      rpsDatabase.ref("/messenger/").remove();
      gameResultMessage.children().text(''); 
      messageBoard.empty(); 
      rpsDatabase.ref("/turn/").remove();
      rpsDatabase.ref("/status/").remove(); 
    }; 

    if (player1 && player2) {
      gameResultMessage.children().text(`${currentP1}\'s turn to choose`); 
      player1Div.addClass('border-success'); 
    }; 

    if  (activePlayer === currentP1 && currentP1 !== null) {
      player1MessageForm.children().addClass('d-flex').show();  
      player2MessageForm.children().removeClass('d-flex').hide();
      promptSection.hide();
      topMessage.show().children().text(`${currentP1}, you are Player 1`);
    }
    if (activePlayer === currentP2 && currentP2 !== null) { 
      player1MessageForm.children().removeClass('d-flex').hide();  
      player2MessageForm.children().addClass('d-flex').show(); 
      promptSection.hide();    
      topMessage.show().children().text(`${currentP2}, you are Player 2`);      
    }
  });    

  // Message display for whenever a player leaves the game
  rpsDatabase.ref("/players/").on("child_removed", function(snapshot) {
    playerDisconnectMsg = snapshot.val().name + " has left the game"; 
    disconnectMsgEntry = rpsDatabase.ref().child("/chat/").push().key;  
    rpsDatabase.ref("/messenger/" + disconnectMsgEntry).set(playerDisconnectMsg);
    
    player1ImgChoice.removeAttr('src');  
    player2ImgChoice.removeAttr('src');  
    gameResultMessage.children().text('');  
    player2Div.removeClass('border-success'); 
    player1Div.removeClass('border-success'); 
    rpsDatabase.ref("/status/").remove(); 
  });   

  // Listener to determine whos turn it is
  rpsDatabase.ref("/turn/").on("value", function(snapshot) {
    // Only allow the page to be seen if there is an open spot  
    if (snapshot.val() !== null && activePlayer === null && player1 && player2) {
      promptSection.hide();   
      gamePlaySection.removeClass('d-flex').hide(); 
      messagingSection.removeClass('d-flex').hide(); 
      topMessage.show().children().text('All players occupied. Wait and then refresh the page')
    }        
      if (snapshot.val() === 1) {
          playerTurn = 1;
          if (player1 && player2) {
          gameResultMessage.children().text(`${currentP1} needs to choose`); 
          player1Div.addClass('border-success'); 
          player2Div.removeClass('border-success'); 
          }  
      } else if (snapshot.val() === 2) {
          playerTurn = 2;
          if (player1 && player2) {   
            gameResultMessage.children().text(`${currentP2} needs to choose`); 
            player2Div.addClass('border-success');  
            player1Div.removeClass('border-success');  
          }
        }     
  });    
      
  // Database reference to update the status of the current game
  rpsDatabase.ref("/status/").on("value", function(snapshot) {
    tempGameAnswer.children().text(snapshot.val()); 
  }); 

  // Any new messages handled by this listener
  rpsDatabase.ref("/messenger/").on("child_added", function(snapshot) {
    newMsg = snapshot.val();
    newMsgEl= $("<p>").addClass('m-0').html(newMsg);  
    // Change the color of the chat message. Change it for the color of the player and connect/disconnect events
    if (newMsg.includes("left")) {
      newMsgEl.addClass("text-dark");
    } else if (newMsg.includes("added")) {
      newMsgEl.addClass("text-success");
    } else if(newMsg.includes(currentP1)) {
      newMsgEl.addClass('text-danger');
    } else if(newMsg.includes(currentP2)) { 
      newMsgEl.addClass('text-primary');
    }    
    messageBoard.append(newMsgEl);
    messageBoard.scrollTop(messageBoard[0].scrollHeight); 
  });   
    
// All click events for the game

  //Submit Button
  addPlayerButton.on('click', function () {
    event.preventDefault(); 
    if (addPlayerInput.val() === "") {
      alert('Your character needs a name');  
    }  else {
          if (player1 === null && addPlayerInput.val() !== '') {
            activePlayer = addPlayerInput.val().trim();
            player1 = {
              name: activePlayer,
              wins: 0, 
              losses: 0,  
              ties: 0,      
              move: "", 
              image: ""  
            };  
            rpsDatabase.ref().child("/players/player1").set(player1);   
            rpsDatabase.ref("/players/player1").onDisconnect().remove(); 
              if (!player2) {
                rpsDatabase.ref().child("/turn").set(1);   
              } 
          }  else if (player2 === null && addPlayerInput.val() !== '') {
            activePlayer = addPlayerInput.val().trim();
            player2 = { 
              name: activePlayer,  
              wins: 0,  
              losses: 0, 
              ties: 0,      
              move: "", 
              image: ""  
            };   
            rpsDatabase.ref().child("/players/player2").set(player2);  
            rpsDatabase.ref("/players/player2").onDisconnect().remove(); 
          }  
    playerConnectMsg = activePlayer + " has been added to the game";
    connectMsgEntry = rpsDatabase.ref().child("/messenger/").push().key; 
    rpsDatabase.ref("/messenger/" + connectMsgEntry).set(playerConnectMsg);
    addPlayerInput.val('').attr('placeholder', 'Enter Player Name');  
    }
  });      

// Messenger Button controls for each of the players' independant form
  player1MsgBtn.on("click", function(event) {
    event.preventDefault();
    if (player1MsgText.val() !== "") {
      player1Msg = `${player1.name} says: ${player1MsgText.val()}`; 
      player1MsgEntry = rpsDatabase.ref().child("/messenger/").push().key; 
      rpsDatabase.ref("/messenger/" + player1MsgEntry).set(player1Msg); 
      player1MsgText.val('');  
    } 
  });   
  player2MsgBtn.on("click", function(event) {
    event.preventDefault();
    if (player2MsgText.val() !== "") { 
      player2Msg = `${player2.name} says: ${player2MsgText.val()}`; 
      player2MsgEntry = rpsDatabase.ref().child("/messenger/").push().key; 
      rpsDatabase.ref("/messenger/" + player2MsgEntry).set(player2Msg); 
      player2MsgText.val('');  
    }
  });  
  
  //Get the choice of each player from the button click. Only allow if both players are in the game, active user is the current player. 
  player1Buttons.on("click", ".player1-button" , function() {
    event.preventDefault();   
    if (player1 && player2 && playerTurn === 1 && (activePlayer === currentP1)) {
      player1Move = $(this); 
      rpsDatabase.ref().child("/players/player1/image").set(''); 
      rpsDatabase.ref().child("/players/player2/image").set(''); 
      player1ImgChoice.addClass('d-none');   
      player2ImgChoice.addClass('d-none');   
      rpsDatabase.ref().child("/status/").set('');     
      rpsDatabase.ref('/players/').child('/player1/move').set(player1Move.data('choice'))
      playerTurn = 2; 
      rpsDatabase.ref().child("/turn").set(2);  
    }   
  });        
  player2Buttons.on("click", ".player2-button" , function(event) {
    event.preventDefault(); 
    if (player1 && player2 && playerTurn === 2 && (activePlayer === currentP2)){
      player2Move = $(this);  
      rpsDatabase.ref('/players/').child('/player2/move').set(player2Move.data('choice'))
      gameLogic(); 
    }       
  });  

});    