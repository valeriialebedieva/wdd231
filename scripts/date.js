document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    // Format current date and time as "MM/DD/YYYY HH:MM:SS"
    const now = new Date();
    const formatted = now.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(',', '');
    document.getElementById('lastModified').textContent = `Last Update: ${formatted}`;
});