let color = 'red';

const cardGrid = document.getElementById('cardGrid');

let selected_card_index = 0;

const backButton = document.getElementById('lastCard');
console.log(selected_card_index);
if (selected_card_index !== 0) {
  backButton.disabled = false;
} else {
  backButton.disabled = true;
}

const card1 = document.createElement('img');
// cardGrid.appendChild(card1);

function loadCards(color) {
  fetch(`https://api.scryfall.com/cards/search?order=cmc&q=c:${color}%20`)
    .then((response) => response.json())
    .then((MTGdata) => {
      console.log(MTGdata);
      for (let i = 0; i < 9; i++) {
        let cardInfo = document.createElement('div');
        cardInfo.className = 'card';
        let name = document.createElement('h1');
        let cardImg = document.createElement('img');
        let setName = document.createElement('h2');
        let artist = document.createElement('h2');

        name.innerHTML = MTGdata.data[selected_card_index + i].name;

        cardImg.setAttribute(
          'src',
          MTGdata.data[selected_card_index + i].image_uris.normal
        );
        cardImg.setAttribute('alt', MTGdata.data[selected_card_index + i].name);

        setName.innerHTML = `Set Name: ${
          MTGdata.data[selected_card_index + i].set_name
        }`;

        artist.innerHTML = `Artist Name: ${
          MTGdata.data[selected_card_index + i].artist
        }`;

        cardInfo.appendChild(name);
        cardInfo.appendChild(cardImg);
        cardInfo.appendChild(setName);
        cardInfo.appendChild(artist);

        cardGrid.appendChild(cardInfo);
      }
    })
    .catch((error) => console.log(error));
}
loadCards('red');

document.getElementById('colorSel').addEventListener('change', () => {
  color = document.getElementById('colorSel').value;
  selected_card_index = 0;
  cardGrid.innerHTML = '';
  loadCards(color);
});

document.getElementById('nextCard').addEventListener('click', () => {
  selected_card_index += 9;
  if (selected_card_index !== 0) {
    backButton.disabled = false;
  }
  console.log(selected_card_index);
  cardGrid.innerHTML = '';
  loadCards(color);
});

document.getElementById('lastCard').addEventListener('click', () => {
  if (selected_card_index != 0) {
    selected_card_index -= 9;
  }
  if (selected_card_index === 0) {
    backButton.disabled = true;
  }
  cardGrid.innerHTML = '';
  loadCards(color);
  console.log('back', selected_card_index);
});
