//variables
var scores, roundScore, activePlayer, gameActive, gamesWon;


//to keep track of number of games won for each player
gamesWon = [0,0];

//game setup
initialize();
function initialize(){

scores = [0,0];
roundScore = 0;
activePlayer = 0;
gameActive = true;
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


//manages dice display, eventlistener and random number genarator for dice
document.querySelector('.dice').style.display = 'none';

var diceDOM =  document.querySelector('.dice');

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gameActive){
    
        //random number b/w 1-6
    var dice = Math.floor(Math.random() * 6) + 1;

    //display result
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    //update score
    if(dice !== 1){
        roundScore+=dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else{
      changePlayer();
    }
    }
});

//Event Listener for hold button, adds round score to overall score
document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(gameActive){
    
    //update score
    scores[activePlayer] += roundScore;
    
    //update UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    if(scores[activePlayer] >= 100){
    
     gamesWon[activePlayer] += 1;
     document.getElementById('name-' + activePlayer).textContent = 'Winner!';  
     document.getElementById('count-' + activePlayer).textContent = gamesWon[activePlayer];
     document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
     diceDOM.style.display = 'none';
     document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
     gameActive = false;
    
    }
    else{
      //change player turn
       changePlayer();
    }
    }
})

//event listener for new game button, calls initialize function to setup for new game
document.querySelector('.btn-new').addEventListener('click', initialize);

//function to change player turn, called by hold button's event listener.
function changePlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceDOM.style.display = 'none';
} 