/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, isGameActive;

init();

/********************************************************************
    DOM manipulation with js
*/

//textContent only add text to html
//document.querySelector('#current-' + activePlayer).textContent = dice;

//for adding html tags along with text innerHTML is used
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+dice+'<em>';

//textContent can also be used as a getter
//var x = document.querySelector('#score-' + activePlayer).textContent;
//console.log(x);



/********************************************************************
    event handling with js
*/

//eventListner, callback function and anonymous function

//function btn(){
//    //Do somthing here
//    console.log('btn rolled');
//}
//
//document.querySelector('.btn-roll').addEventListener('click', btn); //btn here is callback func as another func is calling it

//or we can use one time call anonymous func
//we use this method for btn-roll as we dont need the func anywhere alse
document.querySelector('.btn-roll').addEventListener('click', function(){   
    if(isGameActive){
        //1. Random number
        var dice = Math.floor(Math.random() * 6)+1;
        console.log(dice);

        //2. Display the result image
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+dice+'.png';

        //3. Update the round score IF the rolled number was not 1    
        if(dice !== 1){
            roundScore += dice;
            document.querySelector('#current-'+ activePlayer).textContent = roundScore;
        }else{
            //Next player
            nextPlayer();
        }
    }
    
});
 
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(isGameActive){
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if(scores[activePlayer] >= 10){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            isGameActive = false;
        }else{
            // Next player
            nextPlayer();
        }
    }  
});
    
function nextPlayer(){
    //roundScore goes to zero for current player
        roundScore = 0;
        document.querySelector('#current-'+ activePlayer).textContent = roundScore;
        
        //Next player's turn
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
        //change the active state in html file for both players
//        document.querySelector('.player-0-panel').classList.remove('active');
//        document.querySelector('.player-1-panel').classList.add('active');
        //or we can simply toggle the class
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //hide the dice for new player
        document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;   //0 is for player 1, and 1 is for player 2
    isGameActive = true;
    
    //change the css property of an element, here we are hiding the dice at the begining of the game
    document.querySelector('.dice').style.display = 'none';
    
    //initializing html contentents for first load
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
























