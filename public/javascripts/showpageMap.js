mapboxgl.accessToken = 'pk.eyJ1IjoicGFjaWVrZmx5IiwiYSI6ImNrbms2ZW54cjA3eXEycW54cTY5Y29xOWEifQ.giXUI96ja1Bv1iLe2XOcVQ';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: campground.geometry.coordinates, // starting position [lng, lat]
zoom: 9 // starting zoom
});

new mapboxgl.Marker()
.setLngLat(campground.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
        )
)
.addTo(map)