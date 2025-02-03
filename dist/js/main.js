document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.getElementById("map");
    console.log(mapContainer);
    if (!mapContainer) {
        console.error("Error: El contenedor del mapa no existe en el DOM.");
        return;
    }

    fetch("data/itinerario.json")
        .then(response => response.json())
        .then(itinerario => {
            const buttonsContainer = document.getElementById("buttons");
            Object.keys(itinerario).forEach(dia => {
                let btn = document.createElement("button");
                btn.textContent = dia;
                btn.className = "btn";
                btn.onclick = () => mostrarMapa(itinerario[dia]);
                buttonsContainer.appendChild(btn);
            });
        });
});

function mostrarMapa(lugares) {
    console.log(lugares);
    const mapContainer = document.getElementById("map");
    console.log(mapContainer);
    if (!mapContainer) {
        console.error("Error: El contenedor del mapa no existe.");
        return;
    }

    if (window.map instanceof L.Map) {
        window.map.off();
        window.map.remove();
        window.map = null;
    }

    window.map = L.map('map').setView([41.8781, -87.6298], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(window.map);

    // Crear un grupo de clusters
    const markers = L.markerClusterGroup();

    Object.entries(lugares).forEach(([nombre, coords]) => {
        const marker = L.marker(coords).bindPopup(nombre);
        markers.addLayer(marker);
    });
    window.map.addLayer(markers);
}