# BlueCity

Blue City main repository

## Getting Started

Download links:

From Github: https://github.com/tcrurav/bluecity.git

Also available in elrincon.jetbrains.space of the project:
* HTTPS clone URL: https://git.jetbrains.space/elrincon/bc/learning.git

## Prerequisites

You need a working environment with:
* [Git](https://git-scm.com) - You can install it from https://git-scm.com/downloads.
* [MySQL](https://www.mysql.com) - You can install it from https://www.mysql.com/downloads/.
* [Node.js](https://nodejs.org) - Install node.js from https://nodejs.org/es/download/. It's advisable to install the LTS version.

## General Installation instructions

There is a deep alternative version of this instructions for Ubuntu 20.04. [Project Install instructions for Ubuntu 20.04 in a local clean machine](/README.For.Linux.md).

The best option to start with this project is cloning it in your PC:

```
git clone https://github.com/tcrurav/bluecity.git
```

This project contains 2 different parts:
* Frontend
* Backend

You need a node.js working environment. The LTS is recommended: https://nodejs.org/es/

Once you have cloned your project install all dependencies.

```
cd bluecity/frontend
npm install

cd bluecity/backend
npm install
```

* For your frontend part, if you want to use the Google Login feature, you have to create a clientID by creating a new project on Google developers website.: https://developers.google.com/identity/sign-in/web/sign-in

Your Google ClientID is used in the file bluecity/frontend/src/components/my-login-with-google.js and should be inserted in the file bluecity/frontend/.env in the following manner: 

```
REACT_APP_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com,
```

* For your backend part:
1. You need a bluecity/backend/.env file with a key for the JWT:

```
    JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
```

2. You need a mysql server working.

3. You have to edit the file bluecity/backend/config/config.json, depending on your environment.

```
    "username": "root",
    "password": "your password",
    "database": "bluecity_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": 0
```

4. Create the mysql database, that in our case is "bluecity_development".

5. Do the migration creating the tables with the contents of /bluecity/migrations 

```
npx sequelize-cli db:migrate
```

6. And populating the tables with data with the contents of /bluecity/seeders

```
npx sequelize-cli db:seed:all
```

Finally to start enjoying this project.

```
cd bluecity/frontend
npm start

cd bluecity/backend
npm start
```

Enjoy!!!

## Project Install instructions for Ubuntu 20.04 in a local clean machine

[Project Install instructions for Ubuntu 20.04 in a local clean machine](/README.For.Linux.md)

## Repo news

* May 27th:
    - Carlos Sánchez has kept on sharing his desktop through Google Meet and we all have worked in the branch feature/mapping in order to create a working leaflet map to show all free scooter parkings available. 
    - Today Carlos has also created the .env file of the frontend to avoid the burden of copying the Google ClientID for the Authentication any time there was a push/pull to/from the Github remote repo.
* May 13th and 20th:
    - Carlos Sánchez has shared his desktop through Google Meet and we all have worked in the branch feature/mapping in order to create a working leaflet map to show all free scooter parkings available. To achieve this goal we have worked on both the backend and frontend sides.
* May 6th:
    - Juan Thielmann has mirrored https://github.com/tcrurav/bluecity.git in https://git.jetbrains.space/elrincon/bc/learning.git
    - Texe has shared his desktop and now he has the project locally working in his computer.
    - Texe had been working on logos for the project and now he has added it to the project in the development branch locally. He hasn't uploaded it to the remote development branch yet.
* April 29th:
    - Carlos Sánchez has shared his desktop and worked on a new component to show how add a new table in the database, and how to show that data in a new component in the frontend.
    - At the end Carlos Sánchez has merged his feature branch in the development branch, and uploaded to the remote development branch.
* April 22nd:
    - We have been learning how to deal with git branches in this project.
    - We have then created a branch called feature/mytest to add a new component called MyTest. We had a problem at the end. The solution was just to modify the line 11 in backend/routes/user.routes.js, so that it stays: router.get("/", users.findAll);
    - In this meeting Carlos Sánchez, Néstor Cabanillas and Néstor Batista have already installed successfully Tiburcio's reference project, and were actively adding the new MyTest component. Aaron and Texe were still with the boilerplate actions such as installing MySQL. They plan to have during this week a meeting to finally install it all.
* April 15th:
    - We have been learning how to deploy the whole start project Tiburcio had been working on this last Eastern, starting cloning the project from github, and then installing all the stuff for both the frontend and backend, following the instructions in this github project. At least Carlos Sánchez could install it all successfully. Some other students were also successfull too or were near to achieve it.
* April 1st:
    - In this online meeting, we worked on the mockups. Carlos Sánchez from his computer made some mockups using Adobe XD.
    - We also discussed about some other points of the project making clear how to work together.
* March 25th:
    - In this online meeting, we have worked the basic concepts of passing data through props.
    - Besides we have worked on leaflet. Here is the link to the github project we worked during the 2 hours of today: https://github.com/tcrurav/react-leaflet
* March 18th:
    - In this online meeting, Tiburcio explained the code of the login and main pages of the project.
    - We decided to use Leaflet for the Maps and Geolocation (https://leafletjs.com/). Gonzalo y Ettiene will work on it.
    - We studied the diagram made by IES STEVE TERRADAS (https://github.com/tcrurav/bluecity/blob/master/docs/ordinogram.pdf)
    - We discussed about the tasks each one wants to work with. Check the link for a graphical view of the tasks (https://github.com/tcrurav/bluecity/blob/master/docs/who-does-what.png)
    - Juan Thielmann will create a Github mirror of (https://git.jetbrains.space/elrincon/BlueCity.git)
    - Tiburcio will upload the login and main pages to the repo.
    - Tiburcio will create a video/tutorial explaining the Authentication with Google. 
    - Carlos and Juan Thielmann will investigate the possibility of creating Mockups with Adobe XD.
    - Aaron, Texe and Carlos will work on the rent part of the ordinogram.
    - Isaiah and Néstor Cabanillas will work on the reservation of the parking.
    - Juan Thielmann will work on the rent at the bottom right part of the ordinogram.
    - Néstor Batista will work on the parking at the bottom left part of the ordinogram.
* March 13th, No meeting because of Corona Virus.
* March 6th, We worked further on React introducing the main concepts.
* February 28th, We worked on React introducing the main concepts.
* February 21th, introduction to the server technology with Node.js, Express and the use of Postman to test it.

## Built With

* [Visual Studio Code](https://code.visualstudio.com/) - The Editor used in this project
* [React](https://reactjs.org/) - React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
* [Node.js](https://nodejs.org/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Leaflet](https://leafletjs.com/) - an open-source JavaScript library for mobile-friendly interactive maps.
* [react-fontawesome](https://github.com/FortAwesome/react-fontawesome) - React package integrating all icons in fontawesome.
* [react-bootstrap](https://react-bootstrap.github.io/) - React-Bootstrap replaces the Bootstrap JavaScript. Each component has been built from scratch as a true React component, without unneeded dependencies like jQuery.
* [react-leaflet](https://react-leaflet.js.org/) - React-Leaflet uses ⚛️ React's lifecycle methods to call the relevant Leaflet handlers, which has a few consequences.
* [sequelize](https://sequelize.org/) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.
* [express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
* [MySQL Workbench](https://www.mysql.com/products/workbench/) - MySQL Workbench is a unified visual tool for database architects, developers, and DBAs.
* [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

## Acknowledgments

* https://www.cluemediator.com/reactjs-tutorial. Excellent tutorial as a basis for learning the basics needed for this project.
* https://bezkoder.com/react-crud-web-api/. Another excellent tutorial to learn about the basics of this project.
* https://gist.github.com/PurpleBooth/109311bb0361f32d87a2. A very complete template for README.md files.
* https://w3path.com/react-google-login-with-example/. Excellent tutorial to understand Google login feature.
