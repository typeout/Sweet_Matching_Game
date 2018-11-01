const play_area = document.querySelector(".play_area");
const btnStart = document.querySelector(".start_game");
let randomCards = [];
let card1 = 666; 
let card2 = 666;

let number_cards = 30;

const cards = [
  {
    id: 0,
    url: "image_assets/asset1.svg"
  },
  {
    id: 1,
    url: "image_assets/asset2.svg"
  },
  {
    id: 2,
    url: "image_assets/asset3.svg"
  },
  {
    id: 3,
    url: "image_assets/asset4.svg"
  },
  {
    id: 4,
    url: "image_assets/asset5.svg"
  },
  {
    id: 5,
    url: "image_assets/asset6.svg"
  },
  {
    id: 6,
    url: "image_assets/asset7.svg"
  },
  {
    id: 7,
    url: "image_assets/asset8.svg"
  },
  {
    id: 8,
    url: "image_assets/asset9.svg"
  },
  {
    id: 9,
    url: "image_assets/asset10.svg"
  },
  {
    id: 10,
    url: "image_assets/asset11.svg"
  },
  {
    id: 11,
    url: "image_assets/asset12.svg"
  },
  {
    id: 12,
    url: "image_assets/asset13.svg"
  },
  {
    id: 13,
    url: "image_assets/asset14.svg"
  },
  {
    id: 14,
    url: "image_assets/asset15.svg"
  },
  {
    id: 15,
    url: "image_assets/asset16.svg"
  }
];

btnStart.addEventListener('click', () => {
  dealCards(number_cards);
  btnStart.style.display = "none";
  startGame();
});


function startGame() {
  let cardsInPlay = document.querySelectorAll(".card");
  let cardsFront = document.querySelectorAll(".front");
  let cardsBack = document.querySelectorAll(".back");
  //console.log(cardsInPlay, cardsFront, cardsBack);
  let lastCard;
  let finished = true;

  for (let i=0; i<cardsInPlay.length; i++) {
    cardsInPlay[i].addEventListener('click', () => {
      if (finished === true) {
        cardsFront[i].style.transform = "perspective( 600px ) rotateY( -180deg )";
        cardsBack[i].style.transform = "perspective( 600px ) rotateY( 0deg )";
        
        if (card1 === 666) {
          card1 = randomCards[i];
          lastCard = i;
          
        } else if (card2 === 666 && lastCard !== i) {
          card2 = randomCards[i];
          if (card1 === card2) {
            setTimeout(() => {
              cardsInPlay[i].style.visibility = "hidden";
              cardsInPlay[lastCard].style.visibility = "hidden";

              card1 = 666;
              card2 = 666;
              lastCard = 666; 
              finished = true;
            },500);
            finished = false;
          } else {
            setTimeout(() => {
              cardsFront[i].style.transform = "perspective( 600px ) rotateY( 0deg )";
              cardsBack[i].style.transform = "perspective( 600px ) rotateY( 180deg )";
              cardsFront[lastCard].style.transform = "perspective( 600px ) rotateY( 0deg )";
              cardsBack[lastCard].style.transform = "perspective( 600px ) rotateY( 180deg )";  
              
              card1 = 666;
              card2 = 666;
              lastCard = 666;  
              finished = true;
            },500);
            finished = false;
          }
        }
      }
    });
  }
  
}

function dealCards(card_count) {
  let output = "";
  randomCards = randomCardsInPlay(card_count);
  for (let i=0; i<card_count; i++) {
    output += `<div class="card"><div class='front'><img src="image_assets/back_card.svg"></div>
               <div class='back'><img class='card_image' src='${cards[randomCards[i]].url}'></div></div>`;
  }
  play_area.innerHTML = output;
  screenSize(number_cards);
}

function randomCardsInPlay (card_count) {
  let randomCards = [];
  let placer = cards.slice();
  //get car id's from object, only get half of the amount required
  for (let i=0; i<card_count/2; i++) {
    let r = Math.floor(Math.random() * placer.length);
    randomCards[i] = placer[r].id;
    placer.splice(r, 1);
  }
  //double the id's in array to have pairs of id's
  let randomCardsArr = randomCards.concat(randomCards);
  //shuffle array using Fisher-Yates algorithm
  for (let i=randomCardsArr.length-1; i>0; i--) {
    let j = Math.floor(Math.random() * i);

    let temp = randomCardsArr[i];
    randomCardsArr[i] = randomCardsArr[j];
    randomCardsArr[j] = temp;
  }
  //return shuffled array
  return randomCardsArr;
}

function screenSize(card_count) {
  let cardsInPlay = document.querySelectorAll(".card");

  function setStyle(cl) {
    for (let i=0; i < card_count; i++) {
      cardsInPlay[i].classList.add(cl);
    }
  }

  switch (card_count) {
    case 30: 
      setStyle("card30");
      break;
    case 20:
      setStyle("card20");
      break;
    case 12:
      setStyle("card12");
      break;
    default: 
      setStyle("card30");
  }
}

