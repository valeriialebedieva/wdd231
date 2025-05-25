import { openModal, closeModal, setupModal } from './modal.js';
import { getLS, setLS } from './storage.js';

const gallery = document.getElementById('pet-gallery');
const modal = document.getElementById('pet-modal');
const modalBody = document.getElementById('modal-body');
const FAVORITES_KEY = 'favoritePets';

setupModal(modal);

async function loadPets() {
  try {
    const res = await fetch('data/pets.json');
    if (!res.ok) throw new Error('Failed to fetch pets');
    const pets = await res.json();
    renderPets(pets);
  } catch (err) {
    gallery.innerHTML = `<p class="error">Could not load pets. Please try again later.</p>`;
  }
}

function renderPets(pets) {
  gallery.innerHTML = '';
  pets.forEach(pet => {
    const card = document.createElement('div');
    card.className = 'pet-card';
    card.innerHTML = `
      <img src="images/${pet.image}" alt="${pet.name} the ${pet.species}" width="320" height="220" loading="lazy">
      <div class="pet-info">
        <h3>${pet.name}</h3>
        <div class="pet-meta">${pet.species} &bull; ${pet.age} years &bull; ${pet.gender}</div>
        <div class="pet-desc">${pet.description}</div>
      </div>
      <button type="button" class="details-btn" aria-label="View details for ${pet.name}">Details</button>
    `;
    card.querySelector('.details-btn').addEventListener('click', () => showPetModal(pet));
    gallery.appendChild(card);
  });
}

function showPetModal(pet) {
  const favorites = getLS(FAVORITES_KEY, []);
  const isFav = favorites.includes(pet.id);
  modalBody.innerHTML = `
    <img src="images/${pet.image}" alt="${pet.name} the ${pet.species}" width="320" height="220" loading="lazy" style="width:100%;border-radius:8px;">
    <h2>${pet.name}</h2>
    <div class="pet-meta">${pet.species} &bull; ${pet.age} years &bull; ${pet.gender}</div>
    <div class="pet-desc">${pet.description}</div>
    <div class="pet-extra"><strong>Breed:</strong> ${pet.breed}<br><strong>Color:</strong> ${pet.color}</div>
    <button type="button" class="fav-btn" aria-pressed="${isFav}">${isFav ? '★ Remove Favorite' : '☆ Add to Favorites'}</button>
  `;
  modalBody.querySelector('.fav-btn').addEventListener('click', () => toggleFavorite(pet.id));
  openModal(modal);
}

function toggleFavorite(id) {
  let favorites = getLS(FAVORITES_KEY, []);
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }
  setLS(FAVORITES_KEY, favorites);
  closeModal(modal);
}

document.querySelector('.close-modal').addEventListener('click', () => closeModal(modal));
modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });

loadPets(); 