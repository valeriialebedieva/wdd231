import './nav.js';

const form = document.getElementById('help-form');
const LS_KEY = 'helpFormData';

// Prefill if data exists
window.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
  if (data.name) form.name.value = data.name;
  if (data.email) form.email.value = data.email;
  if (data.interest) form.interest.value = data.interest;
  if (data.message) form.message.value = data.message;
});

form.addEventListener('submit', e => {
  localStorage.setItem(LS_KEY, JSON.stringify({
    name: form.name.value,
    email: form.email.value,
    interest: form.interest.value,
    message: form.message.value
  }));
}); 