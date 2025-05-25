document.getElementById('year').textContent = new Date().getFullYear();
    const params = new URLSearchParams(window.location.search);
    const dataDiv = document.getElementById('form-data');
    if (params.toString()) {
      dataDiv.innerHTML = `<ul>
        <li><strong>Name:</strong> ${params.get('name') || ''}</li>
        <li><strong>Email:</strong> ${params.get('email') || ''}</li>
        <li><strong>Interest:</strong> ${params.get('interest') || ''}</li>
        <li><strong>Message:</strong> ${params.get('message') || ''}</li>
      </ul>`;
    } else {
      dataDiv.textContent = 'No form data found.';
    }