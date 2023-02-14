# SoundCloud-Portfolio-Project

This web application was designed to mimic certain functionalities of the SoundCloud application. It was built using the following variety of tech:
* JavaScript
* Express
* Sequelize
* bycrypt.js
* CSRF.js
* SQLite3 in development
* Postgres in production
* React
* React-Redux

## Setup:

Clone repository:
Click this link to take you to the github repository: https://github.com/elnorabills/SoundCloud-Porfolio-Project

You will first want to clone the repository by clicking the green button that says "Code". Copy and paste the link in your terminal and cd into the folder titled "SoundCloud-Porfolio-Project". Once in this folder type the command "code ." in your terminal and the application should open up in a vs code document.

.env setup:
Create a .env file in the root of your backend folder (/backend/.env). This file should contain the port, db_file, jwt_secret, and jwt_expires_in.

This is how your .env file should look:

  ```
PORT=8000
DB_FILE=db/dev.db
JWT_SECRET=[create a secret]
JWT_EXPIRES_IN=604800
```

Backend database setup:
In your terminal cd into the root of your backend folder. First you will need to install all dependencies, to do this run npm install in your terminal. Once the dependencies are done being installed you need to migrate the database. In order to run database migrations you must run this command in your terminal:

npx dotenv sequelize db:migrate

Once the migrations are finished running, you will then need to seed the database. To seed the database you must run this command in your terminal:

npx dotenv sequelize db:seed:all

Once the database is seeded you can start your backend server, to do this run npm start in your terminal. In your terminal you should see that the server is listening on port 8000.

Frontend setup:
Make a new terminal separate from the one your backend server is running on and cd into the frontend folder. You need to install all of the necessary dependencies for the frontend, to do this run the command npm install in your frontend folder. Once the dependencies are completely installed you can start your frontend server, to do this run npm start in your terminal. The application should then open up in your browser and should be running on localhost:3000.

## Features:
This application has two features implemented, Albums and Songs. For each of these features, the user is able to perform all necessary CRUD (Create, Read, Update, Delete) operations.

Albums:
* Create: The user can make a new album.
* Read: The user can access a list of all albums, the albums they created, and the details of each individual album.
* Update: The user can edit the albums they have created.
* Delete: The user can delete any album they have created.

Songs:
* Create: The user can make a new song within a specific album.
* Read: The user can access a list of all songs, the songs they created, and the details of each individual song.
* Update: The user can edit the songs they have created.
* Delete: The user can delete any song they have created.

Future Features include:
* CRUD operations for song comments
* CRUD operations for playlists
* Create a single song that is not a part of an album
* A search bar to search songs, albums, and artists
