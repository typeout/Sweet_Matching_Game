const play_area = document.querySelector(".play_area");
const btnStart = document.querySelector(".start_game");

let number_cards = 12;

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
];

btnStart.addEventListener('click', () => {
  dealCards(number_cards);
  btnStart.style.display = "none";
  startGame();
});


function startGame() {

}

function dealCards(card_count) {
  let output = "";
  let randomCards = randomCardsInPlay(card_count);
  for (let i=0; i<card_count; i++) {
    output += "<div class='card'><img class='card_image' src='" + cards[randomCards[i]].url + "'></div>";
  }
  play_area.innerHTML = output;
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

