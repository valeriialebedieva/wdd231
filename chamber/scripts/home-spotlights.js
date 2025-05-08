async function getSpotlightMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        
        const eligibleMembers = members.filter(member => member.membership >= 2);
    
        const selectedMembers = [];
        const numToSelect = 3;
        
        if (eligibleMembers.length <= numToSelect) {
            selectedMembers.push(...eligibleMembers);
        } else {
            const availableMembers = [...eligibleMembers];
        
            for (let i = 0; i < numToSelect; i++) {
                const randomIndex = Math.floor(Math.random() * availableMembers.length);
                selectedMembers.push(availableMembers[randomIndex]);
                availableMembers.splice(randomIndex, 1);
            }
        }
        
        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error('Error loading spotlight members:', error);
        document.getElementById('spotlight-container').innerHTML = '<p>Unable to load member spotlights</p>';
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlight-container');
    const spotlightsHTML = members.map(member => `
        <div class="spotlight-card">
            <img src="images/${member.image}" alt="${member.name} logo" class="member-logo">
            <h3>${member.name}</h3>
            <p class="membership-level">${member.membership === 3 ? 'Gold Member' : 'Silver Member'}</p>
            <p>${member.description}</p>
            <div class="member-contact">
                <p>📞 ${member.phone}</p>
                <p>📍 ${member.address}</p>
                <p><a href="${member.url}" target="_blank" rel="noopener">Visit Website</a></p>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = spotlightsHTML;
}

getSpotlightMembers(); 