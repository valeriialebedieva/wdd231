// Load area items and build cards
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/discover.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('discover-cards');
      data.forEach(item => {
        const card = document.createElement('section');
        card.className = 'card';
        card.innerHTML = `
          <div class="card-content">
            <h2>${item.name}</h2>
            <figure>
              <img src="images/${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
          </div>
          <button type="button">Learn More</button>
        `;
        container.appendChild(card);
      });
    });

  // Visit message logic
  const visitMsg = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('discoverLastVisit');
  const now = Date.now();
  let message = '';
  if (!lastVisit) {
    message = 'Welcome! Let us know if you have any questions.';
  } else {
    const diff = now - parseInt(lastVisit, 10);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (diff < 1000 * 60 * 60 * 24) {
      message = 'Back so soon! Awesome!';
    } else if (days === 1) {
      message = 'You last visited 1 day ago.';
    } else {
      message = `You last visited ${days} days ago.`;
    }
  }
  visitMsg.textContent = message;
  localStorage.setItem('discoverLastVisit', now.toString());
}); 