
// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v12',
//     center: listing.geometry.coordinates,
//     zoom: 9
// });

maptilersdk.config.apiKey = '8zHoPX5Z8cUp7tZN6K07';
    const map = new maptilersdk.Map({
        container: 'map', // container's id or the HTML element to render the map
        style: "basic-v2",
        center: [78.9629, 20.5937], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });


// console.log(coordinates);

// const marker = new mapboxgl.Marker({color: "black"})
// .setLngLat(listing.geometry.coordinates)
// .setPopup(new mapboxgl.Popup({offset: 25}))
// .setHTML(`
//     <h3>${listing.title}</h3><p>Exact location will be  provided after booking</p>`
// )
// .addTo(map);

// Create a marker at the specified coordinates
const marker = new maptilersdk.Marker({ color: "black" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new maptilersdk.Popup({ offset: 25 }))
    .setHTML(`
        <h3>${listing.title}</h3>
        <p>Exact location will be provided after booking</p>
    `)
    .addTo(map);

      
// Function to search for a place
function searchPlace(place) {
    // Example URL for a geocoding service
    const geocodingUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(place)}.json?key=8zHoPX5Z8cUp7tZN6K07`;

    fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
            if (data.features && data.features.length > 0) {
                console.log(data.features);
                const coordinates = data.features[0].geometry.coordinates;
                map.setCenter(coordinates);
                map.setZoom(10); // Zoom in on the searched location
            } else {
                console.log(data);
                alert('Place not found.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while searching for the place.');
        });
}

// Add event listener to the search button
document.addEventListener('DOMContentLoaded', () => {
const button = document.getElementById('searchButton');
button.addEventListener('click', () => {
    const place = document.getElementById('searchInput').value;
    if (place) {
        searchPlace(place);
        console.log(place);
    } else {
        alert('Please enter a place to search.');
        console.log(place);
    }
});
});
