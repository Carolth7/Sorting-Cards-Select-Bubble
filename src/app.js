import "bootstrap";
import "./style.css";

//Variables
const SECTION = document.querySelector("#mySection");
const SECTION2 = document.querySelector("#mySection2");
const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const SUITS = ["♠", "♥", "♦", "♣"];

const INPUT = document.querySelector("input");
const DRAW = document.querySelector("#draw");
const BUBBLE = document.querySelector("#bubble");
const SELECTION = document.querySelector("#selection");

window.onload = function() {
  //Pintar el fondo de verde

  let listOfCards = [];

  //Evento de Draw. resultado: array desordenado de: suit, value
  DRAW.addEventListener("click", event => {
    SECTION2.innerHTML = "";
    listOfCards = createCard(event);
    console.log("Evento de draw", listOfCards);
  });

  //Evento de bubble sort: ordenación tipo bubble
  BUBBLE.addEventListener("click", event => {
    SECTION2.innerHTML = "";
    bubbleSort(listOfCards);
    console.log("Evento de bubble", listOfCards);
  });

  //Evento de selection sort: ordenación tipo sort
  SELECTION.addEventListener("click", event => {
    SECTION2.innerHTML = "";
    selectionSort(listOfCards);
    console.log("Evento de select", listOfCards);
  });
};

//Funcion para generar cartas
function createCard(event) {
  event.preventDefault();

  //Hace que no sume cartas, sino las sobreescribe cada vez que das al botón draw
  SECTION.innerHTML = "";
  console.log("reinicio al hacer click", SECTION);

  //array de objetos carta, que luego vamos a meter la funcion drawonCard
  let cards = [];

  //Bucle para iterar sobre el valor del input
  for (let i = 0; i < INPUT.value; i++) {
    cards.push(drawnCard());
  }
  console.log("cards no esta vacío", cards);
  return cards;
}

//Función para crear un objeto carta:
//1º paso: función aleatoriedad

function getRandom(list) {
  return Math.floor(Math.random() * list.length);
}
//2º paso: se lo aplico a suit y value(numero)
function drawnCard(family = null, number = null) {
  let card;

  if (family == null || number == null) {
    card = {
      suit: SUITS[getRandom(SUITS)],
      value: VALUES[getRandom(VALUES)],
      index: null
    };
  } else {
    card = {
      suit: family,
      value: number,
      index: null
    };
  }

  card.index = card.value;

  //Reemplaza los numeros 11,12,13,14 por J,Q,K,A
  if (card.value == 14) {
    card.value = "A";
  }
  if (card.value == 11) {
    card.value = "J";
  }
  if (card.value == 12) {
    card.value = "Q";
  }
  if (card.value == 13) {
    card.value = "K";
  }

  //Contiene la carta entera
  let drawnCard = document.createElement("div");
  drawnCard.classList.add("poker-card");

  //Crea el icono de arriba
  let firstSuitContainer = document.createElement("div");
  let firstSuit = document.createTextNode(card.suit);
  firstSuitContainer.appendChild(firstSuit);
  firstSuitContainer.classList.add("align-start");
  drawnCard.appendChild(firstSuitContainer);

  //Crea el numero
  let valueContainer = document.createElement("div");
  let value = document.createTextNode(card.value);
  valueContainer.classList.add("card-value");
  valueContainer.appendChild(value);
  drawnCard.appendChild(valueContainer);

  //Crea el icono de abajo
  let secondSuitContainer = document.createElement("div");
  let secondSuit = document.createTextNode(card.suit);
  secondSuitContainer.appendChild(secondSuit);
  secondSuitContainer.classList.add("align-end");
  secondSuitContainer.classList.add("invert");
  drawnCard.appendChild(secondSuitContainer);

  //Pinta rojo o negro dependiendo del suit
  if (card.suit == "♥" || card.suit == "♦") {
    firstSuitContainer.classList.add("red");
    valueContainer.classList.add("red");
    secondSuitContainer.classList.add("red");
  } else {
    firstSuitContainer.classList.add("black");
    valueContainer.classList.add("black");
    secondSuitContainer.classList.add("black");
  }

  if (family == null || number == null) {
    SECTION.appendChild(drawnCard);
    return card;
  } else {
    SECTION2.appendChild(drawnCard);
  }
}

function bubbleSort(listOfCards) {
  for (var i = 0; i < listOfCards.length; i++) {
    for (var j = 0; j < listOfCards.length - i - 1; j++) {
      if (listOfCards[j].index > listOfCards[j + 1].index) {
        var temp = listOfCards[j];
        listOfCards[j] = listOfCards[j + 1];
        listOfCards[j + 1] = temp;
      }
    }
  }
  for (let i = 0; i < listOfCards.length; i++) {
    drawnCard(listOfCards[i].suit, listOfCards[i].value);
  }
}

function selectionSort(listOfCards) {
  let min = 0;
  while (min < listOfCards.length - 1) {
    for (let i = min + 1; i < listOfCards.length; i++) {
      if (listOfCards[min].index > listOfCards[i].index) {
        let aux = listOfCards[min];
        listOfCards[min] = listOfCards[i];
        listOfCards[i] = aux;
      }
    }
    min++;
  }
  for (let i = 0; i < listOfCards.length; i++) {
    drawnCard(listOfCards[i].suit, listOfCards[i].value);
  }
}
