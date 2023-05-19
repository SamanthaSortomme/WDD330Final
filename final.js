const cardGrid = document.getElementById('cardGrid');
let selected_card_index = 0;
const backButton = document.getElementById('lastCard');

if(localStorage.getItem('localColor') == null)
  window.localStorage.setItem('localColor' , 'red')
color = localStorage.getItem('localColor')



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
      const cardGrid = document.getElementById('cardGrid');
      cardGrid.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        let cardInfo = document.createElement('div');
        cardInfo.className = 'card';
        let name = document.createElement('h1');
        let cardImg = document.createElement('img');
        
        let setName = document.createElement('h2');
        setName.className = 'setName-text';

        let setType = document.createElement('h2');
        setType.className = 'setType-text';

        let artist = document.createElement('h2');
        artist.className = 'artist-text';

        let colNum = document.createElement('h2');
        colNum.className = 'collector-text';

        name.innerHTML = MTGdata.data[selected_card_index + i].name;
        cardImg.setAttribute(
          'src',
          MTGdata.data[selected_card_index + i].image_uris.normal
        );
        cardImg.setAttribute('alt', MTGdata.data[selected_card_index + i].name);
        setName.innerHTML = `Set Name: ${MTGdata.data[selected_card_index + i].set_name}`;
        setType.innerHTML = `Set Type: ${MTGdata.data[selected_card_index + i].set_type}`;
        artist.innerHTML = `Artist Name: ${MTGdata.data[selected_card_index + i].artist}`;
        colNum.innerHTML = `Collector Number: ${MTGdata.data[selected_card_index + i].collector_number}`;

        cardInfo.appendChild(name);
        cardInfo.appendChild(cardImg);
        cardInfo.appendChild(setName);
        cardInfo.appendChild(setType);
        cardInfo.appendChild(artist);
        cardInfo.appendChild(colNum);

        cardInfo.addEventListener('mouseenter', function () {
          this.classList.add('hover');
        });

        cardInfo.addEventListener('mouseleave', function () {
          this.classList.remove('hover');
        });

        cardGrid.appendChild(cardInfo);
      }
    })
    .catch((error) => console.log(error));
}


loadCards(localStorage.getItem('localColor'));

document.getElementById('colorSel').addEventListener('change', () => {
  color = document.getElementById('colorSel').value;
  localStorage.setItem('localColor' , color)
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
