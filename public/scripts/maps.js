// Render map
const mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=VOUVJ6EuCCKH8cA2JsJb', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(mymap);
