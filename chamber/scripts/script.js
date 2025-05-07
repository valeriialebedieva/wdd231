const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');
if (menuToggle && navUl) {
  menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('open');
  });
}

const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const directory = document.querySelector('.directory');
if (gridBtn && listBtn && directory) {
  gridBtn.addEventListener('click', () => {
    directory.classList.remove('list');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  });
  listBtn.addEventListener('click', () => {
    directory.classList.add('list');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
  });
}

async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    const container = document.querySelector('.directory');
    if (!container) return;
    container.innerHTML = '';
    data.forEach(member => {
      const card = document.createElement('section');
      card.className = 'member-card ' + (member.membership === 3 ? 'gold' : member.membership === 2 ? 'silver' : '');
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <div class="member-info">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.url}" target="_blank">${member.url}</a>
        </div>
        <div class="member-level">${member.membership === 3 ? 'Gold' : member.membership === 2 ? 'Silver' : 'Member'}</div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Error loading members:', err);
  }
}
loadMembers();

const yearSpan = document.getElementById('currentYear');
const lastModSpan = document.getElementById('lastModified');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = document.lastModified; 