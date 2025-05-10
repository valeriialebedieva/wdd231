function getParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name) || '';
}

document.getElementById('firstName').textContent = getParam('firstName');
document.getElementById('lastName').textContent = getParam('lastName');
document.getElementById('email').textContent = getParam('email');
document.getElementById('mobile').textContent = getParam('mobile');
document.getElementById('organization').textContent = getParam('organization');

const timestamp = getParam('timestamp');
const tsElement = document.getElementById('timestamp');

if (tsElement) {
    if (timestamp) {
        const date = new Date(timestamp);
        const formatted = date.toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        tsElement.textContent = formatted;
    } else {
        tsElement.textContent = 'Not provided';
    }
}
