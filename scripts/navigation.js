document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu');
    const nav = document.querySelector('nav');
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    // Wayfinding: highlight current page
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
      if (link.href === window.location.href) {
        link.classList.add('active');
      }
    });
  });