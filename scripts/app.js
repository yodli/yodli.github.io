// Fetch albums from JSON
fetch('data/albums.json')
    .then(response => response.json())
    .then(albums => {
        renderAlbums(albums);
        renderMap(albums);
    });

// Render album cards
function renderAlbums(albums) {
    const container = document.getElementById('album-container');
    let html = '';

    albums.forEach(album => {
        html += `
            <div class="album-card">
                <a href="${album.url}" target="_blank">
                    <img src="${album.cover}" alt="${album.title}">
                </a>
                <a href="${album.url}" target="_blank">${album.title}</a>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Render Leaflet map
function renderMap(albums) {
    const zoom = window.innerWidth < 768 ? 1 : 2;
    const map = L.map('map').setView([20, 0], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    albums.forEach(album => {
        if (album.locations) {
            album.locations.forEach(location => {
                L.marker(location)
                    .addTo(map)
                    .bindPopup(`<b>${album.title}</b><br><a href="${album.url}" target="_blank">View Album</a>`);
            });
        }
    });
}