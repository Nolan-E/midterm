## SomeMaps Project

SomeMaps is a full stack web application built with Node, Express, and PostgresSQL, using the Leaflet api and plugins. It allows users to create a map and save associated pins to it. Users can view maps saved by others. They can also add images, descriptions and titles to their own pins.

This project was completed by [Eric M](https://github.com/ermurray), [Gio W](https://github.com/gwan93), & [Nolan E](https://github.com/Nolan-E) for the midterm project at Lighthouse Labs.
****
## Features

- Users without an account can view maps that other users have created.
- Users can sign up and login.
- Signed in users can view maps and add them to their favourited maps list.
- Signed in users can create new maps and add pins to show geographic points of interest.
- Signed in users can edit maps that they own by editing and deleting pins.
- Users have a profile card, showing their information and how many maps they've contributed to.
- Leaflet Maps Library used 
****
## Project Setup

1. Fork this repository, then clone your fork of this repository.
2. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
3. Install all dependencies:
   ```shell
   npm install
   ```
4. Fix Sass binaries (if there are any errors related to it):
   ```shell
   npm rebuild node-sass
   ```
5. Install the proper POSTGRESQL database:
   ```shell
   npm run db:reset
   ```
6. Start the web server using:
     ```shell
     npm start
     ```
7. Open your web browser and enter the default URL:
     ```browser
     http://localhost:8080/
     ```
8. When finished, the server can be safely shut down with `control + c`.
****

## Final Product

!['Welcome'](https://github.com/Nolan-E/midterm/blob/master/docs/Welcome%20screen.png?raw=true)
<br>

!['Explore'](https://github.com/Nolan-E/midterm/blob/master/docs/Explore%20map.png?raw=true)
<br>

!['Create'](https://github.com/Nolan-E/midterm/blob/master/docs/Create%20map.png?raw=true)
<br>

!['Favourite'](https://github.com/Nolan-E/midterm/blob/master/docs/Favorite%20maps.png?raw=true)
<br>

!['Profile'](https://github.com/Nolan-E/midterm/blob/master/docs/Profile%20card.png?raw=true)
****

## Future Development

- Hosting (ie. on Heroku)
- Flash user feedback messages instead of client alert messages
- A share button for users to share their favorite maps
- Allow users to add/edit pins on maps that are made by other users
- Better feedback for when users favorite a map
- Implement a form for users to submit a review to a map
- Allow users to replace and remove pins during the create map process
- Allow users to replace pins when they are adding to existing maps
- When users delete the last pin for a map, the map is no longer shown. Allow users to see a map with no pins associated with it
- Allow users to rate maps 
- Allow users to change the name of a map
- Secure the get/post/edit/delete routes so that they can not be accessed from third party services (ie. Postman)
****

## Known Bugs/Issues

- Users are not able to edit their map's default photo
- Users can add the same map multiple times to their favorites
- Not able to delete a pin from a map
****

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Leaflet 1.7.x
- Express 4.17.x
- dotenv 2.0.0
- bootstrap-icons 1.4.0
****
