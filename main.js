$(document).ready(init);
var player = {};
var playerCount=0;
var dealerCount=0;
var bet=0;
var playeraces=0;
var dealeraces=0;
var count=0;

function init(){
  initPlayer();
}

function initPlayer(){
  $('.begin').css('visibility', 'visible');
  $('#myModal').modal('show');
  $('.begin').click(function(){
  player.name= $('#name').val();
  player.balance= parseInt($('#deposit').val());
  $('#myModal').modal('hide');
  $('#balance').text(' '+player.balance);
  startgame();
});
}

function startgame(){
  $('#bet').attr('max', player.balance);
  $('.feedback').text('Bets Please');
  $('.bet').css('visibility', 'visible');
  $('.bet').click(function(){
  bet = $('#bet').val();
  $('#totalbet').text(bet);
  $('.bet').off();
  player.balance -= parseInt(bet);
  $('#balance').text(' '+player.balance);
  $('.bet').css('visibility', 'hidden');
  dealcards();
  });
}

  function dealcards(){
    draw('player');
    draw('dealer');
    draw('player');
    draw('dealer');
    $('.dealercards #d1').css('visibility', 'hidden');
    $('.feedback').text('Hit or stand?');
    playerDecision();
  }

  function playerDecision(){
    $('.stand').css('visibility', 'visible');
    $('.hit').css('visibility', 'visible');
    $('.stand').click(function(){
      $('.dealercards #d1').css('visibility', 'visible');
      dealerTurn();
      $('.hit').off();
      $('.stand').off();
      $('.stand').css('visibility', 'hidden');
      $('.hit').css('visibility', 'hidden');
    });

    $('.hit').click(function(){
      draw('player');
      if(playerCount>21){
        if(!playeraces){
        defeat();
        $('.stand').css('visibility', 'hidden');
        $('.hit').css('visibility', 'hidden');
      } else{
        playeraces-=1;
        playerCount-=10;
        playerDecision();
      }
      } else{
        playerDecision();
      }
    });
  }

function dealerTurn(){
  if (dealerCount>16){
      if (dealerCount>playerCount){defeat();} else{win();}
      return true;
    }
    else{
    draw('dealer');
    if(dealerCount>21){
      if(!dealeraces){
      win();
    } else{
      dealeraces-=1;
      dealerCount-=10;
      dealerTurn();
    }
  } else if (dealerCount>16){
      if (dealerCount>playerCount){defeat();} else{win();}
    }
    else{
      dealerTurn();
    }
  }
}

function draw(who){
  var card = generateCard();
  if(who==='player'){
    if (parseInt(card.value)===1) {
      playeraces+=1;
      playerCount+=10;
    }
    playerCount+= parseInt(card.value);
    $('.playercards').append(card.picture);
  }
  else{
    count++;
    if (parseInt(card.value)===1) {
      dealeraces+=1;
      dealerCount+=10;
    }
    dealerCount+=parseInt(card.value);
    card.picture.attr('id', 'd'+count);
    $('.dealercards').append(card.picture);
  }
}


function generateCard(){
  var value = Math.floor(Math.random()*13+1).toString();
  var random2 = Math.floor(Math.random()*4+1);
  var suit='';
  switch(random2) {
        case 1:
        suit = 'hearts';
        break;
        case 2:
        suit = 'spades';
        break;
        case 3:
        suit = 'clubs';
        break;
        case 4:
        suit = 'diamonds';
        break;
}
var cardsrc = 'cards/'+value+suit+'.png';
if(value>9){value=10;}
  return {value: value, picture: $('<img>').addClass('card').attr('src', cardsrc)};
}

function defeat(){
    $('.feedback').text('Round lost!');
    $('.continue').css('visibility','visible');
    $('.continue').click(function(){
      if(player.balance>0){
      reinitialize();
    }
    else{
          alert('you lost!');
    }
    });
}

function win(){
  $('.feedback').text('Round won!');
  $('.continue').css('visibility','visible');
  $('.continue').click(function(){
  player.balance += parseInt(bet)*2;
  $('#balance').text(' '+player.balance);
  reinitialize();
  });
}

function reinitialize(){
  playerCount=0;
  dealerCount=0;
  bet=0;
  playeraces=0;
  dealeraces=0;
  count=0;
  $('.card').remove();
  startgame();
}
