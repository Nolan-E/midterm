### Picking Project

top choices
 - wiki map
 - todo list


### wiki map ideas
  - buzz feed 2.0
  - blog with linked map related pins on map
  - or links to related topics and pins........
  - main page large map with filters
  - maps apis ?????
  - commercial space for rent
  - dog parks
  - zombie mob clusters  

# Project plaining
  ## links
    - document for thoughts : https://docs.google.com/document/d/1we365uMIPoxY35Rn6p5TIyCN1LO1TMWIjFaaTMQT_Mk/edit
    - ERD diagram : https://drive.google.com/file/d/1XGPsAcBolQjBtkf3b5u2Mk5wsaN2ejoT/view?usp=sharing
    - Design layout: https://docs.google.com/spreadsheets/d/1poEk030q8nxWQo76y-BwGw42YzaRCpxXLXxwGFF0hyo/edit#gid=0
## projects desc.
A web app that allows users to collaboratively create maps which list multiple "points". For example: "Best Places to Eat Around Town" or "Locations of Movie Scenes".

## Stack Req.
- ES6 for server-side (NodeJS) code
- NodeJS
- Express
- RESTful routes
- One or more CSS or UI "framework"s:
- jQuery
- A CSS preprocessor such as SASS, Stylus, or PostCSS for styling -- or CSS - - Custom properties and no CSS preprocessor
- PostgreSQL and pg (with promises) for DBMS
- git for version control

## Wiki Map Req
- users can see a list of the available maps
- users can view a map
- a map can contain many points
- each point can have: a title, description, and image
- authenticated users can create maps
- authenticated users can modify maps (add, edit, remove points)
- users can favourite a map
- users have profiles, indicating their favourite maps and maps they've contributed to
- use http://leafletjs.com/ or https://developers.google.com/maps/

### User stories/Scenarios
- As a user I can see available maps saved by myself or others because I want to see a list of dog parks that are near me or are highly rated.
- Given a list of user created maps with available dog parks I can favorite the maps or filter based on my simple criteria ie:(location, star rating)
- As a user I can view a map without an account because I DONT WANT TO GIVE YOU MY INFO
- As a map I can contain  many points of interest  because I identify as a map. Given a specific map is selected it will show all relavent pins acording the user created map?.
- As a user I can expand a point of interest and see quick view of details beacuse i don't want to click back and forth between pages on quick glance of pins.
- Given a pin is clicked on it will show a quick view of park info with thumbnail and raiting. If view detail link  clicked  it will open to full details and locaiton.
- As a auth. user I can create saved maps and edit, update, remove points within those maps  because i want to have easy access to my saved maps.
- As a user I can favourite maps created by myself or by others because i want to easily refrence those maps.
- As a user I can have a profile because i want to save my maps  and share with others.
- Given I have a profile it should show me my info and my saved favorited or created maps



## Routes
- 



### Format of geoJSON object to be rendered when a user clicks on a map
const home = [51.1391, -114.2002];
const mymap = L.map('mapid').setView(home, 14);

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=KSgZl5R174SBURmzIIyg', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(mymap);
const centre = L.marker(home).addTo(mymap);

const data_points = {
  "type": "FeatureCollection",
  "name": "test-points-short-named",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
  { "type": "Feature", "properties": { "name": "Dog Park A", "description": "AAA" }, "geometry": { "type": "Point", "coordinates": [ -114.19687271118165, 51.15049396880196 ] } },
  { "type": "Feature", "properties": { "name": "Dog Park B", "description": "BBB" }, "geometry": { "type": "Point", "coordinates": [ -114.17850494384767, 51.147801909622714 ] } },
  { "type": "Feature", "properties": { "name": "Dog Park C", "description": "CCC" }, "geometry": { "type": "Point", "coordinates": [ -114.17678833007814, 51.13649354621719 ] } },
  { "type": "Feature", "properties": { "name": "Dog Park D", "description": "DDD" }, "geometry": { "type": "Point", "coordinates": [ -114.19292449951173, 51.12895309822599 ] } }
  ]
};

## This is the logic that takes the above geoJSON object and renders it on the actual map in the browser
const pointLayer = L.geoJSON(null, {
  pointToLayer: function(feature, latlng) {
    const label = String(feature.properties.name)
    const description = String(feature.properties.description)
    return new L.marker(latlng)
      .bindTooltip(label, {permanent: true, opacity: 0.7})
      .openTooltip()
      .bindPopup(`<b>${label}</b><br>${description}`).openPopup()
      .on('mouseover', function (e) {this.openPopup()})
      .on('mouseout', function (e) {this.closePopup()})
  }
});
pointLayer.addData(data_points);
mymap.addLayer(pointLayer);
