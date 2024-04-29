const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const pokemonID = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const spriteContainer = document.getElementById('sprite-container');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
    );
    const data = await response.json();

    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonID.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
    `;
    const typeColors = {
        grass: '#78cc55',
        fire: '#ff6f52',
        water: '#42a1ff',
        normal: '#b7b7aa',
        electric: '#fecc33',
        ice: '#66ccfe',
        fighting: '#d3887e',
        poison: '#c68bb7',
        ground: '#dfba52',
        flying: '#8899ff',
        psychic:  '#ff66a3',
        bug: '#aabb23',
        rock: '#baaa66',
        ghost:  '#9995d0',
        dragon: '#9e93f1',
        dark: '#b59682',
        steel: '#abaabb',
        fairy: '#ed99ed',
    };
    const displayPokemon = (data) => {
        const types = data.types.map((type) => type.type.name);
        let backgroundStyle;
        if (types.length === 1) {
            backgroundStyle = `background-color: ${typeColors[types[0]]}`;
        } else {
            backgroundStyle = `background: linear-gradient(90deg, ${typeColors[types[0]]}, ${typeColors[types[1]]})`;
        }
        document.body.style.transition = 'background-color 0.5s ease';
        document.body.style = backgroundStyle;
    };
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    types.innerHTML = data.types
      .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
      .join('');
      displayPokemon(data);
  } catch (err) {
    resetDisplay();
    alert('Pokémon not found');
    console.log(`Pokémon not found: ${err}`);
  }
};

const resetDisplay = () => {
  const sprite = document.getElementById('sprite');
  if (sprite) sprite.remove();

  pokemonName.textContent = '';
  pokemonID.textContent = '';
  types.innerHTML = '';
  height.textContent = '';
  weight.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
};

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  getPokemon();
});

const userData = JSON.parse(localStorage.getItem('userData'));
let username = userData.username;
const button = document.getElementById('yug');
yug.textContent = userData.username;
const toggleButton = document.getElementById('yug');
const dropdownMenu = document.getElementById('dropdownMenu');

yug.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});


  const reviewText = document.getElementById('reviewText').value;
  const starRating = document.getElementById('starRating').value;

function exportReviewData(username, reviewText, starRating) {

  const referrer = document.referrer;

  let userNameToExport;
  if (referrer.includes('main.html')) {
    userNameToExport = `Guest-${Math.floor(Math.random() * 1000000).toString().slice(-6)}`;
  } else if (referrer.includes('main2.html')) {
    userNameToExport = username.userData;
  } else {
    console.error('Unknown referring HTML file:', referrer);
    return;
  }

  const reviewData = {
    userName: userNameToExport,
    reviewText: reviewText,
    starRating: starRating
  };

  const reviewDataString = `module.exports = ${JSON.stringify(reviewData)};`;

  fs.writeFile('rating.js', reviewDataString, (err) => {
    if (err) {
      console.error('Error writing review data to file:', err);
      return;
    }

    console.log('Review data successfully exported to rating.js');
  });
}
const submitReview = document.getElementById('submitReview');

let submitClicked = false;

submitReview.addEventListener('click', (event) => {
  event.preventDefault();

  if (submitClicked) {
    return; 
  }
  submitClicked = true;

  const message = document.createElement('p');
  message.textContent = 'Your review has been posted.';
  message.style.color = 'green';
  submitReview.parentNode.insertBefore(message, submitReview.nextSibling);
});
try {
  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reviewData)
  });

  if (!response.ok) {
    throw new Error('Error sending review data to the server');
  }
} catch (error) {
  console.error('Error sending review data to the server:', error);
  // You can add error handling here, such as showing an error message to the user.
};