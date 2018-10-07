/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

ADVANCE RULES:

1. A player looses his entire score when he rolls two 6 in a row. After that , it's the next player's turn.
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined socre of 100
3. Add another dice to the game, so that there are two dices now. The plater looses his current score when one of them is a 1 or both are 6 or
    for any dice its previous and present roll is 6.
*/

var scores, roundScore, activePlayer, isGameActive, lastDice, lastDice2, winningScore;

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
        //getting winning score as it can be during a game
        getWinningScore();
        winningScore > 0 ? "" : winningScore = undefined;
        console.log('winning score is set to '+winningScore);
        
        if(winningScore !== undefined){
            //clear out invalid score error message from html if its present in DOM
            if(document.querySelector('.score-error') !== null){
                document.querySelector('.wrapper').removeChild(document.querySelector('.score-error'));
            }
            
            //1. Random number
            var dice = Math.floor(Math.random() * 6)+1;
            var dice2 = Math.floor(Math.random() * 6)+1;
            console.log(dice, dice2);

            //2. Display the result image
            var diceDOM = document.querySelectorAll('.dice');
            for(i=0; i<diceDOM.length; i++){
                diceDOM[i].style.display = 'block';
                i === 0 ? diceDOM[i].src = 'dice-'+dice+'.png' : diceDOM[i].src = 'dice-'+dice2+'.png';
            }
            

            //3.1 update the round and global score if two consicutive 6 are rolled
            if(dice === 6 && lastDice === 6 || dice2 === 6 && lastDice2 === 6 || dice === 6 && dice2 === 6){
                //player looses his current and global score;
                scores[activePlayer] = 0;
                document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

                //next player
                nextPlayer();
            }else if(dice !== 1 && dice2 !== 1){   //3. Update the round score IF the rolled number was not 1 for any of the dice
                roundScore += dice+dice2;
                document.querySelector('#current-'+ activePlayer).textContent = roundScore;

                //TODO: lastDice overlapping problem [6,6,6]: solved
                lastDice = dice;
                lastDice2 = dice2;
                
            }else{
                //Next player
                nextPlayer();
            }
        }else{
            //show error message in html through DOM manipulation if its not already present
            if(document.querySelector('.score-error') === null){
                console.log('adding new element');
                //add new tags in html through DOM manipulation
                var errorElement = document.createElement('div');
                errorElement.textContent = 'Please enter valid winning score';
                errorElement.classList.add('score-error');
                errorElement.classList.add('ion-android-warning');
                console.log(errorElement);
                document.querySelector('.wrapper').appendChild(errorElement);  
            } 
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
        if(scores[activePlayer] >= winningScore){
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
        var diceDOM = document.querySelectorAll('.dice');
        diceDOM[0].style.display = 'none';
        diceDOM[1].style.display = 'none';
    
        //resetting last dice to -1 for new player
        lastDice = -1;
        lastDice2 = -1;
}


document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;   //0 is for player 1, and 1 is for player 2
    isGameActive = true;
    winningScore = undefined;  
    
    //change the css property of an element, here we are hiding the dice at the begining of the game
    var diceDOM = document.querySelectorAll('.dice');
    diceDOM[0].style.display = 'none';
    diceDOM[1].style.display = 'none';
    
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
    document.querySelector('.winning-score').value = '';
    document.querySelector('.winning-score').placeholder = 'Winning Score';
    
    getWinningScore();
}

function getWinningScore(){
    winningScore = parseInt(document.querySelector('.winning-score').value);
}






















